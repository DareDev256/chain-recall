import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager Console · Sandy Chain-Recall",
  description: "Side-by-side member arrival trigger + staff tablet brief",
};

export default function ConsolePage() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#1a1a1a] text-stone-100">
      <header className="flex items-center justify-between border-b border-stone-800 bg-[#0d0d0d] px-6 py-3 text-sm">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-base tracking-wide text-stone-50">Sandy</span>
          <span className="text-stone-500">·</span>
          <span className="uppercase tracking-[0.18em] text-stone-400 text-[11px]">Manager Console</span>
        </div>
        <div className="hidden items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-stone-500 sm:flex">
          <span>Arrival ledger</span>
          <span className="text-stone-700">·</span>
          <span>Staff tablet</span>
          <span className="text-stone-700">·</span>
          <span>Two devices in deployment, one view here.</span>
        </div>
      </header>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
        <section className="relative border-stone-800 md:border-r">
          <div className="absolute left-3 top-3 z-10 rounded-sm bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur">
            /arrive · trigger
          </div>
          <iframe
            src="/arrive"
            title="Member arrival trigger"
            className="h-full w-full border-0 bg-[#f4ede1]"
          />
        </section>
        <section className="relative">
          <div className="absolute left-3 top-3 z-10 rounded-sm bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur">
            /staff · tablet
          </div>
          <iframe
            src="/staff"
            title="Staff tablet — institutional memory brief"
            className="h-full w-full border-0 bg-[#f4ede1]"
          />
        </section>
      </div>
    </div>
  );
}
