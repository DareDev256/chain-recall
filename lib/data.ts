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
      },
      {
        propertyId: "toronto",
        date: "2025-11-02",
        notes: [
          "Stayed two nights, requested room temp at 19°C both nights",
          "Breakfast both mornings — soft scrambled, no toast, fruit",
          "Borrowed Didion's 'The White Album' from the library shelf",
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
      },
      {
        propertyId: "nyc",
        date: "2025-12-19",
        notes: [
          "Solo working dinner — Moleskine open, asked for single overhead lamp",
          "Wine: Cornas, not Côte-Rôtie (had to clarify)",
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
      },
      {
        propertyId: "la",
        date: "2025-08-30",
        notes: [
          "Visited with Lola, asked concierge for an unmarked car to LAX",
          "Loved the courtyard at dusk — sat there 90 minutes alone with a book",
        ],
      },
    ],
    preferences: {
      dietary: ["no dairy"],
      allergies: [],
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
      },
      {
        propertyId: "toronto",
        date: "2025-10-15",
        notes: [
          "First visit — solo, two-hour working lunch",
          "Mentioned getting migraines from bright lighting — flagged in profile",
          "Drank still water, ginger on the side",
        ],
      },
    ],
    preferences: {
      dietary: ["vegetarian", "eats cheese", "no fish"],
      allergies: [],
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
