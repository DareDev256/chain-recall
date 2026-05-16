"use client";

import { useEffect, useState } from "react";

/**
 * Uber-style live ETA ticker for the arrival intel block.
 *
 * Demo behavior: when this component mounts (on brief arrival), it kicks off
 * a deterministic countdown — initial `totalMinutes` minutes, ticking down
 * one "minute" every `tickMs` of wall-clock time. So a 25-minute pseudo-trip
 * takes ~100 seconds of demo time at the default 4-second tick. Designed to
 * give judges a visible "this is live" moment during the 90-second pitch.
 *
 * Production swap-out: replace the deterministic ticker with a real
 * data source — FlightAware / AviationStack for flight tracking, Google
 * Maps Directions API for last-mile drive-time estimation, app-side
 * geolocation for opt-in member tracking. The visual shape is the same.
 */
export function LiveEta({
  totalMinutes = 25,
  tickMs = 4000,
  resetKey,
}: {
  totalMinutes?: number;
  tickMs?: number;
  resetKey?: string;
}) {
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60);

  useEffect(() => {
    setSecondsLeft(totalMinutes * 60);
  }, [totalMinutes, resetKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 60));
    }, tickMs);
    return () => clearInterval(interval);
  }, [tickMs, resetKey]);

  const minutesLeft = Math.ceil(secondsLeft / 60);
  const progress = Math.min(
    1,
    Math.max(0, 1 - secondsLeft / (totalMinutes * 60)),
  );

  let label: string;
  let status: string;
  if (minutesLeft <= 0) {
    label = "Arrived";
    status = "At the front gate";
  } else if (minutesLeft === 1) {
    label = "Arriving now";
    status = "Less than a minute out";
  } else if (minutesLeft <= 5) {
    label = `Arriving in ${minutesLeft} min`;
    status = "At the gate within minutes — bell concierge in position";
  } else if (minutesLeft <= 15) {
    label = `Arriving in ${minutesLeft} min`;
    status = "On final approach to property";
  } else {
    label = `Arriving in ${minutesLeft} min`;
    status = "In transit from SFO";
  }

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-3">
        <p className="font-serif text-2xl leading-tight">{label}</p>
        <span className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-emerald-700">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-[var(--color-rule)] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-px bg-[var(--color-accent)] transition-all duration-1000 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="font-sans text-[11px] text-[var(--color-ink-faint)] mt-2 italic">
        {status}
      </p>
    </div>
  );
}
