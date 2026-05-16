import type { Brief } from "./types";

export type ChainEvent =
  | { type: "computing"; guestId: string; propertyId: string }
  | { type: "brief"; brief: Brief };

type Listener = (event: ChainEvent) => void;

const listeners = new Set<Listener>();

export function publish(event: ChainEvent) {
  for (const l of listeners) l(event);
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
