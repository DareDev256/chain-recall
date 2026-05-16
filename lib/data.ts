import type { GuestProfile, Property } from "./types";

export const PROPERTIES: Record<string, Property> = {
  "hong-kong": {
    id: "hong-kong",
    name: "Rosewood Hong Kong",
    city: "Hong Kong",
    neighborhood: "Tsim Sha Tsui · Victoria Harbour",
    signature: "Vertical Asian flagship — Manor Club (40F), HENRY steakhouse, DarkSide, Asaya by Guerlain",
  },
  "sand-hill": {
    id: "sand-hill",
    name: "Rosewood Sand Hill",
    city: "Menlo Park",
    neighborhood: "Sand Hill Road · Silicon Valley",
    signature: "16-acre Mission-ranch estate — Madera (Michelin), Sense Spa, 2025 NICOLEHOLLIS villas (Ridge, Redwood, Verde, Orchard, Valley, Summit House)",
  },
  london: {
    id: "london",
    name: "Rosewood London",
    city: "London",
    neighborhood: "High Holborn · Theatre District",
    signature: "Edwardian Belle Époque — Holborn Dining Room (Calum Franklin pies), Scarfes Bar (Gerald Scarfe murals), Grand Manor House Wing (the only hotel suite with its own postcode)",
  },
};

