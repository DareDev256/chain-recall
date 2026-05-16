import type { Brief } from "./types";
import type { StaffNote } from "./memoryLog";

export type ChainEvent =
  | { type: "computing"; guestId: string; propertyId: string }
  | { type: "brief"; brief: Brief; guestId: string; propertyId: string }
  | { type: "note"; note: StaffNote };

type Listener = (event: ChainEvent) => void;

const listeners = new Set<Listener>();

export function publish(event: ChainEvent) {
  for (const l of listeners) l(event);
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
