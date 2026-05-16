/**
 * Oracle OPERA PMS adapter.
 *
 * In production this module is the integration boundary against Oracle OPERA
 * Cloud (OPERA Hospitality Integration Platform, OHIP) or any equivalent PMS.
 * The composer never imports from `lib/data.ts` directly — it goes through
 * this adapter — so the architecture stays honest:
 *
 *     Oracle OPERA  →  this adapter  →  cross-property memory  →  Claude composer  →  staff tablet
 *
 * For the hackathon demo, the adapter is backed by an in-memory mock corpus
 * (`lib/data.ts`). Swap this file's implementation for an OHIP REST client and
 * the rest of the stack does not change.
 *
 * OHIP reference (production target):
 *   - `GET /crm/v1/profiles/{profileId}` for guest record
 *   - `GET /fof/v1/operations/property/{propertyCode}` for property metadata
 *   - `GET /crm/v1/profiles/{profileId}/stayRecords` for cross-property visits
 */

import { GUESTS, PROPERTIES, getGuest, getProperty } from "../data";
import type { GuestProfile, Property } from "../types";

export type OperaGuestRecord = GuestProfile;
export type OperaPropertyRecord = Property;

const MOCK_LATENCY_MS = 80;

function mockLatency<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS));
}

/**
 * Fetch a guest profile by Oracle profile ID.
 *
 * In production: calls `GET /crm/v1/profiles/{profileId}` on OHIP, normalizes
 * the response into a `GuestProfile`, and merges cross-property stay history
 * from the stayRecords endpoint.
 */
export async function fetchGuestRecord(
  operaProfileId: string,
): Promise<OperaGuestRecord | undefined> {
  // eslint-disable-next-line no-console
  console.log(`[OPERA] fetchGuestRecord profileId=${operaProfileId}`);
  const guest = getGuest(operaProfileId);
  return mockLatency(guest);
}

/**
 * Fetch property metadata by Oracle property code.
 *
 * In production: calls `GET /fof/v1/operations/property/{propertyCode}` on OHIP.
 */
export async function fetchPropertyRecord(
  operaPropertyCode: string,
): Promise<OperaPropertyRecord | undefined> {
  // eslint-disable-next-line no-console
  console.log(`[OPERA] fetchPropertyRecord propertyCode=${operaPropertyCode}`);
  const property = getProperty(operaPropertyCode);
  return mockLatency(property);
}

/**
 * Fetch all known guest profile IDs. Used by the demo arrival page to render
 * the picklist. In production this would be a search query against the OPERA
 * profile index, scoped to active members.
 */
export function listKnownGuestIds(): string[] {
  return GUESTS.map((g) => g.id);
}

/**
 * Fetch all known property codes. In production: scoped to the chain's
 * tenant in OPERA Cloud.
 */
export function listKnownPropertyCodes(): string[] {
  return Object.keys(PROPERTIES);
}
