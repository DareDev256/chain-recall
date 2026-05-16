import type { Brief } from "./types";

type Listener = (brief: Brief) => void;

const listeners = new Set<Listener>();

export function publish(brief: Brief) {
  for (const l of listeners) l(brief);
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
