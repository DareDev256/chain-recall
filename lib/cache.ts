import type { Brief } from "./types";

export const CACHED_BRIEFS: Record<string, Brief> = {
  "sarah-chen-la": {
    guestName: "Sarah Chen",
    visitContext:
      "Member since 2024. First-ever visit to LA. Stayed at Toronto twice, NYC once (Jan 2026).",
    accessibilityNeeds: [],
    prepActions: [
      "Room at 19°C — confirmed preference across both Toronto stays",
      "Chamomile and kettle in-room before arrival (NYC team did this; she wrote a thank-you note)",
      "Skip lavender turndown — triggers headaches",
      "Quiet corner table if she dines alone tonight, soft light",
    ],
    amenityReplenishment: [
      {
        item: "Chamomile + electric kettle, bedside, before check-in",
        sourcedFrom: "Halcyon NYC · Jan 2026 (relayed from Toronto; guest wrote a thank-you note)",
      },
      {
        item: "Lavender-free turndown package (replace with cedar or unscented)",
        sourcedFrom: "Halcyon Toronto · Mar 2026 + Nov 2025 — confirmed allergy",
      },
      {
        item: "Didion 'The Last Thing He Wanted' on the bedside",
        sourcedFrom: "Halcyon Toronto · Nov 2025 — borrowed Didion's 'The White Album' from the library",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Would you like the chamomile and kettle service for the full stay, or just for tonight?",
        basedOn: "Halcyon NYC · Jan 2026 — she wrote a thank-you note for the late-arrival kettle",
      },
      {
        question:
          "Is Emma joining you on this trip, or is she home in Toronto?",
        basedOn: "Halcyon Toronto · Mar 2026 — mentioned daughter Emma's school recital; her 8th birthday is May 22",
      },
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
    accessibilityNeeds: [
      "Ground-floor or elevator-adjacent room — partial knee replacement Feb 2025, ongoing recovery (flagged NYC profile)",
    ],
    prepActions: [
      "Do NOT announce his name at the entry — he prefers discreet greeting (logged in NYC profile)",
      "If he orders a Negroni: stirred, not shaken. He has corrected this twice before.",
      "No dairy — kitchen flag for entire stay, not just first dinner",
      "If dining alone, single overhead lamp at a back-corner table — he reads with a Moleskine",
    ],
    amenityReplenishment: [
      {
        item: "Cornas (Rhône) by the glass primed at the bar",
        sourcedFrom: "Halcyon NYC · Dec 2025 — clarified Cornas, not Côte-Rôtie",
      },
      {
        item: "Negroni-stirred kit on the bar cart (not the standing house preparation)",
        sourcedFrom: "Halcyon NYC · Apr 2026 — corrected bartender mid-pour",
      },
      {
        item: "Kitchen-wide no-dairy flag (breakfast, room service, bar snacks)",
        sourcedFrom: "Halcyon LA · Feb 2026 — extended across three-night stay",
      },
      {
        item: "Single overhead lamp at back-corner table 4, Moleskine setup",
        sourcedFrom: "Halcyon NYC · Dec 2025 — solo working dinner",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Lola be joining you in Toronto, or is this a solo trip?",
        basedOn:
          "Halcyon NYC · Apr 2026 — anniversary dinner; Lola has a shellfish allergy if she does join",
      },
      {
        question:
          "Shall we hold the screening room for an evening, similar to your LA setup?",
        basedOn: "Halcyon LA · Feb 2026 — booked the private screening room twice over three nights",
      },
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
    accessibilityNeeds: [
      "No overhead fluorescents in seating areas — confirmed migraine trigger (Toronto, Oct 2025)",
    ],
    prepActions: [
      "Back-corner table if she's dining — laptop almost always open, working dinner likely",
      "Switch overhead fluorescents OFF at her seating area — migraine trigger, flagged Feb 2026",
      "Vegetarian (eats cheese, no fish) — kitchen flag",
      "Still water with ginger on the side, no ice",
    ],
    amenityReplenishment: [
      {
        item: "Still water with ginger on the side, no ice, pre-stocked in room fridge",
        sourcedFrom: "Halcyon Toronto · Oct 2025 + Feb 2026 — consistent on both stays",
      },
      {
        item: "Table lamps in workspace, overhead fluorescents off",
        sourcedFrom: "Halcyon Toronto · Feb 2026 — staff swapped during investor dinner",
      },
      {
        item: "Vegetarian welcome plate (cheese yes, no fish, no eggs unless asked)",
        sourcedFrom: "Halcyon Toronto · Feb 2026 — kitchen built menu around dietary line",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Devika be coordinating from SF, or shall we route confirmations to your direct email?",
        basedOn: "Halcyon Toronto · Feb 2026 — assistant Devika Rao copied on all bookings",
      },
      {
        question:
          "Would you prefer the back library room for working dinners, similar to your Toronto setup?",
        basedOn: "Halcyon Toronto · Feb 2026 — investor working dinner, laptop-friendly back corner",
      },
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
