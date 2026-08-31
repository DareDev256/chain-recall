# Tech Stack Guide — Sandy Chain-Recall

A walkthrough of every framework, runtime, language, and library in the build — what it is, why we chose it, what it does for us, and what we'd say if a judge asks. Designed for explaining on stage.

---

## At a glance

| Layer | What we use | Production equivalent |
|---|---|---|
| **Language** | TypeScript 5 | Same |
| **Runtime** | Node.js 20+ (server) + modern browser (client) | Same |
| **Framework** | Next.js 16 (App Router) | Same |
| **UI library** | React 19 | Same |
| **Styling** | Tailwind CSS 4 | Same |
| **Bundler** | Turbopack (Next.js native) | Same |
| **Package manager** | pnpm 10 | Same |
| **AI model** | `claude-opus-4-7` via Anthropic SDK with tool use | Same |
| **Live push** | Server-Sent Events (SSE) | Redis pub/sub behind LB |
| **Event bus** | In-memory module singleton | Redis pub/sub |
| **PMS source** | Mock OPERA adapter at `lib/sources/opera.ts` | Hapi → OPERA OHIP REST API |
| **Memory store** | In-memory seed corpus (`lib/data.ts`) | Postgres + pgvector |
| **Audio out (earpiece)** | ElevenLabs TTS API (+ browser SpeechSynthesis fallback) | Same, with WebRTC for live floor staff |
| **Audio in (voice notes)** | Web Speech API (browser native STT) | ElevenLabs Conversational AI |
| **Fonts** | Cormorant Garamond + Inter via next/font/google | Same |
| **Deployment** | Local dev today; Vercel ready | Vercel / AWS ECS / GCP Cloud Run |

---

## Languages

### TypeScript 5
**What:** Statically-typed superset of JavaScript. Catches type mismatches at compile time.

**Why:** The Brief contract has 10 fields with nested types (arrivalIntel, suggestedQuestions, etc.). TypeScript means the composer, the cache, the staff UI, and the API routes all agree on the shape. Refactors don't break silently.

**Stage line:** "End-to-end type safety from the Claude tool-use response down to the React render. If we add a field to the Brief schema, the compiler tells us every file we need to update."

### JavaScript (in the browser)
**What:** Native browser environment for client-side code.
**Why:** No special framework runtime — the React app compiles down to plain JS for the client.

---

## Runtime

### Node.js 20+
**What:** Server-side JavaScript runtime. Runs the Next.js server, the API routes, the Claude API calls.

**Why:** Default Next.js runtime. We explicitly opt into Node.js (not Edge) on the API routes because:
- The Anthropic SDK uses streaming HTTP requests that work better in Node
- ElevenLabs returns binary audio that we forward through our route
- Our in-memory event bus needs a long-lived module instance (Edge runtime instances die per-request)

You'll see `export const runtime = "nodejs";` at the top of each API route — that's the explicit opt-in.

### Browser (modern Chromium / WebKit)
**What:** Client-side runtime — Chrome, Edge, Safari.
**Why:** Three browser APIs do real work in this build:
- **`EventSource`** — consumes Server-Sent Events (the live tablet wake)
- **`Web Audio API`** — generates the chime tone in-code (no audio file needed)
- **`Web Speech API`** (`SpeechRecognition` + `SpeechSynthesis`) — Voice Note input + earpiece fallback

**Stage line:** "We get speech-to-text for free in the browser. No external STT service, no audio upload, no latency. Chrome and Safari support it natively."

---

## Framework: Next.js 16 (App Router)

**What:** Full-stack React framework. Handles routing, server rendering, API routes, and the build pipeline.

**Why this version specifically:**
- **App Router** (the `app/` directory) for server components by default + colocated layouts
- **Built-in API routes** (`app/api/*/route.ts`) — no separate Express server
- **Streaming-friendly** — our SSE endpoint streams directly from a `ReadableStream`
- **Turbopack** by default — Rust-based bundler, much faster than Webpack
- **First-class TypeScript** — zero config

