# End-to-End Test Checklist

Run this before the camera turns on. Every checkbox = a moment that should work in the demo. If anything fails, fix or remove from the SHOTLIST script.

**Browser:** Safari or Chrome Guest Profile (NO wallet extensions — they break the page with the `ethereum redefine` error).

**Dev server:** `pnpm dev` running. Hard-refresh tabs before each test pass.

---

## ✓ Phase 0–2: Landing page (`/`)

- [ ] **Phase 0** — Rosewood RW monogram fades in on cream background. "Rosewood Hotels & Resorts" eyebrow under it.
- [ ] **Phase 1** — At ~2.2s, transitions to "I am" → "Sandy." in serif → bronze rule → "The institutional memory of Rosewood." → "Step inside ↗" button.
- [ ] **Sandy narrates** — If you've clicked anywhere on the page first (audio prime), Sandy's voice plays the line during Phase 1.
- [ ] **🔊 Sandy speaks / 🔇 Sandy muted** toggle (top-right) — clicking it flips the state and persists to localStorage. Refresh the page — state remembered.
- [ ] **Phase 2** — At ~8.8s OR after clicking "Step inside" — transitions to the interior: Sandy logo + "Recognition, without asking." + three property plates + 3 CTAs (Manager Console primary, Staff Tablet, Member Arrival).
- [ ] **Triptych hover** — Each plate's border turns bronze + soft shadow on hover.
- [ ] **Manager Console** is the primary (filled-ink) button. Hover → bronze.

## ✓ Member Arrival (`/arrive`)

- [ ] Eyebrow reads "Demo Trigger · Presenter Surface" in bronze.
- [ ] Header text explains: "This page is for the demo presenter — a real member never sees this view."
- [ ] Property switcher shows 3 chips: Sand Hill (selected), Hong Kong, London.
- [ ] All **5 guests** visible in cards: Mei Lin Chen, Marcus Okafor, Priya Sharma, Daniel Edson, Elena Vasquez.
- [ ] Clicking a guest shows "Notifying front of house…" temporarily.
- [ ] Selecting Hong Kong property + clicking a guest triggers an arrival at HK (only an HK staff tablet would render it).

## ✓ Staff Tablet (`/staff`)

### Idle state
- [ ] Header: "Rosewood Sand Hill · Front of House" + "Menlo Park · Sand Hill Road" h1
- [ ] Sub-header: "Demo · 3 of 38 Rosewood properties · 23 countries · 21+ in pipeline" (italic, 9pt)
- [ ] Property switcher chips: Sand Hill (underlined bronze), Hong Kong, London
- [ ] Top-right header buttons: **Voice Note**, **🔊 Sound** (or 🔇 Muted), **Listening** indicator (green dot if SSE connected)
- [ ] Empty state: "All quiet." italic serif + "No members arriving at Sand Hill."

### Trigger Mei Lin Chen → fire the cross-property classic
- [ ] Skeleton fires: "Reading institutional memory…" + "Composing passbook from cross-property history"
- [ ] Brief lands with **chime** (requires one prior click on /staff to prime audio)
- [ ] **Pulse**: bronze "Member arriving · just now" eyebrow flashes
- [ ] **Guest name** ("Mei Lin Chen") in huge serif
- [ ] **visitContext**: "Member since 2024. First-ever visit to Rosewood Sand Hill. Regular at Rosewood Hong Kong (2 stays), London once (Jan 2026)."
- [ ] **Member snapshot** line in 10pt uppercase: "Member since 2024 · 3 stays · 2 properties · Rosewood Elite · Tier I"
- [ ] Prep actions render (4 items, serif, with bronze rule prefix)
- [ ] **In the room before arrival** (3 items, each with sourcedFrom + loggedBy provenance below)
- [ ] **Ask the guest** (3 verbatim questions in italic, including the Hong Kong Museum → Cantor Arts Center pivot)
- [ ] **If they have time** (2 local suggestions: Filoli Estate + Cantor Arts Center)
- [ ] **Patterns observed across stays** — 4 patterns with bronze frequency badges (e.g., "3 of 3 stays · all 3 properties")
- [ ] **Past resolutions** — 1 entry: Aug 2025 lavender sachet mishap + resolution + emerald "prevented" badge
- [ ] **Do not say** — discretion flag about Emma
- [ ] **Context** — emotional notes about Emma's birthday
- [ ] **Sourced from** — 3 prior visits
- [ ] **Cost line** at bottom: "Brief composed · Claude Opus 4.7 · ~$0.13 · Whisper · ~$0.105 / play · Voice Note ack · ~$0.045 · See COSTS.md"

