export type PropertyId = "toronto" | "nyc" | "la";

export type Property = {
  id: PropertyId;
  name: string;
  city: string;
  neighborhood: string;
  signature: string;
};

export type AmenityObservation = {
  item: string;
  observation: string;
};

export type Visit = {
  propertyId: PropertyId;
  date: string;
  notes: string[];
  amenitiesUsed?: AmenityObservation[];
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
    accessibility?: string[];
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

export type AmenityReplenishment = {
  item: string;
  sourcedFrom: string;
};

export type SuggestedQuestion = {
  question: string;
  basedOn: string;
};

export type Brief = {
  guestName: string;
  visitContext: string;
  accessibilityNeeds: string[];
  prepActions: string[];
  amenityReplenishment: AmenityReplenishment[];
  suggestedQuestions: SuggestedQuestion[];
  emotionalNotes: string;
  sourceVisits: string[];
};
