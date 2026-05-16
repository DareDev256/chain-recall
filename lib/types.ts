export type PropertyId = "hong-kong" | "sand-hill" | "london";

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
  loggedBy?: string;
};

export type AttractionVisit = {
  name: string;
  date?: string;
  loggedBy?: string;
  guestComment?: string;
};

export type Visit = {
  propertyId: PropertyId;
  date: string;
  notes: string[];
  amenitiesUsed?: AmenityObservation[];
  attractionsVisited?: AttractionVisit[];
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
  loggedBy?: string;
};

export type SuggestedQuestion = {
  question: string;
  basedOn: string;
  loggedBy?: string;
};

export type ArrivalIntel = {
  expectedAt: string;
  flightContext: string;
  baggageNote: string;
  energyState: string;
};

export type LocalSuggestion = {
  title: string;
  detail: string;
  walkingMinutes?: number;
  basedOn: string;
  loggedBy?: string;
};

export type Brief = {
  guestName: string;
  visitContext: string;
  arrivalIntel?: ArrivalIntel;
  accessibilityNeeds: string[];
  prepActions: string[];
  amenityReplenishment: AmenityReplenishment[];
  suggestedQuestions: SuggestedQuestion[];
  localSuggestions?: LocalSuggestion[];
  discretionFlags?: string[];
  emotionalNotes: string;
  sourceVisits: string[];
};
