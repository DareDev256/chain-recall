import { NextRequest } from "next/server";
import { appendNote, listNotes } from "@/lib/memoryLog";
import { publish } from "@/lib/eventBus";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const transcript = (body?.transcript ?? "").toString().trim();
  if (!transcript) {
    return Response.json({ error: "transcript required" }, { status: 400 });
  }

  const note = appendNote({
    transcript,
    guestId: body?.guestId,
    propertyId: body?.propertyId,
  });

  publish({ type: "note", note });

  return Response.json({ ok: true, note });
}

export async function GET() {
  return Response.json({ notes: listNotes(10) });
}