**What it gives us:**
- A single `pnpm dev` starts the server, the client, and the build pipeline together
- Hot module replacement keeps the dev server fast during the build
- `next/font/google` self-hosts Cormorant Garamond + Inter so we don't ship third-party CDN requests in production

**Stage line:** "Next.js 16 with the App Router. One project, one command, one deployment unit — the staff tablet UI, the API routes, the SSE stream, and the production build all run together."

---

## UI: React 19 + Tailwind 4

### React 19
**What:** UI library — declarative components, hooks, state.
**Why:** React 19 ships with improved server components, better Suspense, and works natively with Next.js 16. The staff tablet has live state (`brief`, `computing`, `context`, `recentNote`, `listening`) that React's hooks model handles cleanly.

### Tailwind CSS 4
**What:** Utility-first CSS framework. We compose styles inline via class names.
**Why:** Zero context-switching between TSX and CSS files. The quiet-luxury aesthetic is enforced via a tight set of design tokens in `app/globals.css` (`--color-cream`, `--color-ink`, `--color-accent`) referenced everywhere. Tailwind 4 supports CSS variables natively.

**Stage line:** "Tailwind 4 with seven design tokens — cream, ink, ink-soft, ink-faint, rule, accent, cream-tint. The whole product runs on those. No second accent color anywhere."

---

## AI layer: Anthropic SDK with tool use

### The model
**`claude-opus-4-7`** — Anthropic's flagship reasoning model.

### The pattern: tool use, not JSON mode
We could have asked Claude to read the entire guest profile inline and return JSON. We didn't. Instead, the composer gives Claude a **tool** (`get_guest_history`) and lets Claude *decide* when to call it.

```ts
let response = await client.messages.create({
  model: "claude-opus-4-7",
  tools: [GUEST_HISTORY_TOOL],
  messages: [{ role: "user", content: initialUserMessage }],
});

while (response.stop_reason === "tool_use") {
  // Claude requested a tool — we run it, append the result, ask again
  const guest = await fetchGuestRecord(toolUse.input.guest_id);
  // ... add to message history, call model again
}
```

**Why this matters:**
- The architecture matches production: in v2, `get_guest_history` doesn't return mock data — it queries OPERA via Hapi
- The tool surface is the **integration boundary** between the AI and the chain's enterprise systems
- If we add more tools later (`book_amenity`, `check_room_availability`, `get_flight_status`), Claude orchestrates them autonomously

**Stage line:** "Claude calls `get_guest_history` as a tool. In production that tool reads from Oracle OPERA via Hapi. The model doesn't change — only the tool implementation changes — when we go from demo to live deployment."

### Other Anthropic SDK details
- `max_tokens: 2500` — enough for a full Brief without truncation
- `voice_settings: stability 0.55, similarity_boost 0.75` (on the ElevenLabs side)
- 6-second hard timeout on the Anthropic call — if exceeded, silent fallback to the cached brief

---

## Live tablet wake: Server-Sent Events (SSE)

**What:** A one-way streaming HTTP protocol where the server pushes events to a long-lived browser connection.

**Why SSE and not WebSockets:**
- The staff tablet only *receives* events; it doesn't need full duplex
- SSE is plain HTTP — no special infrastructure, no upgrade handshake
- Browsers reconnect automatically if the connection drops
- Easier to debug (browser DevTools network tab shows the stream)

**Why SSE and not polling:**
- Polling at 1-second intervals burns 60 needless requests/minute when nothing is happening
- The "tablet lights up the instant the guest walks in" moment requires push, not pull

### How it works in our code

```
QR scan
  → POST /api/arrive
  → publish 'computing' event on lib/eventBus.ts
  → run compose() (Claude + OPERA adapter)
  → publish 'brief' event on lib/eventBus.ts

Meanwhile:
GET /api/stream  (held open by the staff page's EventSource)
  → subscribes to the bus
  → forwards every event to the connected client
  → staff page updates UI on each event
```

