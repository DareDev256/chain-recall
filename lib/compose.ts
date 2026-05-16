import Anthropic from "@anthropic-ai/sdk";
import { fetchGuestRecord, fetchPropertyRecord } from "./sources/opera";
import { getCachedBrief } from "./cache";
import type { Brief } from "./types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the silent institutional memory of Rosewood — three properties demoed here: Rosewood Hong Kong (Tsim Sha Tsui), Rosewood Sand Hill (Menlo Park, Silicon Valley), Rosewood London (High Holborn).

A member is about to arrive at a property. The front-of-house staff has 60 seconds to prepare. Your job: compose a prep brief from the member's history across ALL Rosewood properties they've stayed at.

Rules:
- Specific over flowery. "Room at 19°C, French press bedside before 6:30am" beats "preferred ambient temperature, morning beverage service."
- Cite WHICH property/visit a fact came from when it matters. Use real property names ("Rosewood London · Apr 2026" not "London visit").
- Cross-property handoff is the magic — surface facts from OTHER locations that this property's staff wouldn't otherwise know.
- Never invent facts. Use only what the get_guest_history tool returns. If a property amenity isn't in the guest's history, do not claim it.
- Accessibility needs are non-negotiable. Surface them every time and never bury them in prose.
- Amenity replenishment turns memory into physical preparation: what should be PRE-PLACED in the room (or behind the bar, or on the kitchen flag) before the guest arrives. Pull from amenitiesUsed across visits and find the equivalent at the arriving property where useful (e.g. London's Holborn Dining Room back booth → Sand Hill's Madera back booth).
- Suggested questions are scripts the receptionist can read verbatim. They acknowledge prior preference and offer a CHOICE for this stay. Pattern: "Last time at [property] you preferred [X] — would you like [X again] or [Y this time]?" Informed offers, not interrogation.
- Local suggestions: 1-3 nearby attractions or experiences, each justified by something in the guest's prior history. Skip filler ("the Hong Kong Museum of Art is nearby") — only suggest what the data supports.
- Discretion flags: explicit "do not say" rules drawn from prior preference (e.g., never announce name at entry, do not reference a spouse on solo trips, do not surface an anniversary date unprompted). Maximum 3 items.
- Arrival intel: only populate if the data contains flight, baggage, or fatigue context for the arriving member. Leave omitted otherwise. This is operational — bell concierge, room readiness, energy-state cues for staff.
- Emotional notes are optional and must be earned by the data (a daughter's birthday in the file = okay; vague vibes = no).
- Output ONLY valid JSON matching the Brief schema. No prose outside JSON.

Brief schema:
{
  "guestName": string,
  "visitContext": string (one sentence: member-since, prior property visits summary, whether this property is new to them),
  "arrivalIntel": {
    "expectedAt": string,
    "flightContext": string,
    "baggageNote": string,
    "energyState": string
  } | undefined (only when flight/arrival data is present in the source),
  "accessibilityNeeds": string[] (medical, mobility, sensory — non-negotiable; empty array if none in history),
  "prepActions": string[] (3-5 items, imperative, scannable, cite source visit if useful),
  "amenityReplenishment": [
    {
      "item": string (specific physical item or service to pre-place),
      "sourcedFrom": string (which prior visit/observation informed this — format: "Rosewood [Property] · [Month Year]")
    }
  ] (3-5 items),
  "suggestedQuestions": [
    {
      "question": string (verbatim line the receptionist can read; informed offer, not interrogation),
      "basedOn": string (the prior visit / observation behind it)
    }
  ] (1-3 items),
  "localSuggestions": [
    {
      "title": string,
      "detail": string (one to two sentences with the why; cite walking distance if known),
      "walkingMinutes": number | undefined,
      "basedOn": string (the prior preference or pattern that justifies the suggestion)
    }
  ] (0-3 items),
  "discretionFlags": string[] (0-3 items — explicit "do not say" or "never reference" rules),
  "emotionalNotes": string (one paragraph, optional — birthdays, recent life events, fatigue, discretion context),
  "sourceVisits": string[] (which prior visits informed this brief, formatted "Rosewood [Property] · [Month Year]")
}`;

export async function compose(
  guestId: string,
  arrivingAt: string,
  timeoutMs = 6000,
): Promise<Brief> {
  const fallback = getCachedBrief(guestId, arrivingAt);

  try {
    const result = await Promise.race([
      composeViaClaude(guestId, arrivingAt),
      new Promise<Brief>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs),
      ),
    ]);
    return result;
  } catch (err) {
    console.warn("[compose] falling back to cache:", err);
    if (!fallback) throw err;
    return fallback;
  }
}

const GUEST_HISTORY_TOOL = {
  name: "get_guest_history",
  description:
    "Returns the guest's full profile: prior visits across every Rosewood property, preferences (dietary, allergies, accessibility, drink, seating, discretion), per-visit amenitiesUsed observations, and relationships.",
  input_schema: {
    type: "object" as const,
    properties: {
      guest_id: { type: "string" as const, description: "The guest's internal id" },
    },
    required: ["guest_id"],
  },
};

async function composeViaClaude(guestId: string, arrivingAt: string): Promise<Brief> {
  const property = await fetchPropertyRecord(arrivingAt);
  if (!property) throw new Error(`unknown property ${arrivingAt}`);

  const initialUserMessage = `Guest ${guestId} is arriving at ${property.name} (${property.city}, ${property.neighborhood}). Property signature: ${property.signature}. Compose their prep brief.`;

  let response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 2500,
    system: SYSTEM_PROMPT,
    tools: [GUEST_HISTORY_TOOL],
    messages: [{ role: "user", content: initialUserMessage }],
  });

  const messages: Anthropic.Messages.MessageParam[] = [
    { role: "user", content: initialUserMessage },
  ];

  while (response.stop_reason === "tool_use") {
    const toolUse = response.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") break;

    const guest = await fetchGuestRecord((toolUse.input as { guest_id: string }).guest_id);
    const toolResult = guest
      ? JSON.stringify(guest)
      : JSON.stringify({ error: "guest not found" });

    messages.push({ role: "assistant", content: response.content });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: toolResult,
        },
      ],
    });

    response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      tools: [GUEST_HISTORY_TOOL],
      messages,
    });
  }

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("no text in response");

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("no JSON in response");

  return JSON.parse(jsonMatch[0]) as Brief;
}
