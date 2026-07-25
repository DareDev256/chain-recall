# Sandy Chain-Recall — Demo Video Shot List

For Josh (presenter, on camera) and James (driving the laptop, off camera).

**Target length:** 90–120 seconds. Don't go longer — judges have rubrics, not patience.
**Recording location:** A quiet corner. Phone or laptop camera on a stable surface. Single fixed shot of Josh + the laptop screen, OR two windows side by side (Josh in webcam + screen capture).

---

## Pre-roll setup (do this before hitting record)

1. **Two browser windows side by side.**
   - LEFT: `localhost:3000/staff` (the tablet, fullscreen-feeling)
   - RIGHT: `localhost:3000/arrive` (the QR target / member trigger)
2. **Dev server running** (`pnpm dev`). Confirm `Listening` indicator on `/staff` is green.
3. **First click anywhere on `/staff`** — this primes the audio chime. Without this click, the chime won't play on the first brief.
4. **Reset** any pre-existing brief on `/staff`. Should read "All quiet."
5. **Volume up** on the laptop — the chime and the whisper need to be audible to the camera.
6. **Lighting check.** Cream background reads better on warm light. No harsh overheads.

---

## Scene-by-scene

### Scene 1 — Setup (0:00–0:15)

**Josh (on camera, conversational):**
> "Rosewood Hotels. 38 properties, 23 countries, all running Oracle OPERA — the standard luxury hospitality system. Today their front desk captures every guest preference at check-in. They just don't use that data when the guest walks into a property they've never been to. That's what we built."

**On screen:** `/staff` showing "All quiet."

---

### Scene 2 — Mei Lin's arrival (0:15–0:50)

**Josh:**
> "Mei Lin Chen is a Rosewood member. She's stayed at Hong Kong twice — chamomile every night, room at 19, lavender gives her a headache. She visited London once in January and the team there had a kettle in her room at 11pm before she asked. She wrote a thank-you note to the GM."

**Action:** James clicks "Mei Lin Chen" on `/arrive`.

**On screen:** `/staff` shows "Reading institutional memory…" for a beat. Then the brief lands with the chime. Pulse animation fires.

**Josh, reading from the screen, SLOWLY, line by line:**
> "Chamomile and kettle, bedside, before arrival. Sourced from Rosewood London, January. Lavender-free turndown — confirmed allergy from Hong Kong. The Year of Magical Thinking on the bedside, because she borrowed The White Album from the Manor Club library."

**Josh, then pausing, voice down:**
> "And the question the system gives the receptionist:" — *(read in italics)* — "'Is Emma joining you on this trip, or is she home in Hong Kong?' Emma is her 8-year-old daughter. Her birthday is in six days. Mei Lin saw none of this. She just saw a person who knew her."

---

### Scene 3 — Reset, then Edson (0:50–1:30)

**Josh:**
> "Now watch the operational layer."

**Action:** James clicks "Reset" on `/staff`. Then clicks "Daniel Edson" on `/arrive`.

**On screen:** Skeleton. Then the brief lands — the arrival intel block is at the top.

**Josh:**
> "Mr. Edson just landed at SFO. EL AL from Tel Aviv via London Heathrow. Seven-hour flight plus the connection, two checked bags, ETA twenty minutes. The bell concierge is already at the portico. Light vegetarian dinner is pre-stocked in his villa — no meat, fish acceptable. Blackout shades drawn. And —"

**Josh, voice quieter, gesturing at the "Do not say" block:**
> "The system knows not to greet him by name. It knows his wife Rachel is only mentioned in family stays, not business trips. The discretion is part of the brief."

---

### Scene 4 — The earpiece (1:30–1:45)

**Action:** James clicks the "Whisper" button in the staff page header. The audio plays — about 10 seconds of butler-timbre voice reading the headline brief.

**Josh, after the audio finishes:**
> "That's the earpiece. The receptionist sees the tablet. The bell captain hears the whisper. The guest sees neither. The AI is invisible. The recognition is felt."

---

### Scene 5 — The pitch (1:45–2:00)

**Josh, looking back at camera:**
> "Most luxury chains lose their guest at the property line. Rosewood doesn't have to. We sit on top of their existing Oracle OPERA system — the data they already capture, the data they already pay to store. We're the AI layer that turns it into the moment of arrival. Sandy Chain-Recall."

**Final beat:** A 2-second hold on the staff page screen with the brief still up.

---

## If something breaks

- **Dev server crashes:** Switch to a pre-recorded screen capture of the same flow. Josh narrates over it.
- **Chime doesn't play:** Don't draw attention to it. Move on.
- **Whisper button errors:** Skip Scene 4. The architecture slide covers the earpiece concept.
- **Wifi-dies-but-screen-still-works:** The cache fallback is invisible. Demo continues identical.

---

## What we're NOT showing in the video

- The code. Judges who care can browse the GitHub repo.
- The OPERA adapter. Slide in the deck, not the video.
- The pitch numbers (38 properties, $229M acquisition, etc.). Slide in the deck.
- The MCP roadmap. Slide in the deck.
- The privacy/RBAC roadmap. Slide in the deck.

The video shows ONE thing: the magic of a luxury chain that already knows you when you walk in. Everything else is supporting evidence.
