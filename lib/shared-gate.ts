// Shared spend gate for the paid routes, added 2026-11-19 when the app moved from Vercel to
// Cloudflare Workers. The in-memory limiter in rate-limit.ts is per isolate, and Workers spread
// requests across many isolates, so on its own it no longer caps anything. This gate keeps two
// counters in Workers KV, shared by every isolate:
//   - per client IP per UTC hour (default 10, env SG_PER_IP_HOUR)
//   - global per UTC day (default 100 paid calls, env SG_DAILY_MAX)
// KV is eventually consistent, so a burst can overshoot by a few calls; the Anthropic account's
// monthly spend limit is the hard backstop. Outside Workers (tests, next dev) there is no KV
// binding and the gate is a no-op, leaving the in-memory limiter in charge.
import { getCloudflareContext } from "@opennextjs/cloudflare";

type KV = { get(k: string): Promise<string | null>; put(k: string, v: string, o?: { expirationTtl?: number }): Promise<void> };

function envInt(name: string, fallback: number): number {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function kv(): KV | null {
  try {
    const env = getCloudflareContext().env as unknown as { SPEND_GATE?: KV };
    return env.SPEND_GATE ?? null;
  } catch {
    return null;
  }
}

export interface SharedGateResult { ok: boolean; status: number; reason: string; retryAfterSeconds?: number }

export async function sharedGate(ip: string): Promise<SharedGateResult> {
  const store = kv();
  if (!store) return { ok: true, status: 200, reason: "" };
  const now = Date.now();
  const hour = Math.floor(now / 3_600_000);
  const day = Math.floor(now / 86_400_000);
  const ipKey = `ip:${ip}:${hour}`;
  const dayKey = `day:${day}`;
  const [ipRaw, dayRaw] = await Promise.all([store.get(ipKey), store.get(dayKey)]);
  const ipCount = Number(ipRaw ?? 0);
  const dayCount = Number(dayRaw ?? 0);
  if (dayCount >= envInt("SG_DAILY_MAX", 100)) {
    return { ok: false, status: 429, reason: "The demo has reached its daily limit. Please come back tomorrow.", retryAfterSeconds: 3600 };
  }
  if (ipCount >= envInt("SG_PER_IP_HOUR", 10)) {
    return { ok: false, status: 429, reason: "You have reached the hourly limit for this demo. Please try again later.", retryAfterSeconds: 3600 - Math.floor((now % 3_600_000) / 1000) };
  }
  await Promise.all([
    store.put(ipKey, String(ipCount + 1), { expirationTtl: 7200 }),
    store.put(dayKey, String(dayCount + 1), { expirationTtl: 172800 }),
  ]);
  return { ok: true, status: 200, reason: "" };
}

/** Client identity for the gate: cf-connecting-ip is set by Cloudflare and cannot be supplied by the client. */
export function clientIp(req: { headers: { get(name: string): string | null } }): string {
  return req.headers.get("cf-connecting-ip")?.trim() || req.headers.get("x-real-ip")?.trim() || "unknown";
}
