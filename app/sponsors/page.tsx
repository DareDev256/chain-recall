"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Stage = "video" | "endcard";

export default function SponsorsPage() {
  const [stage, setStage] = useState<Stage>("video");
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance to end-card a touch before the video actually ends, so the
  // wreath fade-in lands on a clean frame instead of the video's last frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnd = () => setStage("endcard");
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration - 0.15) setStage("endcard");
    };
    v.addEventListener("ended", onEnd);
    v.addEventListener("timeupdate", onTime);
    return () => {
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setStage("video");
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Back to / — always visible top-left */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 font-sans text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors"
      >
        ← Back to Sandy
      </Link>

      {/* Mute toggle — only during video stage */}
      {stage === "video" && (
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-50 font-sans text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors"
        >
          {muted ? "Unmute ◁" : "Mute ◀"}
        </button>
      )}

      {/* Stage 1 — sponsor video */}
      <section
        aria-hidden={stage !== "video"}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
          stage === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          className="h-full w-full object-contain"
          src="/sponsors/sponsor-intro.mp4"
        />
      </section>

      {/* Stage 2 — wreath end card */}
      <section
        aria-hidden={stage !== "endcard"}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1200ms] ease-out ${
          stage === "endcard" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <img
          src="/sponsors/wreath.svg"
          alt="Hospitality 2030 — Anthropic, Greycroft, Cerebral Valley"
          className="h-full w-full object-contain"
        />
        {/* Replay + back */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 font-sans text-[11px] uppercase tracking-[0.3em]">
          <button
            onClick={replay}
            className="text-stone-500 hover:text-stone-800 transition-colors border-b border-stone-300 hover:border-stone-800 pb-1"
          >
            ↻ Replay intro
          </button>
          <Link
            href="/"
            className="text-stone-500 hover:text-stone-800 transition-colors border-b border-stone-300 hover:border-stone-800 pb-1"
          >
            Back to Sandy ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
