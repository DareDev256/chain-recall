import type { Brief } from "./types";

/**
 * Compose the short audio script for the staff earpiece. This is the line
 * a head concierge would whisper into the bell captain's ear: short,
 * scannable, action-first, discretion-first.
 *
 * In production this can be tuned per chain voice / per property. For now
 * it's deterministic and derived from the structured Brief.
 */
export function composeWhisperScript(brief: Brief): string {
  const parts: string[] = [];

  const honorific = guessHonorific(brief.guestName);
  parts.push(`${honorific} arriving Rosewood Sand Hill.`);

  if (brief.arrivalIntel) {
    const time = brief.arrivalIntel.expectedAt.replace(/\([^)]*\)/g, "").trim();
    if (time) parts.push(time + ".");
    parts.push(brief.arrivalIntel.baggageNote + ".");
  }

  if (brief.accessibilityNeeds && brief.accessibilityNeeds.length > 0) {
    parts.push(`Non-negotiable. ${brief.accessibilityNeeds[0]}.`);
  }

  if (brief.prepActions[0]) parts.push(brief.prepActions[0] + ".");
  if (brief.prepActions[1]) parts.push(brief.prepActions[1] + ".");

  if (brief.discretionFlags && brief.discretionFlags.length > 0) {
    parts.push(`Discretion: ${brief.discretionFlags[0]}`);
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function guessHonorific(fullName: string): string {
  const first = fullName.split(" ")[0]?.toLowerCase() ?? "";
  const last = fullName.split(" ").slice(-1)[0] ?? fullName;
  const feminineFirsts = ["mei", "sarah", "priya", "lola", "rachel", "emma", "devika"];
  const isFeminine = feminineFirsts.some((f) => first.startsWith(f));
  return `${isFeminine ? "Ms." : "Mr."} ${last}`;
}
