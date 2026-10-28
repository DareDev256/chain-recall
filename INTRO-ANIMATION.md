# Intro Animation — Shooting Script

> **Use:** demo video pre-roll. Sponsor wreath → Clawd action → "Presented by The Dare's" title card → cut to Sandy intro at /.
>
> **Stack:** Seedance 2.0 image-to-video. Each beat is a 4–6 sec clip from one source image + a motion prompt. Concat in ffmpeg or final-cut.
>
> **Total target length:** 22–28 sec (cold open). Anything longer and judges' patience burns before the demo starts.

---

## Sponsor assets — in `public/sponsors/`

| File | What it is | Use |
|---|---|---|
| `anthropic.svg` | Anthropic wordmark (296B SVG, fill=#191919) | Sponsor wreath beat |
| `greycroft.svg` | Greycroft wordmark (1.8KB SVG) | Sponsor wreath beat |
| `cerebral-valley.jpg` | CV avatar / square logo (644×644 JPG) | Sponsor wreath beat |
| `cerebral-valley-banner.jpg` | CV banner art (1500×399 JPG) | Backup for wider canvas |
| `cerebral-valley-mark.svg` | CV "V" monogram (nav glyph) | Small attribution / corner watermark |

You'll also need:
- **Clawd reference**: pull the Anthropic Clawd mascot still (from `claude.com` press kit or Anthropic merch shop). The cowboy-hat-and-lasso Clawd is the canonical "wrangling agents" version — perfect for the parachute/split frames.
- **City plates**: already in `public/brand/` — `property-hong-kong.jpg`, `property-london.jpg`, `property-sand-hill.jpg`.

---

## 🥇 Concept A — Skydive Split (recommended, your idea)

**Why this one wins:** literal visual metaphor for the Sandy thesis — *one institutional memory, three properties simultaneously.* Plus skydive footage = unbeatable wow opener.

### Shot list (26 sec)

| # | Beat | Duration | Source image | Seedance prompt |
|---|---|---|---|---|
| 1 | Sponsor wreath assembles — Anthropic + Greycroft + Cerebral Valley logos slide in from off-frame and lock into a triangle around centered "HOSTED AT ROSEWOOD SAND HILL" caption | 3 sec | Composite still: 3 logos on cream BG | "Three logos slide in from edges, lock into formation around center text. Cinematic, smooth, premium." |
| 2 | Cut to Clawd in plane doorway, wind in fur, goggles on, gives thumbs-up to camera | 3 sec | Clawd mascot still with goggles + parachute pack (Photoshop/nano-banana edit from base Clawd) | "Cartoon mascot stands in open airplane doorway, wind blowing fur back, gives thumbs-up. Cinematic, golden hour clouds visible behind." |
| 3 | Clawd jumps. Belly-down freefall, big grin, arms wide | 4 sec | Clawd in T-pose midair pose | "Cartoon mascot freefall skydive, belly-down, arms wide, grinning, clouds rushing past below. Whip-pan camera pulls back from face to wide." |
| 4 | The split — Clawd duplicates mid-air with a soft glow burst into THREE Clawds, fanning out | 3 sec | Same as 3 + 2 ghost Clawds drawn beside | "Single skydiver mascot multiplies in glowing flash into three identical mascots fanning outward, still falling. Magical, soft-glow, no audio cue." |
| 5 | Three Clawds parachute open simultaneously, descending toward different cities below | 4 sec | Three Clawds with deployed parachutes over a stylized map | "Three skydiving mascots deploy parachutes in unison, descending over a stylized world map. Wide shot, top-down camera, smooth descent." |
| 6a | Clawd 1 lands in Hong Kong — touches down on Tsim Sha Tsui pier, harbor and skyline behind | 3 sec | Clawd silhouette over `property-hong-kong.jpg` | "Mascot lands gently on a wooden pier, Hong Kong harbor and skyline at golden hour behind. Parachute folds away." |
| 6b | Clawd 2 lands in Sand Hill (Menlo Park) — touches down on lawn with cypress trees | 3 sec | Clawd silhouette over `property-sand-hill.jpg` | "Mascot lands gently on a sunlit garden lawn with tall cypress trees behind. California afternoon, parachute folds away." |
| 6c | Clawd 3 lands in London (Holborn) — touches down on Edwardian courtyard | 3 sec | Clawd silhouette over `property-london.jpg` | "Mascot lands gently on a stone courtyard with Edwardian building behind. London overcast, parachute folds away." |
| 7 | Three Clawds tip hats / wave at camera in 3-pane split-screen | 2 sec | Three landed-Clawds composite | "Three identical mascots in 3-pane split screen, each tips hat or waves at camera in unison. Synchronized, warm." |
| 8 | Title card: "PRESENTED BY · THE DARE'S · J & J" in editorial serif | 3 sec | Static type design | (no Seedance needed — straight title card) |

**Beat 6a/6b/6c can play simultaneously in 3-pane split-screen if you want to compress to 22 sec total.**

---

## 🥈 Concept B — Cowboy Clawd Lassos The Sponsors (homage)

**Why:** matches the "Claude in cowboy hat grabbing all the terminals" reference you mentioned. Established Clawd visual language. Fewer source clips needed.

### Shot list (18 sec)

| # | Beat | Duration | Seedance prompt |
|---|---|---|---|
| 1 | Wide shot: cowboy Clawd standing on a sand dune at sunset, lasso loose in hand | 3 sec | "Cartoon mascot in cowboy hat stands on a sand dune at golden hour, lasso loose at side. Cinematic wide shot, warm light." |
| 2 | Clawd swings lasso overhead | 3 sec | "Cartoon mascot in cowboy hat swings lasso overhead in big circles, focused expression. Cinematic, slow-motion, particles." |
| 3 | Lasso flies off-frame and pulls Anthropic, Greycroft, CV logos into the loop | 4 sec | "Lasso flies through frame catching three glowing logo objects, pulling them inward like a rope reel. Particles, glow trails." |
| 4 | Clawd reels them in to his feet, three logos stack like luggage | 3 sec | "Mascot reels in lasso with three captured logo objects stacking neatly at his feet, satisfied posture." |
| 5 | Clawd tips hat at camera, sand dune dissolves to Rosewood property triptych | 3 sec | "Mascot tips cowboy hat at camera, background dissolves from desert to a luxury hotel scene." |
| 6 | Title card: "PRESENTED BY · THE DARE'S · J & J" | 2 sec | (title card) |

---

## 🥉 Concept C — Compass Rose Teleport (alt, fastest)

**Why:** minimum frames, maximum metaphor. Compass rose = "wayfinding for the chain" = Sandy's literal job.

### Shot list (14 sec)

| # | Beat | Duration | Seedance prompt |
|---|---|---|---|
| 1 | Clawd appears at center of a brass compass rose, slow rotation | 3 sec | "Cartoon mascot stands at center of an ornate brass compass rose, slow camera dolly-in, soft particle dust." |
| 2 | Compass needles snap to N/SE/W (HK/SH/LDN positions) | 2 sec | "Compass needles spin then snap to three positions with a soft chime visual. Cinematic, mechanical detail." |
| 3 | Three echoes of Clawd fly outward to corners of the frame | 3 sec | "Three glowing duplicates of mascot fly outward from center along compass directions, motion blur." |
| 4 | Each duplicate materializes at a city — HK, SH, LDN in triple split-screen | 4 sec | "Three identical mascots fade in at three city scenes in split-screen: harbor, garden, courtyard." |
| 5 | Title card: "PRESENTED BY · THE DARE'S · J & J" | 2 sec | (title card) |

---

## Title card spec

```
PRESENTED BY
THE DARE'S
─────────────
JAMES · JOSHUA
```

**Type:** serif (match `--color-ink` from `app/brand-tokens.ts`).
**Background:** cream (`#f4ede1` or pull from `--color-cream`).
**Sub-line:** small caps, accent color (`--color-accent`), spacing 0.3em.
**Duration:** 2.5–3 sec hold. No animation needed (visual rest after Clawd action).

If you want a touch of motion: tiny vertical scale-up of "THE DARE'S" on entry, 400ms, ease-out.

---

## Seedance 2.0 prompt tips (general)

- **Keep prompts under 30 words.** Seedance is motion-first; long scene descriptions get ignored.
- **Lead with the subject + verb.** "Mascot jumps from plane" not "There is a cartoon mascot that jumps."
- **Specify camera language.** "wide shot," "whip-pan," "dolly-in," "split-screen" — Seedance is trained on cinematic vocabulary.
- **Add one sensory detail.** "fur blowing back," "golden hour," "particles," "soft glow" — anchors the aesthetic.
- **One motion verb per clip.** Don't ask for "jumps then splits then parachutes" — that's 3 clips. Break it up.
- **Aspect ratio:** 16:9 to match the final demo video output. Check the export setting before each render.
- **Duration:** Seedance Pro = 5 sec default per clip. Set to 4 sec for tighter cuts.

---

## Production order (efficient)

1. **Pull Clawd reference still** from Anthropic's brand assets. The cowboy-hat-with-lasso pose is what you want as the base; you can paint a parachute pack onto a copy.
2. **Create 3 hero stills via nano-banana**:
   - Clawd in plane doorway with goggles + parachute
   - Three Clawds in mid-air freefall (composite of 3 instances of base)
   - Three Clawds landing in HK / SH / LDN (composite over property plates)
3. **Feed each still to Seedance** with its prompt from the table above.
4. **Concat in ffmpeg** with hard cuts (no fades — keeps energy up):
   ```bash
   ffmpeg -f concat -safe 0 -i concat.txt -c:v libx264 -preset slow -crf 20 intro.mp4
   ```
5. **Layer the title card** at the end as a still or short PNG sequence.

---

## What I can do for you while you're in Seedance

- Build the Clawd "presented by" title card as a Tailwind/CSS component that matches the cream-and-ink aesthetic — exportable as a still or animated.
- Write a 3-pane split-screen ffmpeg filter that takes 3 Seedance clips and renders the HK/SH/LDN landing simultaneously.
- Compose the sponsor wreath as an SVG with all 3 logos pre-arranged.

Just say which one's next.
