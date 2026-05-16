import type { Brief } from "./types";

export const CACHED_BRIEFS: Record<string, Brief> = {
  "sarah-chen-la": {
    guestName: "Sarah Chen",
    visitContext:
      "Member since 2024. First-ever visit to LA. Stayed at Toronto twice, NYC once (Jan 2026).",
    prepActions: [
      "Room at 19°C — confirmed preference across both Toronto stays",
      "Chamomile and kettle in-room before arrival (NYC team did this; she wrote a thank-you note)",
      "Skip lavender turndown — triggers headaches",
      "Quiet corner table if she dines alone tonight, soft light",
    ],
    emotionalNotes:
      "Daughter Emma turns 8 on May 22. Sarah travels often around birthdays — if she mentions Emma, a small handwritten card from staff (not gifted, just acknowledged) lands well.",
    sourceVisits: [
      "Halcyon Toronto · Mar 2026",
      "Halcyon Toronto · Nov 2025",
      "Halcyon NYC · Jan 2026",
    ],
  },
  "marcus-okafor-toronto": {
    guestName: "Marcus Okafor",
    visitContext:
      "Member since 2021. First-ever visit to Toronto. Regular at NYC (home property) and LA.",
    prepActions: [
      "Do NOT announce his name at the entry — he prefers discreet greeting (logged in NYC profile)",
      "If he orders a Negroni: stirred, not shaken. He has corrected this before.",
      "No dairy — kitchen flag for entire stay",
      "If dining alone, single overhead lamp at a back-corner table — he reads with a Moleskine",
    ],
    emotionalNotes:
      "Anniversary with wife Lola is July 8. If Lola is mentioned: she's shellfish-allergic, separate flag needed. He tips night staff in unmarked envelopes — small gesture, mention nothing.",
    sourceVisits: [
      "Halcyon NYC · Apr 2026 (anniversary dinner)",
      "Halcyon NYC · Dec 2025",
      "Halcyon LA · Feb 2026",
      "Halcyon LA · Aug 2025",
    ],
  },
  "priya-sharma-la": {
    guestName: "Priya Sharma",
    visitContext:
      "Member since 2025. First-ever visit to LA. Two prior visits, both Toronto.",
    prepActions: [
      "Back-corner table if she's dining — laptop almost always open, working dinner likely",
      "Switch overhead fluorescents OFF at her seating area — migraine trigger, flagged Feb 2026",
      "Vegetarian (eats cheese, no fish) — kitchen flag",
      "Still water with ginger on the side, no ice",
    ],
    emotionalNotes:
      "Assistant Devika Rao books on her behalf — if Devika emails, copy her on all confirmations. Priya just closed Series A; if she mentions it, a low-key acknowledgment lands better than a celebration.",
    sourceVisits: [
      "Halcyon Toronto · Feb 2026 (investor dinner)",
      "Halcyon Toronto · Oct 2025 (first visit, working lunch)",
    ],
  },
};

export function cachedBriefKey(guestId: string, propertyId: string) {
  return `${guestId}-${propertyId}`;
}

export function getCachedBrief(guestId: string, propertyId: string): Brief | undefined {
  return CACHED_BRIEFS[cachedBriefKey(guestId, propertyId)];
}
