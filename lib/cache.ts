import type { Brief } from "./types";

export const CACHED_BRIEFS: Record<string, Brief> = {
  "mei-lin-chen-sand-hill": {
    guestName: "Mei Lin Chen",
    visitContext:
      "Member since 2024. First-ever visit to Rosewood Sand Hill. Regular at Rosewood Hong Kong (2 stays), London once (Jan 2026).",
    accessibilityNeeds: [],
    prepActions: [
      "Room at 19°C — confirmed across both Hong Kong stays",
      "Chamomile + electric kettle bedside before arrival (London team did this; she wrote a thank-you note)",
      "Lavender-free turndown — confirmed allergy from HK Mar 2026",
      "Quiet corner table at Madera if she dines tonight",
    ],
    amenityReplenishment: [
      {
        item: "Chamomile + electric kettle, bedside, pre-placed before check-in",
        sourcedFrom: "Rosewood London · Jan 2026 — handwritten thank-you note to GM",
      },
      {
        item: "Lavender-free turndown package (cedar or unscented substitute)",
        sourcedFrom: "Rosewood Hong Kong · Mar 2026 + Nov 2025 — confirmed allergy",
      },
      {
        item: "A Didion follow-up — 'The Year of Magical Thinking' on the bedside",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — borrowed 'The White Album' from the Manor Club library",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Would you like the chamomile and kettle service for the full stay, similar to your London arrival?",
        basedOn: "Rosewood London · Jan 2026 — she wrote a thank-you note for the late-arrival kettle",
      },
      {
        question:
          "Is Emma joining you in California, or is she home in Hong Kong this trip?",
        basedOn: "Rosewood Hong Kong · Mar 2026 — mentioned daughter's school recital; her 8th birthday is May 22",
      },
    ],
    localSuggestions: [
      {
        title: "Filoli Estate gardens + historic mansion",
        detail: "Curated tour available. The Didion-era California estate aesthetic fits her reading taste.",
        walkingMinutes: undefined,
        basedOn: "Rosewood Hong Kong · Nov 2025 — borrowed Didion from the Manor Club library",
      },
      {
        title: "Cantor Arts Center at Stanford",
        detail: "Quiet contemporary collection, ~5 min drive. Rodin Garden if Emma joins.",
        walkingMinutes: undefined,
        basedOn: "Pattern: she gravitates to museums on solo afternoons across both HK stays",
      },
    ],
    discretionFlags: [
      "If she is traveling without Emma, do not reference Emma unless she raises her first.",
    ],
    emotionalNotes:
      "Daughter Emma turns 8 on May 22. Sarah travels often around birthdays — if she mentions Emma, a small handwritten card from staff (not gifted, just acknowledged) lands well.",
    sourceVisits: [
      "Rosewood Hong Kong · Mar 2026",
      "Rosewood Hong Kong · Nov 2025",
      "Rosewood London · Jan 2026",
    ],
  },
  "marcus-okafor-sand-hill": {
    guestName: "Marcus Okafor",
    visitContext:
      "Member since 2021. First-ever visit to Rosewood Sand Hill. Regular at Rosewood London (2 stays), Hong Kong twice (Manor Club tier).",
    accessibilityNeeds: [
      "Ground-floor villa or elevator-adjacent room — partial knee replacement Feb 2025, ongoing recovery (London profile)",
    ],
    prepActions: [
      "Do NOT announce his name at the entry — discretion preference logged across all properties",
      "If he orders a Negroni: stirred, not shaken. Corrected twice (London Apr 2026 + HK relay)",
      "No dairy — kitchen-wide flag for the stay, not just first dinner",
      "If dining alone: back booth at Madera, single overhead lamp, Moleskine-friendly setup",
    ],
    amenityReplenishment: [
      {
        item: "Niman Ranch lamb chop at Madera primed — bypass the steakhouse parallel for now",
        sourcedFrom: "Rosewood London · Apr 2026 — anniversary dinner at Scarfes Bar; favors red-meat-forward dinners with Lola",
      },
      {
        item: "Negroni-stirred kit on the Madera Bar cart (not the standing house preparation)",
        sourcedFrom: "Rosewood London · Apr 2026 + Rosewood Hong Kong DarkSide bar profile",
      },
      {
        item: "Kitchen-wide no-dairy flag (breakfast, room service, Madera Bar snacks)",
        sourcedFrom: "Rosewood Hong Kong · Feb 2026 — extended across three-night Manor Club stay",
      },
      {
        item: "Back booth at Madera with single low lamp, Moleskine setup",
        sourcedFrom: "Rosewood London · Dec 2025 — Holborn Dining Room solo working dinner",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Lola be joining you in California, or is this a solo working trip?",
        basedOn:
          "Rosewood London · Apr 2026 — anniversary dinner; Lola has a shellfish allergy if she does join",
      },
      {
        question:
          "Shall we hold a private dining room one evening, similar to your Manor Club setup at Hong Kong?",
        basedOn: "Rosewood Hong Kong · Feb 2026 — booked the Manor private dining room twice for solo viewings",
      },
    ],
    localSuggestions: [
      {
        title: "Madera Bar — Friday jazz nights",
        detail: "Parallel to his DarkSide HK regular bar habit. Quiet, no cover, low-impact for the knee.",
        walkingMinutes: 2,
        basedOn: "Rosewood Hong Kong · DarkSide bar — Negroni-stirred logged",
      },
      {
        title: "Sand Hill Road walking loop (flat, no incline)",
        detail: "If he wants the VC-row stroll. Avoid Stanford dish hill given the knee recovery.",
        walkingMinutes: undefined,
        basedOn: "Pattern: enjoys low-stim solo walks (HK · Aug 2025 — Asaya Kitchen courtyard 90 min alone)",
      },
    ],
    discretionFlags: [
      "Never use his name at the entry. No public greeting. (London + HK)",
      "Do not reference the anniversary date (July 8) unless he or Lola raise it.",
    ],
    emotionalNotes:
      "Anniversary with wife Lola is July 8. If Lola is mentioned: she's shellfish-allergic, separate flag needed. He tips night staff in unmarked envelopes — mention nothing.",
    sourceVisits: [
      "Rosewood London · Apr 2026 (anniversary dinner)",
      "Rosewood London · Dec 2025",
      "Rosewood Hong Kong · Feb 2026 (Manor Club tier)",
      "Rosewood Hong Kong · Aug 2025",
    ],
  },
  "priya-sharma-sand-hill": {
    guestName: "Priya Sharma",
    visitContext:
      "Member since 2025. First-ever visit to Rosewood Sand Hill. Two prior visits, both Rosewood Hong Kong.",
    accessibilityNeeds: [
      "No overhead fluorescents in seating areas — confirmed migraine trigger (Rosewood Hong Kong, Oct 2025)",
    ],
    prepActions: [
      "Back-corner table if she dines at Madera — laptop almost always open, working dinner likely",
      "Switch overhead fluorescents OFF at her seating area — migraine trigger flagged HK Feb 2026",
      "Vegetarian (eats cheese, no fish) — kitchen-wide flag",
      "Still water with ginger on the side, no ice — pre-stock in villa fridge",
    ],
    amenityReplenishment: [
      {
        item: "Still water with ginger on the side, no ice — pre-stocked in villa fridge",
        sourcedFrom: "Rosewood Hong Kong · Oct 2025 + Feb 2026 — consistent across both stays",
      },
      {
        item: "Table lamps in the working area; overhead fluorescents off",
        sourcedFrom: "Rosewood Hong Kong · Feb 2026 — staff swapped during investor dinner",
      },
      {
        item: "Vegetarian welcome plate (cheese yes, no fish, no eggs unless asked)",
        sourcedFrom: "Rosewood Hong Kong · Feb 2026 — Asaya Kitchen built around dietary line",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Devika be coordinating from Singapore, or shall we route confirmations to your direct email?",
        basedOn: "Rosewood Hong Kong · Feb 2026 — assistant Devika Rao copied on all bookings",
      },
      {
        question:
          "Would you prefer a private dining room for working dinners, similar to your Asaya Kitchen setup at Hong Kong?",
        basedOn: "Rosewood Hong Kong · Feb 2026 — investor working dinner, laptop-friendly private dining",
      },
    ],
    localSuggestions: [
      {
        title: "Sand Hill Road VC-row proximity",
        detail: "Most Sand Hill Road firms are within a 2-min walk — useful if she has investor meetings stacked.",
        walkingMinutes: 2,
        basedOn: "Pattern: investor working dinners across both HK stays",
      },
      {
        title: "Cantor Arts Center at Stanford — quiet weekday afternoons",
        detail: "Soft lighting, no fluorescents in the contemporary wing. Migraine-safe break room.",
        walkingMinutes: undefined,
        basedOn: "Rosewood Hong Kong · Oct 2025 — migraine trigger flagged",
      },
    ],
    discretionFlags: [
      "If she mentions Series A close: low-key acknowledgment lands better than a celebration. No tablecards.",
    ],
    emotionalNotes:
      "Assistant Devika Rao books on her behalf — if Devika emails, copy her on all confirmations. Priya closed Series A — low-key acknowledgment if she raises it.",
    sourceVisits: [
      "Rosewood Hong Kong · Feb 2026 (investor dinner)",
      "Rosewood Hong Kong · Oct 2025 (first visit, working lunch)",
    ],
  },
  "daniel-edson-sand-hill": {
    guestName: "Daniel Edson",
    visitContext:
      "Member since 2022. First-ever visit to Rosewood Sand Hill. Regular at Rosewood London (3 stays, including Grand Manor House Wing), one prior visit to Rosewood Hong Kong.",
    arrivalIntel: {
      expectedAt: "ETA 15:50 today (Sat 16 May) — bell concierge holding at the portico",
      flightContext:
        "EL AL LY007 — Tel Aviv via London Heathrow. 7h longest leg + connection. Landed SFO 14:32.",
      baggageNote: "2 checked bags — bell concierge meeting at portico, escorted to villa",
      energyState:
        "11h time zone delta + long-haul. Defer formal welcome if he reads as exhausted. Light vegetarian dinner pre-stocked in villa (no meat, fish acceptable).",
    },
    accessibilityNeeds: [
      "Low-floor villa or elevator-adjacent — preference, not medical (Rosewood London profile)",
    ],
    prepActions: [
      "French press + Israeli black blend, ground, bedside before 6:30am wake — set without service intrusion",
      "Room facing west or interior courtyard — east-facing morning sun disrupts his sleep (London profile)",
      "Vegetarian, eats fish, no meat, lactose-light — kitchen-wide flag for the stay",
      "Blackout shades drawn 60 min before turndown — London preference",
      "Bell concierge meets at portico for the 2 checked bags — flight arrival fatigued",
    ],
    amenityReplenishment: [
      {
        item: "French press + Israeli black blend (ground), bedside, ready for 6:30am",
        sourcedFrom: "Rosewood London · Apr 2026 — bedside setup, no morning service intrusion",
      },
      {
        item: "Light vegetarian room-service dinner (cold plate + miso broth or local equivalent), pre-stocked",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — jet-lag arrival, light room-service first night",
      },
      {
        item: "Blackout shades drawn an hour before turndown — automatic",
        sourcedFrom: "Rosewood London · Dec 2025 — set across 4-night family stay",
      },
      {
        item: "Manhattan up, twist (no orange) — primed at Madera Bar",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — DarkSide bar profile",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Rachel be joining you in California, or is this a working trip?",
        basedOn:
          "Rosewood London · Dec 2025 — Grand Manor House Wing family stay; Rachel only joins for non-business stays",
      },
      {
        question:
          "Shall we hold a quiet room-service dinner tonight given the long flight, or do you prefer Madera at a quieter hour?",
        basedOn: "Rosewood Hong Kong · Nov 2025 — light room-service on jet-lag arrival; never the dining room first night",
      },
    ],
    localSuggestions: [
      {
        title: "Ridge Vineyards Rosé Reveal — chain-curated experience",
        detail: "If he extends beyond business: Saturday wine release at Ridge, ~25 min drive. Private host.",
        walkingMinutes: undefined,
        basedOn: "Pattern: enjoys curated experiences — booked Asaya Silky Glow facial at HK (Nov 2025)",
      },
      {
        title: "Cantor Arts Center at Stanford — Sunday quiet hours",
        detail: "Low-stim, intellectual fit. ~5 min drive. Skip if he's still recovering Sunday.",
        walkingMinutes: undefined,
        basedOn: "Pattern: pairs business trips with one cultural outing (HK Asaya · London Mirror Room)",
      },
    ],
    discretionFlags: [
      "Wife Rachel is only referenced in family/holiday stays — do not mention her if he arrives solo unless he raises her.",
      "Business partner Avi Mizrahi (separate adjacent rooms when traveling together) — do not assume travel partner.",
    ],
    emotionalNotes:
      "Long-haul transatlantic arrival from Tel Aviv. Reads as exhausted on first night. Father of two. Light handling preferred — staff should soft-touch the welcome, no oversharing of the brief at the door.",
    sourceVisits: [
      "Rosewood London · Apr 2026 (solo working stay)",
      "Rosewood London · Dec 2025 (Grand Manor House Wing, family)",
      "Rosewood Hong Kong · Nov 2025 (Silky Glow facial)",
    ],
  },
};

export function cachedBriefKey(guestId: string, propertyId: string) {
  return `${guestId}-${propertyId}`;
}

export function getCachedBrief(guestId: string, propertyId: string): Brief | undefined {
  return CACHED_BRIEFS[cachedBriefKey(guestId, propertyId)];
}
