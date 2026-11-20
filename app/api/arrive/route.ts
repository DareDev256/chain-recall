import { sharedGate, clientIp } from "@/lib/shared-gate";
import { NextRequest } from "next/server";
import { compose } from "@/lib/compose";
import { publish } from "@/lib/eventBus";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Spend gate (Workers KV, shared by every isolate): per-IP hourly and global daily caps.
  const gate = await sharedGate(clientIp(req));
  if (!gate.ok) {
    return Response.json(
      { error: gate.reason },
      { status: gate.status, headers: gate.retryAfterSeconds ? { "Retry-After": String(gate.retryAfterSeconds) } : undefined },
    );
  }
  const { guestId, propertyId } = await req.json();
  if (!guestId || !propertyId) {
    return Response.json({ error: "guestId and propertyId required" }, { status: 400 });
  }

  publish({ type: "computing", guestId, propertyId });

  const brief = await compose(guestId, propertyId);
  publish({ type: "brief", brief, guestId, propertyId });

  return Response.json({ ok: true, brief });
}
