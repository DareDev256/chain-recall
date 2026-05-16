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
        loggedBy: "Reception · London, Tom Bradley, 22 Jan 2026 22:47 (night shift)",
      },
      {
        item: "Lavender-free turndown package (cedar or unscented substitute)",
        sourcedFrom: "Rosewood Hong Kong · Mar 2026 + Nov 2025 — confirmed allergy",
        loggedBy: "Housekeeping · Hong Kong, Ah-Ling Wong, 14 Mar 2026 21:18",
      },
      {
        item: "A Didion follow-up — 'The Year of Magical Thinking' on the bedside",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — borrowed 'The White Album' from the Manor Club library",
        loggedBy: "Manor Club library · Hong Kong, Vincent Lai, 04 Nov 2025",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Would you like the chamomile and kettle service for the full stay, similar to your London arrival?",
        basedOn: "Rosewood London · Jan 2026 — she wrote a thank-you note for the late-arrival kettle",
        loggedBy: "Front desk · London, Tom Bradley, 23 Jan 2026 09:12 (handover note)",
      },
      {
        question:
          "On your Hong Kong stays you visited the Hong Kong Museum of Art twice — shall we arrange a private viewing at the Cantor Arts Center at Stanford?",
        basedOn:
          "Rosewood Hong Kong · Mar 2026 + Nov 2025 — concierge booked both visits; she stayed >2 hours each time",
        loggedBy: "Concierge · Hong Kong, Mei Cheng, 14 Mar 2026 + 03 Nov 2025",
      },
      {
        question:
          "Is Emma joining you in California, or is she home in Hong Kong this trip?",
        basedOn: "Rosewood Hong Kong · Mar 2026 — mentioned daughter's school recital; her 8th birthday is May 22",
        loggedBy: "Server · HENRY restaurant, Hong Kong, Felix Cheung, 14 Mar 2026 20:40",
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
    recurringPatterns: [
      { pattern: "Chamomile after dinner (off-menu, kitchen prepares)", frequency: "3 of 3 stays · all 3 properties", category: "preference" },
      { pattern: "19°C room temperature", frequency: "2 of 2 multi-night stays", category: "preference" },
      { pattern: "Lavender-free turndown", frequency: "3 of 3 stays — confirmed allergy", category: "operational" },
      { pattern: "Borrows a library book on multi-night stays", frequency: "1 of 1 multi-night to date (emerging)", category: "behavioral" },
    ],
    serviceRecovery: [
      {
        date: "2025-08-12",
        property: "Rosewood Hong Kong",
        issue: "Lavender sachet placed in turndown despite allergy flag (rotating housekeeping crew unfamiliar with profile). Headache reported at checkout.",
        resolution: "GM apology + complimentary Asaya chamomile in-room service for the remaining stay. Lavender allergy promoted to system-wide flag (all properties). Housekeeping pre-arrival briefing protocol updated chain-wide.",
        preventedRecurrence: true,
        loggedBy: "GM · Hong Kong, Henry Cheng, 12 Aug 2025 (post-checkout follow-up call)",
      },
    ],
    memberSnapshot: {
      memberSince: "2024",
      totalStays: 3,
      propertiesVisited: 2,
      loyaltyTier: "Rosewood Elite · Tier I",
    },
    privacyState: "opted-in",
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
    recurringPatterns: [
      { pattern: "Negroni stirred, not shaken", frequency: "4 of 4 stays — corrected twice, now system-wide flag", category: "preference" },
      { pattern: "Back booth or private corner for solo dining", frequency: "4 of 4 stays", category: "preference" },
      { pattern: "Cash tips in unmarked envelopes for night staff", frequency: "3 of 4 stays — solo trips only", category: "behavioral" },
      { pattern: "No-dairy kitchen-wide flag", frequency: "4 of 4 stays", category: "operational" },
      { pattern: "No public greeting at entry — discretion preference", frequency: "4 of 4 stays — chain-wide flag", category: "operational" },
    ],
    serviceRecovery: [
      {
        date: "2025-12-19",
        property: "Rosewood London",
        issue: "Negroni served shaken not stirred at Scarfes Bar — despite prior corrections at Rosewood NYC. Guest corrected politely mid-pour.",
        resolution: "Bar manager apology + remade drink. Negroni-stirred preference promoted from personal note to system-wide default across all Rosewood bar profiles for this member.",
        preventedRecurrence: true,
        loggedBy: "Bar Manager · Scarfes Bar London, Vincent Mwangi, 19 Dec 2025 21:48",
      },
    ],
    memberSnapshot: {
      memberSince: "2021",
      totalStays: 4,
      propertiesVisited: 2,
      loyaltyTier: "Rosewood Elite · Tier II",
    },
    privacyState: "opted-in",
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
    recurringPatterns: [
      { pattern: "Vegetarian set menu — cheese yes, no fish", frequency: "2 of 2 stays — kitchen-wide flag", category: "preference" },
      { pattern: "Still water with ginger, no ice", frequency: "2 of 2 stays — kitchen default", category: "preference" },
      { pattern: "Overhead fluorescents off, lamps preferred (migraine trigger)", frequency: "2 of 2 stays — chain-wide flag", category: "operational" },
      { pattern: "Laptop-open working dinners, investor company", frequency: "2 of 2 stays", category: "behavioral" },
      { pattern: "Devika Rao (assistant) copied on all confirmations", frequency: "2 of 2 bookings", category: "operational" },
    ],
    memberSnapshot: {
      memberSince: "2025",
      totalStays: 2,
      propertiesVisited: 1,
      loyaltyTier: "Rosewood Elite · Tier I",
    },
    privacyState: "opted-in",
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
        loggedBy: "Housekeeping · London, Anika Patel, 22 Apr 2026 05:50 (early shift)",
      },
      {
        item: "Light vegetarian room-service dinner (cold plate + miso broth or local equivalent), pre-stocked",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — jet-lag arrival, light room-service first night",
        loggedBy: "In-Room Dining · Hong Kong, Felix Cheung, 08 Nov 2025 19:32",
      },
      {
        item: "Blackout shades drawn an hour before turndown — automatic",
        sourcedFrom: "Rosewood London · Dec 2025 — set across 4-night family stay",
        loggedBy: "Housekeeping · London, Maria Costa, 20 Dec 2025 (carried into nightly turndown)",
      },
      {
        item: "Manhattan up, twist (no orange) — primed at Madera Bar",
        sourcedFrom: "Rosewood Hong Kong · Nov 2025 — DarkSide bar profile",
        loggedBy: "Bar · DarkSide, Hong Kong, Wei Chen, 08 Nov 2025 22:15 (mid-shift handover)",
      },
    ],
    suggestedQuestions: [
      {
        question:
          "Will Rachel be joining you in California, or is this a working trip?",
        basedOn:
          "Rosewood London · Dec 2025 — Grand Manor House Wing family stay; Rachel only joins for non-business stays",
        loggedBy: "Front desk · London, Tom Bradley, 19 Dec 2025 (check-in note)",
      },
      {
        question:
          "On your December family stay you toured the Tower of London with Rachel — shall we arrange the Filoli Estate gardens tour if you extend?",
        basedOn:
          "Rosewood London · Dec 2025 — concierge booked Tower of London Ceremony of the Keys for the family",
        loggedBy: "Concierge · London, Henrietta Vaughn, 21 Dec 2025 (post-tour follow-up)",
      },
      {
        question:
          "Shall we hold a quiet room-service dinner tonight given the long flight, or do you prefer Madera at a quieter hour?",
        basedOn: "Rosewood Hong Kong · Nov 2025 — light room-service on jet-lag arrival; never the dining room first night",
        loggedBy: "In-Room Dining · Hong Kong, Felix Cheung, 08 Nov 2025 19:32",
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
    recurringPatterns: [
      { pattern: "French press + Israeli black blend bedside before 6:30am", frequency: "2 of 2 morning stays — no service intrusion", category: "preference" },
      { pattern: "Vegetarian, eats fish, no meat, lactose-light", frequency: "3 of 3 stays — kitchen-wide flag", category: "preference" },
      { pattern: "Manhattan up, twist (no orange)", frequency: "1 of 1 bar visits — flagged forward to Madera", category: "preference" },
      { pattern: "Blackout shades drawn 60 min before turndown", frequency: "2 of 2 evening stays", category: "operational" },
      { pattern: "Room facing west or interior (no morning sun)", frequency: "2 of 2 stays — sleep disruptor flag", category: "operational" },
    ],
    serviceRecovery: [
      {
        date: "2026-04-22",
        property: "Rosewood London",
        issue: "Morning French press setup delivered with carafe + water but unground beans alongside. Guest had to grind beans himself.",
        resolution: "Housekeeping retrained on Edson's setup specifically — beans must arrive pre-ground in the carafe with hot water on demand within 2 minutes. Complimentary breakfast credit added. Profile note now explicit: 'grounds in carafe ready'.",
        preventedRecurrence: true,
        loggedBy: "Housekeeping Manager · London, Sofia Vargas, 22 Apr 2026 06:18",
      },
    ],
    memberSnapshot: {
      memberSince: "2022",
      totalStays: 7,
      propertiesVisited: 2,
      loyaltyTier: "Rosewood Elite · Tier II",
    },
    privacyState: "opted-in",
  },
  "elena-vasquez-sand-hill": {
    guestName: "Elena Vasquez",
    visitContext:
      "Member since 2023. First visit to Rosewood Sand Hill. Opted out of cross-property recognition March 2026.",
    memberSnapshot: {
      memberSince: "2023",
      totalStays: 3,
      propertiesVisited: 2,
      loyaltyTier: "Rosewood Elite · Tier I",
    },
    privacyState: "opted-out",
    privacyNote:
      "Member exercised cross-property data opt-out via guest portal on 01 Mar 2026 (GDPR Art. 17 / CCPA §1798.105). Prior stay records remain in OPERA for contractual purposes but are EXCLUDED from this brief. Sandy did not query her history.",
    accessibilityNeeds: [],
    prepActions: [
      "Standard check-in welcome packet ready",
      "Room key + Sand Hill property orientation card",
      "Express check-in option available per Member Terms — offer once, do not press",
      "Wine + small bites in the lobby lounge if she'd like to settle before the villa",
    ],
    amenityReplenishment: [],
    suggestedQuestions: [
      {
        question:
          "Welcome to Rosewood Sand Hill, Ms. Vasquez. Is there anything you'd like us to know about this stay?",
        basedOn:
          "Privacy opt-out — re-onboarding happens at the guest's pace, on her terms",
        loggedBy: "Front desk protocol · all properties · effective 01 Mar 2026",
      },
    ],
    localSuggestions: [],
    discretionFlags: [
      "Do NOT reference prior Rosewood London (Sep 2025) or Hong Kong (Feb 2026, Jul 2025) stays. Cross-property recognition is explicitly opted out.",
      "If she volunteers a preference or mentions a prior stay, treat it as her invitation. Confirm we can re-add her to cross-property recognition via the portal if she wishes.",
      "No surprise welcome amenities. Any in-room placement requires her explicit opt-in conversation today.",
    ],
    emotionalNotes:
      "Privacy preference is part of how she experiences luxury. The chain earned her membership; the relationship earns her data, on her timeline. When she wants to share, she will. Until then, we earn the relationship.",
    sourceVisits: [
      "Member profile · contractual visit confirmation only",
    ],
  },
};

export function cachedBriefKey(guestId: string, propertyId: string) {
  return `${guestId}-${propertyId}`;
}

export function getCachedBrief(guestId: string, propertyId: string): Brief | undefined {
  return CACHED_BRIEFS[cachedBriefKey(guestId, propertyId)];
}
