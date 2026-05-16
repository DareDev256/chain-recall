export type PropertyId = "toronto" | "nyc" | "la";

export type Property = {
  id: PropertyId;
  name: string;
  city: string;
  neighborhood: string;
  signature: string;
};

export type Visit = {
  propertyId: PropertyId;
  date: string;
  notes: string[];
};

export type GuestProfile = {
  id: string;
  name: string;
  memberSince: string;
  homeCity: string;
  visits: Visit[];
  preferences: {
    dietary: string[];
    allergies: string[];
    roomTemp?: number;
    drink?: string;
    seating?: string;
    discretion?: string;
  };
  relationships: {
    label: string;
    name: string;
    detail?: string;
  }[];
};

export type Brief = {
  guestName: string;
  visitContext: string;
  prepActions: string[];
  emotionalNotes: string;
  sourceVisits: string[];
};
