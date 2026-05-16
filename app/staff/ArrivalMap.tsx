"use client";

import { useEffect, useState } from "react";

/**
 * Uber-style arrival map for the staff tablet. Renders a stylized SVG route
 * from the airport to the property with a plane icon that moves along the
 * path as the LiveEta countdown ticks down.
 *
 * Demo behavior: deterministic — progress is driven by the same total/tick
 * params as LiveEta, so the icon walks across the route in sync with the
 * "Arriving in X min" countdown.
 *
 * Production swap-out: replace `progress` driver with real flight-tracker
 * (FlightAware / OpenSky for in-air) + Google Maps Directions ETA for the
 * last-mile drive. The SVG shape becomes a real geocoded path.
 */
export function ArrivalMap({
  totalMinutes = 25,
  tickMs = 4000,
  resetKey,
  origin = "SFO",
  destination = "Sand Hill",
}: {
  totalMinutes?: number;
  tickMs?: number;
  resetKey?: string;
  origin?: string;
  destination?: string;
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

  const progress = Math.min(
    1,
    Math.max(0, 1 - secondsLeft / (totalMinutes * 60)),
  );

  // path coordinates — stylized route, not real geography. Width 600 x height 120.
  // Quadratic curve from (40, 70) through control (300, 30) to (560, 90).
  const start = { x: 40, y: 70 };
  const control = { x: 300, y: 30 };
  const end = { x: 560, y: 90 };

  // quadratic bezier point at t
  const t = progress;
  const px = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * control.x + t * t * end.x;
  const py = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * control.y + t * t * end.y;

  // tangent for icon rotation
  const dx = 2 * (1 - t) * (control.x - start.x) + 2 * t * (end.x - control.x);
  const dy = 2 * (1 - t) * (control.y - start.y) + 2 * t * (end.y - control.y);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div className="mt-2 mb-5">
      <svg
        viewBox="0 0 600 120"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* base route, dashed */}
        <path
          d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
          fill="none"
          stroke="var(--color-rule)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        {/* traveled portion, solid bronze */}
        <path
          d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeDasharray={`${progress * 700} 1000`}
          style={{ transition: "stroke-dasharray 1s ease-out" }}
        />

        {/* origin marker */}
        <circle
          cx={start.x}
          cy={start.y}
          r="5"
          fill="var(--color-cream)"
          stroke="var(--color-ink)"
          strokeWidth="1.25"
        />
        <text
          x={start.x}
          y={start.y + 22}
          fontFamily="var(--font-sans), sans-serif"
          fontSize="9"
          fill="var(--color-ink-faint)"
          textAnchor="middle"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          {origin}
        </text>

        {/* destination marker */}
        <circle
          cx={end.x}
          cy={end.y}
          r="5"
          fill={progress >= 1 ? "var(--color-accent)" : "var(--color-cream)"}
          stroke="var(--color-ink)"
          strokeWidth="1.25"
        />
        <text
          x={end.x}
          y={end.y + 22}
          fontFamily="var(--font-sans), sans-serif"
          fontSize="9"
          fill="var(--color-ink-faint)"
          textAnchor="middle"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          {destination}
        </text>

        {/* moving plane icon — only show while in transit */}
        {progress < 1 && (
          <g
            transform={`translate(${px} ${py}) rotate(${angle})`}
            style={{ transition: "transform 1s ease-out" }}
          >
            {/* simple plane silhouette */}
            <path
              d="M -8 0 L 6 -3 L 10 0 L 6 3 L -8 0 Z M -2 0 L -6 -5 L -8 -5 L -4 0 L -8 5 L -6 5 L -2 0"
              fill="var(--color-ink)"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
