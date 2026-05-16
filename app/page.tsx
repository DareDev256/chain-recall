import Link from "next/link";
import { BRAND } from "./brand-tokens";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 py-24 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--color-ink-faint)] mb-10">
        {BRAND.chainName} · Member Properties
      </p>
      <h1 className="font-serif text-7xl md:text-8xl font-normal leading-[0.95] tracking-tight max-w-4xl">
        Recognition,<br />without asking.
      </h1>
      <p className="font-sans text-base md:text-lg text-[var(--color-ink-soft)] max-w-xl mt-10 leading-relaxed">
        {BRAND.subtitle} Staff arrive prepared. Guests are simply known.
      </p>
      <div className="mt-16 flex flex-col sm:flex-row gap-4 font-sans text-sm">
        <Link
          href="/staff"
          className="px-8 py-3 border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors"
        >
          Staff Tablet · LA
        </Link>
        <Link
          href="/arrive"
          className="px-8 py-3 border border-[var(--color-rule)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
        >
          Member Arrival
        </Link>
      </div>
      <p className="mt-24 font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-faint)]">
        {BRAND.cities.join(" · ")}
      </p>
    </main>
  );
}
