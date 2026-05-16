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
          <span className="uppercase tracking-[0.18em] text-stone-400 text-[11px]">
            Manager Console · for judges + demos
          </span>
        </div>
        <div className="hidden items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-stone-500 sm:flex">
          <span>Two devices in deployment · one view here</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800 px-px pt-px">
        <div className="bg-[#0d0d0d] px-5 py-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4a96a]">
            Left · Member side
          </p>
          <p className="font-serif text-base text-stone-100 mt-1 leading-snug">
            What the guest does on the way to the property.
          </p>
          <p className="text-[11px] text-stone-400 mt-1 leading-snug italic">
            Production: BLE beacon at entry, license-plate recognition at valet, app geofence, or QR scan. Demo: tap a guest&rsquo;s name.
          </p>
        </div>
        <div className="bg-[#0d0d0d] px-5 py-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c4a96a]">
            Right · Staff side
          </p>
          <p className="font-serif text-base text-stone-100 mt-1 leading-snug">
            What front-of-house sees the instant a member arrives.
          </p>
          <p className="text-[11px] text-stone-400 mt-1 leading-snug italic">
            Composed live by Claude Opus 4.7 from the member&rsquo;s cross-property history (via Oracle OPERA + Hapi in production; mocked here).
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-px bg-stone-800 px-px pb-px overflow-hidden">
        <section className="relative bg-[#faf7f2]">
          <iframe
            src="/arrive"
            title="Member arrival trigger"
            className="h-full w-full border-0"
          />
        </section>
        <section className="relative bg-[#faf7f2]">
          <iframe
            src="/staff"
            title="Staff tablet — institutional memory brief"
            className="h-full w-full border-0"
          />
        </section>
      </div>

      <footer className="border-t border-stone-800 bg-[#0d0d0d] px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center justify-between">
        <span>SSE bus connects the two surfaces in real time · Brief composed in &lt;6s · Cache fallback if Anthropic is slow</span>
        <span>github.com/DareDev256/chain-recall</span>
      </footer>
    </div>
  );
}
