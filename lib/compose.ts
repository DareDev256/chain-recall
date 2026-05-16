import Anthropic from "@anthropic-ai/sdk";
import { fetchGuestRecord, fetchPropertyRecord } from "./sources/opera";
import { getCachedBrief } from "./cache";
import type { Brief } from "./types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the silent institutional memory of Halcyon, a private members' club with properties in Toronto, NYC, and LA.

A member is about to arrive at a property. The front-of-house staff has 60 seconds to prepare. Your job: compose a prep brief from the member's history across ALL Halcyon properties.

Rules:
- Specific over flowery. "Room at 19°C" beats "preferred ambient temperature."
- Cite WHICH property/visit a fact came from when it matters.
- Cross-property handoff is the magic — surface facts from OTHER locations that this property's staff wouldn't otherwise know.
- Never invent facts. Use only what the get_guest_history tool returns.
- Emotional notes are optional and must be earned by the data (a daughter's birthday in the file = okay; vague vibes = no).
- Output ONLY valid JSON matching the Brief schema. No prose outside JSON.

Brief schema:
{
  "guestName": string,
  "visitContext": string (one sentence: member-since, prior property visits summary, whether this property is new to them),
  "prepActions": string[] (3-5 items, imperative, scannable, cite source visit if useful),
  "emotionalNotes": string (one paragraph, optional context — birthdays, recent life events, discretion preferences),
  "sourceVisits": string[] (which prior visits informed this brief, formatted "Halcyon [City] · [Month Year]")
}`;

export async function compose(
  guestId: string,
  arrivingAt: string,
  timeoutMs = 4000,
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

async function composeViaClaude(guestId: string, arrivingAt: string): Promise<Brief> {
  const property = await fetchPropertyRecord(arrivingAt);
  if (!property) throw new Error(`unknown property ${arrivingAt}`);

  const initialUserMessage = `Guest ${guestId} is arriving at ${property.name} (${property.city}, ${property.neighborhood}). Compose their prep brief.`;

  let response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    tools: [
      {
        name: "get_guest_history",
        description:
          "Returns the guest's profile including all prior visits across every Halcyon property, preferences, allergies, and relationships.",
        input_schema: {
          type: "object",
          properties: {
            guest_id: { type: "string", description: "The guest's internal id" },
          },
          required: ["guest_id"],
        },
      },
    ],
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
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      tools: [
        {
          name: "get_guest_history",
          description:
            "Returns the guest's profile including all prior visits across every Halcyon property, preferences, allergies, and relationships.",
          input_schema: {
            type: "object",
            properties: { guest_id: { type: "string" } },
            required: ["guest_id"],
          },
        },
      ],
      messages,
    });
  }

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("no text in response");

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("no JSON in response");

  return JSON.parse(jsonMatch[0]) as Brief;
}
