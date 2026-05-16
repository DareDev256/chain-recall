import type { GuestProfile, Property } from "./types";

export const PROPERTIES: Record<string, Property> = {
  toronto: {
    id: "toronto",
    name: "Halcyon Toronto",
    city: "Toronto",
    neighborhood: "King East",
    signature: "Heritage library bar, rooftop garden",
  },
  nyc: {
    id: "nyc",
    name: "Halcyon NYC",
    city: "New York",
    neighborhood: "SoHo",
    signature: "Loft floors, basement listening room",
  },
  la: {
    id: "la",
    name: "Halcyon LA",
    city: "Los Angeles",
    neighborhood: "Beverly Grove",
    signature: "Open courtyard, members' screening room",
  },
};

export const GUESTS: GuestProfile[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    memberSince: "2024",
    homeCity: "Toronto",
    visits: [
      {
        propertyId: "toronto",
        date: "2026-03-14",
        notes: [
          "Dinner alone, took quiet corner table by the fireplace",
          "Ordered chamomile after the meal — not on the menu, kitchen made it",
          "Mentioned daughter Emma's school recital that week",
          "Asked turndown to skip the lavender pillow — gave her a headache",
        ],
        amenitiesUsed: [
          { item: "chamomile tea (off-menu, kitchen prepared)", observation: "requested twice on this stay; staff comped both times" },
          { item: "fireplace corner seating", observation: "always requests this table on solo dinners" },
          { item: "lavender-free turndown package", observation: "swapped from default — allergy" },
        ],
      },
      {
        propertyId: "toronto",
        date: "2025-11-02",
        notes: [
          "Stayed two nights, requested room temp at 19°C both nights",
          "Breakfast both mornings — soft scrambled, no toast, fruit",
          "Borrowed Didion's 'The White Album' from the library shelf",
        ],
        amenitiesUsed: [
          { item: "19°C room temperature", observation: "set both nights without prompting on night two" },
          { item: "soft scrambled eggs, no toast, fruit plate", observation: "ordered identically both mornings" },
          { item: "Didion 'The White Album' (library)", observation: "borrowed from library shelf, returned" },
        ],
      },
      {
        propertyId: "nyc",
        date: "2026-01-22",
        notes: [
          "First NYC visit — work trip, two nights",
          "Late check-in (11pm) — front desk had kettle and chamomile ready in room (relayed from Toronto profile)",
          "Loved this — wrote a thank-you note to the GM the next morning",
        ],
        amenitiesUsed: [
          { item: "chamomile tea + kettle bedside", observation: "pre-placed before late check-in based on Toronto profile; thank-you note written" },
          { item: "Halcyon stationery (hand-written note)", observation: "guest wrote a thank-you note to GM on stay" },
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
    homeCity: "New York",
    visits: [
      {
        propertyId: "nyc",
        date: "2026-04-08",
        notes: [
          "Anniversary dinner with wife Lola — booked back room, dimmed lights",
          "Negroni stirred not shaken — corrected the bartender mid-pour (politely)",
          "Wife allergic to shellfish, he is not",
          "Asked staff to not announce his name at the door — prefers discretion",
        ],
        amenitiesUsed: [
          { item: "back room booking with dimmed lighting", observation: "anniversary dinner — same booking as 2025 anniversary" },
          { item: "Negroni — stirred, not shaken", observation: "second time the standing-house preparation was corrected; flag for all bars" },
          { item: "no-shellfish menu (wife Lola)", observation: "kitchen flagged for the table, not just the entree" },
        ],
      },
      {
        propertyId: "nyc",
        date: "2025-12-19",
        notes: [
          "Solo working dinner — Moleskine open, asked for single overhead lamp",
          "Wine: Cornas, not Côte-Rôtie (had to clarify)",
        ],
        amenitiesUsed: [
          { item: "single overhead lamp at back corner table", observation: "working-dinner setup; reads with a Moleskine" },
          { item: "Cornas (Rhône) by the glass", observation: "second time he clarified Cornas, not Côte-Rôtie" },
        ],
      },
      {
        propertyId: "la",
        date: "2026-02-11",
        notes: [
          "Three-night stay, screening room booked twice for private viewings",
          "No dairy — kitchen flagged on first dinner, held for entire stay",
          "Tipped night staff cash in plain envelopes, no name",
        ],
        amenitiesUsed: [
          { item: "private screening room (twice over three nights)", observation: "booked solo both times; concierge handled film selection" },
          { item: "no-dairy menu, kitchen-wide flag", observation: "extended across breakfast, room service, and bar snacks" },
          { item: "unmarked envelopes for night staff tips", observation: "staff was briefed not to acknowledge the gesture" },
        ],
      },
      {
        propertyId: "la",
        date: "2025-08-30",
        notes: [
          "Visited with Lola, asked concierge for an unmarked car to LAX",
          "Loved the courtyard at dusk — sat there 90 minutes alone with a book",
        ],
        amenitiesUsed: [
          { item: "unmarked black car to LAX", observation: "concierge service; no chain branding on the vehicle" },
          { item: "courtyard reading chair at dusk", observation: "90-minute solo read; staff held back service" },
        ],
      },
    ],
    preferences: {
      dietary: ["no dairy"],
      allergies: [],
      accessibility: [
        "Prefers ground-floor or elevator-adjacent rooms — partial knee replacement Feb 2025, ongoing recovery (flagged in NYC profile)",
      ],
      drink: "Negroni — stirred, not shaken. Cornas if wine.",
      seating: "back room or back corner, single overhead light",
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
    homeCity: "San Francisco",
    visits: [
      {
        propertyId: "toronto",
        date: "2026-02-28",
        notes: [
          "Working dinner with investors — back corner table, laptop open the whole time",
          "Asked overhead fluorescents to be turned off — staff swapped to lamps",
          "Vegetarian, eats cheese, no fish",
          "Assistant Devika handled the booking — copied on all confirmations",
        ],
        amenitiesUsed: [
          { item: "back corner laptop-friendly table", observation: "investor working dinner; laptop open whole time" },
          { item: "table lamps (overheads off)", observation: "staff swapped overhead fluorescents for desk lamps — migraine trigger" },
          { item: "vegetarian set menu with cheese, no fish", observation: "kitchen built around the dietary line" },
        ],
      },
      {
        propertyId: "toronto",
        date: "2025-10-15",
        notes: [
          "First visit — solo, two-hour working lunch",
          "Mentioned getting migraines from bright lighting — flagged in profile",
          "Drank still water, ginger on the side",
        ],
        amenitiesUsed: [
          { item: "still water with ginger on the side, no ice", observation: "kitchen now defaults to this on arrival" },
          { item: "soft lamp lighting (overheads off)", observation: "first observation of migraine trigger — flagged in profile" },
        ],
      },
    ],
    preferences: {
      dietary: ["vegetarian", "eats cheese", "no fish"],
      allergies: [],
      accessibility: [
        "No overhead fluorescent lighting in seating area — confirmed migraine trigger (flagged Toronto, Oct 2025)",
      ],
      drink: "still water with ginger on the side",
      seating: "back corner, laptop-friendly, no overhead fluorescents (migraine trigger)",
    },
    relationships: [
      {
        label: "assistant",
        name: "Devika Rao",
        detail: "books on her behalf — devika@sharma.bio",
      },
    ],
  },
];

export function getGuest(id: string): GuestProfile | undefined {
  return GUESTS.find((g) => g.id === id);
}

export function getProperty(id: string): Property | undefined {
  return PROPERTIES[id];
}
