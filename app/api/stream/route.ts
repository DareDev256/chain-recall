import { subscribe } from "@/lib/eventBus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      let heartbeat: ReturnType<typeof setInterval> | null = null;
      let unsubscribe: (() => void) | null = null;

      const teardown = () => {
        if (closed) return;
        closed = true;
        if (heartbeat) clearInterval(heartbeat);
        if (unsubscribe) unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed — fine
        }
      };

      const enqueue = (chunk: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          // controller went sideways — tear everything down
          teardown();
        }
      };

      const send = (data: unknown) => {
        enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      send({ type: "ready" });

      unsubscribe = subscribe((event) => {
        send(event);
      });

      heartbeat = setInterval(() => {
        enqueue(`: heartbeat\n\n`);
      }, 15000);
    },
    cancel() {
      // EventSource closed — Next.js calls this on disconnect
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