**Stage line:** "Server-Sent Events stream from the API route to the browser. The tablet doesn't poll — the server pushes the moment the guest walks in. Same protocol nytimes.com uses for live election dashboards."

### Production swap-out
The in-memory event bus (`lib/eventBus.ts`) is a single-process singleton — fine for hackathon, but won't survive a load balancer. Production: replace `publish` and `subscribe` with Redis pub/sub. SSE stream stays exactly the same.

---

## Audio out: ElevenLabs TTS

**What:** AI voice synthesis. Generates studio-quality speech from text.

**Why ElevenLabs and not OpenAI TTS / browser SpeechSynthesis:**
- **Voice cloning.** James has his own custom voice (`6F6qTD1GSCwVWEzc8mhM`) — we can stamp the demo with a recognizable Sandy voice
- **Quality.** Default voice "George" sounds like a real British butler. Browser TTS sounds robotic
- **Latency.** ElevenLabs Turbo v2.5 model returns audio in ~500ms for a 15-second clip

### How it works
`POST /api/whisper { guestId, propertyId }` → server composes a short script via `lib/whisper.ts` → server calls ElevenLabs → server returns the mpeg audio → browser plays it.

If `ELEVENLABS_API_KEY` is absent, the route returns JSON `{ script }` and the browser uses native `SpeechSynthesis` instead. **The feature works either way** — no demo failure if the API key is missing.

**Stage line:** "ElevenLabs Turbo v2.5 for the earpiece whisper. Browser TTS as the silent failsafe. The receptionist hears the brief in butler-grade voice in roughly half a second."

---

## Audio in: Web Speech API (browser-native STT)

**What:** Browser-native speech-to-text. Chrome and Safari ship with it built in.

**Why this and not ElevenLabs STT / OpenAI Whisper:**
- **Zero latency overhead** — runs in the browser, no audio upload
- **Free** — no API calls
- **Privacy-friendly** — transcripts never leave the device until they're submitted

### How it works
Staff clicks "Voice Note" → `SpeechRecognition` starts listening → on each speech chunk, we accumulate final transcripts → on stop, `POST /api/memory-note { transcript }` → server appends to `lib/memoryLog.ts` → SSE broadcasts a `note` event → all open staff tablets flash "Noted by staff: '…'"

**Stage line:** "Browser-native speech recognition for staff dictation. The transcript is local until the staff member submits it. In production we'd swap this for ElevenLabs Conversational AI so Sandy can respond — confirm, ask for clarification, push the note through the memory pipeline."

---

## Data layer

### Today: in-memory seed corpus
`lib/data.ts` — five guests, three properties, hand-tuned visit history with `amenitiesUsed` observations per visit. About 350 lines of structured TypeScript.

### Wifi parachute: cached briefs
`lib/cache.ts` — pre-composed Brief objects for all 4 demo guests at Sand Hill. If Claude is slow or absent, the composer falls back to the cache silently. The judge cannot tell the difference.

### Production: Postgres + pgvector + Hapi
The composer reads from `lib/sources/opera.ts` (our adapter). In production, the adapter implementation changes:
- Real guest history comes from Hapi's OPERA event stream → Postgres event journal
- Vector embeddings on guest preferences for fuzzy matching ("guests who like X also tend to prefer Y")
- The composer signature does not change

**Stage line:** "Today the composer reads a 4-guest seed corpus. In production it reads from Postgres, populated by Hapi streaming Oracle OPERA events. We've built the integration boundary today; the data layer swap is days of work, not weeks."

---

## Styling philosophy: quiet luxury

**Reference frame:** Rosewood, Aman, Soho House, NeueHouse, The Carlyle.

**Rules:**
- Cream background `#faf7f2` (not white)
- Headings: Cormorant Garamond serif
- Body: Inter
- 10pt uppercase tracking-[0.3em] eyebrow labels everywhere
- One bronze accent `#6b5b3e` — no other colors
- No gradients, no shadows, no rounded-XL, no emoji
- Negative space IS the design