export const GUESTS: GuestProfile[] = [
  {
    id: "mei-lin-chen",
    name: "Mei Lin Chen",
    memberSince: "2024",
    homeCity: "Hong Kong",
    visits: [
      {
        propertyId: "hong-kong",
        date: "2026-03-14",
        notes: [
          "Dinner alone at HENRY — quiet corner banquette by the window facing Victoria Harbour",
          "Ordered chamomile after the meal — not on the HENRY menu, kitchen made it",
          "Mentioned daughter Emma's school recital that week",
          "Asked turndown to skip the lavender pillow scenting — triggers headaches",
        ],
        amenitiesUsed: [
          { item: "chamomile tea (off-menu)", observation: "kitchen prepared twice; comped both times" },
          { item: "harbour-facing banquette at HENRY", observation: "preferred solo-dining seat across two stays" },
          { item: "lavender-free turndown", observation: "swapped from the default — confirmed allergy" },
        ],
      },
      {
        propertyId: "hong-kong",
        date: "2025-11-02",
        notes: [
          "Two-night stay, 19°C room confirmed both nights",
          "Breakfast at Holt's Cafe both mornings — soft scrambled, no toast, fruit plate",
          "Borrowed Didion's 'The White Album' from the Manor Club library",
        ],
        amenitiesUsed: [
          { item: "19°C room temperature", observation: "set on night one, no adjustment needed night two" },
          { item: "soft scrambled, no toast, fruit", observation: "ordered identically both mornings at Holt's Cafe" },
          { item: "Didion 'The White Album'", observation: "borrowed from Manor Club library, returned" },
        ],
      },
      {
        propertyId: "london",
        date: "2026-01-22",
        notes: [
          "First Rosewood London visit — work trip, two nights",
          "Late check-in (11pm) — kettle + chamomile pre-placed in room based on HK profile",
          "Loved this — wrote a thank-you note on Rosewood stationery to the GM next morning",
        ],
        amenitiesUsed: [
          { item: "chamomile + electric kettle, bedside, pre-placed", observation: "late check-in; relayed from HK profile; thank-you note written" },
          { item: "Rosewood stationery (handwritten note)", observation: "guest wrote a thank-you note to GM" },
        ],
      },
    ],
    preferences: {
      dietary: ["no toast"],
      allergies: ["lavender"],
      roomTemp: 19,
      drink: "chamomile, no caffeine after 4pm",
      seating: "quiet, away from speakers, near soft light",
    },
    relationships: [
      { label: "daughter", name: "Emma", detail: "turns 8 on May 22" },
    ],
  },
  {
    id: "marcus-okafor",
    name: "Marcus Okafor",
    memberSince: "2021",
    homeCity: "London",
    visits: [
      {
        propertyId: "london",
        date: "2026-04-08",
        notes: [
          "Anniversary dinner with wife Lola — booked at Scarfes Bar private corner, dimmed lights",
          "Negroni stirred not shaken — corrected the bartender mid-pour (politely)",
          "Lola allergic to shellfish, he is not",
          "Asked staff to not announce his name at the door — prefers discretion",
        ],
        amenitiesUsed: [
          { item: "Scarfes Bar private corner under the Gerald Scarfe King Charles drawing", observation: "anniversary dinner; same booking as 2025 anniversary" },
          { item: "Negroni — stirred, not shaken", observation: "second time the standing-house preparation was corrected; flag for all Rosewood bars" },
          { item: "no-shellfish menu (wife Lola)", observation: "kitchen flagged for the table, not just the entree" },
        ],
      },
      {
        propertyId: "london",
        date: "2025-12-19",
        notes: [
          "Solo working dinner at Holborn Dining Room — back booth, single low lamp, Moleskine open",
          "Ordered the signature Beef Hotpot pie + a glass of Cornas (not Côte-Rôtie — had to clarify)",
        ],
        amenitiesUsed: [
          { item: "back booth at Holborn Dining Room with single low lamp", observation: "solo working dinner; reads with a Moleskine" },
          { item: "Beef Hotpot pie + Cornas by the glass", observation: "second time he clarified Cornas, not Côte-Rôtie" },
        ],
      },
      {
        propertyId: "hong-kong",
        date: "2026-02-11",
        notes: [
          "Three-night stay in Manor Club tier (40F)",
          "DarkSide bar regular — Negroni-stirred logged at the HK bar after London relay",
          "Booked the Manor private dining room twice for solo viewings of contracts",
          "No dairy — kitchen-wide flag, held for entire stay",
          "Tipped night staff cash in plain envelopes, no name",
        ],
        amenitiesUsed: [
          { item: "Manor private dining room (twice over three nights)", observation: "solo, no service interruptions" },
          { item: "DarkSide Negroni-stirred", observation: "logged on first night, automatic on remaining nights" },
          { item: "no-dairy menu, kitchen-wide flag", observation: "extended across breakfast, room service, and Asaya Kitchen" },
          { item: "unmarked envelopes for night staff tips", observation: "staff was briefed not to acknowledge the gesture" },
        ],
      },
      {
        propertyId: "hong-kong",
        date: "2025-08-30",
        notes: [
          "Visited with Lola — asked concierge for an unmarked black car to HKIA",
          "Sat at Asaya Kitchen courtyard at dusk 90 minutes alone with a book",
        ],
        amenitiesUsed: [
          { item: "unmarked black car to HKIA", observation: "no Rosewood branding on vehicle" },
          { item: "Asaya Kitchen courtyard reading chair at dusk", observation: "90-minute solo read; staff held back service" },
        ],
      },
    ],
    preferences: {
      dietary: ["no dairy"],
      allergies: [],
      accessibility: [
        "Prefers ground-floor or elevator-adjacent room — partial knee replacement Feb 2025, ongoing recovery (flagged London profile)",
      ],
      drink: "Negroni — stirred, not shaken. Cornas if wine.",
      seating: "back room or back booth, single overhead light",
      discretion: "Never announce name at entry. No public greeting.",
    },
    relationships: [
      { label: "wife", name: "Lola", detail: "anniversary July 8, shellfish allergy" },
    ],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    memberSince: "2025",
    homeCity: "Singapore",
    visits: [
      {
        propertyId: "hong-kong",
        date: "2026-02-28",
        notes: [
          "Working dinner with investors at Asaya Kitchen private room — laptop open whole time",
          "Asked overhead fluorescents off — staff swapped to lamps",
          "Vegetarian, eats cheese, no fish",
          "Assistant Devika handled the booking — copied on all confirmations",
        ],
        amenitiesUsed: [
          { item: "Asaya Kitchen private dining room", observation: "investor working dinner; laptop on table whole evening" },
          { item: "table lamps (overhead fluorescents off)", observation: "swapped on arrival — migraine trigger flagged" },
          { item: "vegetarian set menu with cheese, no fish", observation: "kitchen built around dietary line" },
        ],
      },
      {
        propertyId: "hong-kong",
        date: "2025-10-15",
        notes: [
          "First visit — solo, two-hour working lunch at Asaya Kitchen",
          "Mentioned getting migraines from bright lighting — flagged in profile",
          "Drank still water with ginger on the side, no ice",
        ],
        amenitiesUsed: [
          { item: "still water with ginger, no ice", observation: "kitchen defaults to this on her arrival now" },
          { item: "soft lamp lighting (overheads off)", observation: "first observation of migraine trigger" },
        ],
      },
    ],
    preferences: {
      dietary: ["vegetarian", "eats cheese", "no fish"],
      allergies: [],
      accessibility: [
        "No overhead fluorescent lighting in seating area — confirmed migraine trigger (HK, Oct 2025)",
      ],
      drink: "still water with ginger on the side",
      seating: "back corner, laptop-friendly",
    },
    relationships: [
      {
        label: "assistant",
        name: "Devika Rao",
        detail: "books on her behalf — devika@sharma.bio",
      },
    ],
  },
  {
    id: "daniel-edson",
    name: "Daniel Edson",
    memberSince: "2022",
    homeCity: "London",
    visits: [
      {
        propertyId: "london",
        date: "2026-04-22",
        notes: [
          "Solo working stay, 3 nights, French press + Israeli black blend bedside every morning",
          "Holborn Dining Room private booth — Beef Hotpot pie + house red, no aperitif",
          "Asked for room facing away from morning sun — light sleeper, no curtains thick enough on east-facing",
        ],
        amenitiesUsed: [
          { item: "French press + Israeli black blend ground", observation: "set bedside before 6:30am wake; no service intrusion" },
          { item: "Holborn Dining Room private booth", observation: "Beef Hotpot pie repeat order; house red, no aperitif" },
          { item: "room facing west or interior courtyard", observation: "morning sun is a sleep disruptor; flagged in profile" },
        ],
      },
      {
        propertyId: "london",
        date: "2025-12-19",
        notes: [
          "Family stay with wife Rachel for Christmas — Grand Manor House Wing (private postcode entrance)",
          "Mirror Room afternoon tea with Rachel — vegetarian set, no scones with cream (lactose-light)",
          "Asked for blackout shades drawn an hour before turndown",
        ],
        amenitiesUsed: [
          { item: "Grand Manor House Wing", observation: "private entrance from High Holborn used both arrivals and departures" },
          { item: "Mirror Room vegetarian afternoon tea", observation: "with Rachel; no cream with scones" },
          { item: "early blackout shade drawdown", observation: "60 minutes before turndown" },
        ],
      },
      {
        propertyId: "hong-kong",
        date: "2025-11-08",
        notes: [
          "Solo business trip — flew in jet-lagged, ordered light room-service vegetarian dinner first night",
          "DarkSide bar regular — Manhattan up, twist (note: not orange)",
          "Asaya by Guerlain — booked the Silky Glow jade-and-silk facial (90 min)",
        ],
        amenitiesUsed: [
          { item: "light vegetarian room-service dinner on jet-lag arrival", observation: "no kitchen, just bento-style cold plate + miso broth" },
          { item: "DarkSide Manhattan, up, twist (no orange)", observation: "logged in HK bar profile" },
          { item: "Asaya Silky Glow facial", observation: "90-minute booking; requested same therapist for any return" },
        ],
      },
    ],
    preferences: {
      dietary: ["vegetarian", "eats fish", "no meat", "lactose-light"],
      allergies: [],
      accessibility: [
        "Prefers low-floor or elevator-adjacent room (preference, not medical) — flagged London profile",
      ],
      drink: "French press, Israeli black blend, no milk, no sugar. Manhattan up, twist, no orange.",
      seating: "private booth or back room when dining, west or interior-facing rooms",
    },
    relationships: [
      { label: "wife", name: "Rachel", detail: "joins for European/holiday stays only; not business trips" },
      { label: "business partner", name: "Avi Mizrahi", detail: "separate adjacent rooms when traveling together" },
    ],
  },
];

export function getGuest(id: string): GuestProfile | undefined {
  return GUESTS.find((g) => g.id === id);
}

export function getProperty(id: string): Property | undefined {
  return PROPERTIES[id];
}
