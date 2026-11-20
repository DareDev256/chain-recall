# Chain-Recall on Cloudflare Workers (since 2026-11-19)

Live: https://chain-recall.mini-outage-watch.workers.dev (Worker `chain-recall`, OpenNext).
Moved off Vercel when the Hobby team was paused for CPU use. Deploy: `pnpm cf:deploy`.
Secrets (`wrangler secret put`): ANTHROPIC_API_KEY (~/.secrets/anthropic-key), ELEVENLABS_API_KEY
(~/.secrets/elevenlabs). The ElevenLabs voice and model ids on Vercel could not be read back
(encrypted), so the code defaults apply (George, eleven_turbo_v2_5).

Spend controls, added on the move (there were none before; /api/synth was an open TTS door):
- `lib/shared-gate.ts`: Workers KV namespace SPEND_GATE_CHAIN, in front of /api/arrive,
  /api/whisper and /api/synth: 10 calls per client IP per UTC hour, 100 per UTC day overall
  (env SG_PER_IP_HOUR / SG_DAILY_MAX), keyed on cf-connecting-ip. Proven 2026-11-19: 429 after
  the 10th call from one IP.
- /api/synth refuses text over 600 characters (413).
- Backstop: the Anthropic and ElevenLabs account limits.

Known, unchanged from Vercel: lib/eventBus.ts is in-memory, so /api/stream only sees events
published on the same isolate; compose() gives Claude 6 s, then falls back to the cached brief
(the demo guest and property pairs), otherwise 500.