### Trigger Daniel Edson → fire the operational showpiece
- [ ] All above sections render
- [ ] **Arrival intel block** appears at top (cream-tint background, bronze accent)
- [ ] **ArrivalMap** SVG — dashed route from SFO → Sand Hill, plane icon midway, route fills in bronze as countdown ticks
- [ ] **LiveEta** below the map — "Arriving in 25 min" → ticks down every ~4 seconds → "Arriving in 24 min" → etc.
- [ ] Live indicator (emerald pulse) on LiveEta
- [ ] **Expected at** text: "ETA 15:50 today (Sat 16 May) — bell concierge holding at the portico"
- [ ] **Flight context** + **Baggage** + **Energy state** lines
- [ ] **Patterns** include "Manhattan up, twist (no orange)" and "French press + Israeli black blend"
- [ ] **Past resolutions** — 1 entry: French press mishap resolution

### Trigger Elena Vasquez → fire the privacy closer
- [ ] **Privacy banner** at top: bronze left rule + cream-tint background + "Sandy did not retrieve this member's history. Treat this as a first conversation — the relationship earns the data, on her timeline."
- [ ] **privacyNote**: "Member exercised cross-property data opt-out via guest portal on 01 Mar 2026 (GDPR Art. 17 / CCPA §1798.105)."
- [ ] Most sections empty (no amenityReplenishment, no localSuggestions, no recurringPatterns)
- [ ] **Discretion flags** present — 3 items about not referencing prior stays
- [ ] **One suggested question**: "Welcome to Rosewood Sand Hill, Ms. Vasquez. Is there anything you'd like us to know about this stay?"

## ✓ Whisper button (earpiece)

- [ ] Visible in staff header AFTER a brief has loaded
- [ ] Click → audio plays in your Sandy voice (~10-15s)
- [ ] **Subtitle banner** appears at bottom-center: black bg, cream text, bronze accent rule, contains the same script
- [ ] Banner auto-dismisses after ~18s OR can be closed with ×
- [ ] Toggle to **🔇 Muted** mode → click Whisper again → audio is skipped, subtitle ONLY
- [ ] Whisper button label flips to "Whisper · subtitled" when muted

## ✓ Voice Note + staff notes log

- [ ] Click **Voice Note** in header (works only in Chrome / Safari, NOT Firefox)
- [ ] Button flips to "Listening…" (emerald pulse)
- [ ] Speak a sentence ("Mr. Edson mentioned he'd like to extend his stay")
- [ ] Click **Listening…** again to stop
- [ ] **"Added to passbook"** banner flashes for ~6.5s with the captured transcript
- [ ] **Sandy speaks back** an acknowledgment ("Noted. 'transcript'. Added to Edson's passbook.") via the synth API
- [ ] **"Staff notes this session · 1"** section appears below the brief with the transcript + timestamp + production-path note
- [ ] Multiple notes stack — count increments, last 5 shown

## ✓ Property switcher

- [ ] Click **Hong Kong** in the staff header chips
- [ ] Header eyebrow changes to "Rosewood Hong Kong · Front of House"
- [ ] h1 changes to "Tsim Sha Tsui · Victoria Harbour"
- [ ] URL gains `?property=hong-kong` (without reload)
- [ ] Brief state clears (empty "All quiet.")
- [ ] Trigger a guest WITH property=hong-kong from `/arrive` — only the Hong Kong tablet receives it
- [ ] Switch back to Sand Hill → original brief restored from sessionStorage (if it was on Sand Hill)