**Why:** Luxury hospitality buyers recognize this code instantly. They see "this team understands the customer" before reading a word. The opposite would be flat-design dashboards with primary blue — that signals SaaS, not Soho House.

---

## What we're NOT using (and why we're not using it)

| Tool | Why not |
|---|---|
| **Express / Fastify** | Next.js API routes handle this. No second server. |
| **WebSockets / Socket.io** | SSE covers our one-way push need. WebSockets add complexity we don't need yet. |
| **Redis** | In-memory bus works for single-process demo. Redis is the production swap. |
| **Postgres** | Same — seed corpus today, Postgres + pgvector in v2. |
| **A custom MCP server** | The composer is already wired via the Anthropic SDK. An MCP wrapper adds an abstraction that doesn't change what's visible. Pitch slide, not build. |
| **shadcn/ui or any component library** | The whole UI is 7 design tokens and the cream-on-cream aesthetic. Bringing in a component library would force us out of the visual identity. |
| **A state management library (Redux, Zustand)** | Two React `useState` calls handle the staff page state. Zero ceremony. |
| **A vector DB (Pinecone, Qdrant)** | Today: pattern matching against 4 guests. Vector retrieval is a v2 concern when the corpus is in the millions. |

---

## Deployment posture

### Today
`pnpm dev` on a local laptop. Single-process, in-memory state.

### Tomorrow (post-hackathon, 1-day deploy)
`vercel deploy` — Next.js is Vercel-native. The SSE route runs on Vercel's Node.js runtime. Anthropic + ElevenLabs API keys via Vercel env vars. Zero code changes.

### Production v1 (4-6 weeks)
- Vercel for the app layer (or AWS ECS / GCP Cloud Run if the chain wants on-prem)
- Redis Cloud (or AWS ElastiCache) for the event bus
- Supabase or AWS RDS for Postgres + pgvector
- Hapi as the OPERA integration layer (their existing customer relationship with Rosewood is the wedge)
- SOC 2 Type II target month 6
- Data residency per property (EU stays don't leave EU)

---

## Stage-ready answers

**Q: What's your stack?**
> "Next.js 16 with the App Router, TypeScript end-to-end, Claude Opus 4.7 with tool use as the composer, Server-Sent Events for the live tablet wake, ElevenLabs for the audio earpiece, and Tailwind 4 for the quiet-luxury aesthetic. The integration boundary is a mock Oracle OPERA adapter — in production that's a Hapi-streamed OHIP client and nothing downstream changes."

**Q: Why tool use instead of just prompting the model with the guest profile?**
> "Because the tool surface IS the integration boundary. When Claude calls `get_guest_history`, today that hits our seed corpus. In production it hits OPERA via Hapi. The model doesn't know — and doesn't need to know — which one. Same logic for future tools: `book_amenity`, `check_room_availability`, `get_flight_status`."

**Q: How does this scale to 38 properties?**
> "The composer is stateless. The data layer swap is in-memory → Postgres + pgvector. The event bus swap is in-memory → Redis pub/sub. Both are days of work. The UI, the prompt, the brief schema — none of that changes."

**Q: How do you handle privacy?**
> "Audit log on every brief read, opt-in only on first stay, per-property opt-out, GDPR right-to-delete portal. SOC 2 Type II is a month-6 target. The brief schema explicitly carries a `discretionFlags` field — the system understands 'do not say' as a first-class concept, not an afterthought."

**Q: What happens if your AI hallucinates a fact about a guest?**
> "It can't — the system prompt forbids it. The composer only outputs facts the tool returned. Every line of the brief carries a `sourcedFrom` attribution. If the cache fallback fires (because the API is slow), it's hand-tuned content. We never put unverifiable facts in front of staff."

**Q: Is Rosewood a partner?**
> "Honest answer: no, not yet. They're our target deployment. Sonia Cheng is publicly using the language we'd ship to — 'predictive analytics, knows you before you ask, relationship hospitality.' They're a named Hapi customer, which is the integration path. We built the AI layer that makes their existing investment pay off at the moment of arrival."
