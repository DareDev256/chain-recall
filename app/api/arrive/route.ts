import { NextRequest } from "next/server";
import { compose } from "@/lib/compose";
import { publish } from "@/lib/eventBus";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { guestId, propertyId } = await req.json();
  if (!guestId || !propertyId) {
    return Response.json({ error: "guestId and propertyId required" }, { status: 400 });
  }

  const brief = await compose(guestId, propertyId);
  publish(brief);

  return Response.json({ ok: true, brief });
}