## ✓ Reset

- [ ] Visible in staff header when a brief is loaded
- [ ] Click → brief clears, "All quiet." returns
- [ ] sessionStorage cleared — refreshing won't restore

## ✓ Manager Console (`/console`)

- [ ] Dark chrome header: "Sandy · Manager Console · for judges + demos"
- [ ] Two caption strips below: LEFT side ("Member Arrival Trigger") + RIGHT side ("Staff Tablet")
- [ ] Two iframes side-by-side: `/arrive` (left) + `/staff` (right)
- [ ] Click a guest in the left iframe — right iframe lights up with the brief (SSE forwarded)
- [ ] Footer: "SSE bus connects the two surfaces in real time · Brief composed in <6s · Cache fallback if Anthropic is slow"

## ✓ Cross-tab behavior

- [ ] Open `/staff` in two tabs (one might be `/staff?property=hong-kong`)
- [ ] Trigger a Sand Hill arrival from `/arrive` — only the Sand Hill tab lights up; HK tab stays "All quiet."
- [ ] Trigger an HK arrival — only the HK tab lights up

## ✓ Navigation persistence

- [ ] On `/staff` with a brief loaded, navigate to `/arrive` and back to `/staff`
- [ ] Brief is restored from sessionStorage (no flicker, instant)
- [ ] Member snapshot, all sections, present

## ✓ Connection states

- [ ] Top-right connection indicator: green dot + "Listening" = SSE healthy
- [ ] Disconnect wifi briefly — indicator flips to gray + "Disconnected"
- [ ] Reconnect — flips back to green within 5-10s (EventSource auto-reconnect)

---

## What to watch out for in the demo room

| Risk | Mitigation |
|---|---|
| **Wallet extension breaks the page** | Use Safari or Chrome Guest Profile. NO extensions. |
| **Service worker cached old broken stream** | Hard-refresh (Cmd+Shift+R). DevTools → Application → Service Workers → Unregister. |
| **Chime doesn't play on first brief** | Click somewhere on `/staff` before starting the demo to prime audio context. |
| **Whisper audio fails** | Falls back to browser TTS silently. Or skip the Whisper beat. |
| **Voice Note doesn't transcribe** | Skip that beat. Web Speech API isn't 100% reliable. |
| **Anthropic API slow / down** | Cache fallback fires silently after 6s. Demo looks identical. |
| **Wifi dies** | Tether off your phone. Cache covers all 5 demo guests. |
| **Two dev servers conflicting on port 3000** | `lsof -ti:3000 | xargs kill -9` then `pnpm dev`. |
| **Stage 1 narration fails to play** | Page didn't get a click before Sandy phase. Click anywhere first to prime. |
| **TypeScript / build crash** | `pnpm build` shouldn't crash — 10 routes all compile. If it does, paste error here. |
| **localStorage / sessionStorage disabled (incognito blocks some)** | Brief persistence + intro mute toggle won't survive page close. Demo still works for the 90-sec window. |

---

## Final pre-recording checklist

- [ ] Dev server running (`pnpm dev` shows "Ready in ~1.5s")
- [ ] `.env.local` has ANTHROPIC_API_KEY + ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID (Sandy)
- [ ] Browser: Safari (no extensions) OR Chrome Guest Profile
- [ ] `/staff` tab open + clicked once (audio primed)
- [ ] `/arrive` tab open
- [ ] `/console` tab open if you're demoing the split view
- [ ] Test one full arrival (Mei Lin) end-to-end before recording starts
- [ ] Sound on, volume audible
- [ ] Phone tethered as wifi backup
- [ ] SHOTLIST.md script open on a phone or second monitor
- [ ] QA-PREP.md / JUDGE-PREP.md skimmed for any anticipated questions

You're ready.
