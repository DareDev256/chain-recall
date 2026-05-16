# Rosewood Hotels & Resorts — Reference Architecture Brief

**Purpose:** Reference target for a hackathon pitch demonstrating an AI "prep brief" layer that sits on top of OPERA-style PMS to give front-of-house staff live, cross-property guest context. Rosewood is the archetype — not a literal partner.

---

## 1. Current Property Portfolio

Operating footprint: **38 hotels across 23 countries**, with **21+ in the pipeline**. Brand positioning is "A Sense of Place" — every property is meant to feel like it belongs to its city, not to a chain.

### North America (USA, Canada, Mexico)
- **Rosewood Mansion on Turtle Creek** — Dallas, USA — original 1981 flagship, Texas oil-money grand dame
- **Rosewood Inn of the Anasazi** — Santa Fe, USA — adobe pueblo intimacy
- **Rosewood Sand Hill** — Menlo Park, USA — the Silicon Valley deal-making hotel
- **The Carlyle, a Rosewood Hotel** — New York, USA — Upper East Side old-money institution
- **Rosewood Washington, D.C.** — Georgetown townhouse-style discretion
- **Rosewood Miramar Beach** — Montecito, USA — California coastal-estate languor
- **Kona Village, a Rosewood Resort** — Hawaii, USA — reborn Polynesian hale village
- **Rosewood Hotel Georgia** — Vancouver, Canada — restored 1927 landmark
- **Rosewood San Miguel de Allende** — Mexico — colonial highland romance
- **Las Ventanas al Paraíso** — Los Cabos, Mexico — Baja desert-meets-sea icon
- **Rosewood Mayakoba** — Riviera Maya, Mexico — lagoon villas in the jungle
- **Rosewood São Paulo** — Brazil — Jean Nouvel vertical garden tower

### Caribbean
- **Rosewood Baha Mar** — Nassau, Bahamas — Bahamian high-roller resort wing
- **Rosewood Bermuda** — Tucker's Point — pink-sand colonial elegance
- **Rosewood Little Dix Bay** — Virgin Gorda, BVI — Laurance Rockefeller's original castaway-luxury blueprint
- **Rosewood Le Guanahani** — St. Barth — barefoot French Caribbean

### Europe
- **Hôtel de Crillon, a Rosewood Hotel** — Paris — Place de la Concorde palace, 18th-century
- **Rosewood London** — Holborn — Edwardian Belle Époque townhouse
- **Rosewood Castiglion del Bosco** — Tuscany — Massimo Ferragamo Brunello estate
- **Rosewood Villa Magna** — Madrid — Paseo de la Castellana power address
- **Rosewood Vienna** — Habsburg-era Kärntner ring grandeur
- **Rosewood Munich** — Bavarian banking-quarter quietude
- **Rosewood Schloss Fuschl** — Salzburg — lakeside 15th-century castle (former Empress Sisi residence)
- **Rosewood Amsterdam** — canal-house refinement on the Herengracht
- **Rosewood São Paulo** also marketed via Europe-Americas portfolio

### Middle East
- **Rosewood Abu Dhabi** — Al Maryah Island financial-district twin towers
- **Rosewood Jeddah** — Red Sea corniche legacy property
- **Rosewood Doha** — Qatar's new diplomatic-quarter flagship (2025)

### Asia
- **Rosewood Beijing** — Chaoyang diplomatic-tower modernism
- **Rosewood Hong Kong** — Victoria Dockside cultural megastructure (1979 founder's flagship reset)
- **Rosewood Guangzhou** — Pearl River cube tower
- **Rosewood Sanya** — Hainan tropical-island integrated resort
- **Rosewood Bangkok** — Ploenchit "dancing towers" silhouette
- **Rosewood Phuket** — Emerald Bay villa-only retreat
- **Rosewood Luang Prabang** — Laos hillside heritage village
- **Rosewood Phnom Penh** — Cambodian sky-bar civic landmark
- **Rosewood Miyakojima** — Okinawa, Japan — brand's first Japanese property

### Oceania
- **Rosewood Cape Kidnappers** — Hawke's Bay, NZ — clifftop golf-estate
- **Rosewood Kauri Cliffs** — Bay of Islands, NZ — Pacific bluff sprawl
- **Rosewood Matakauri** — Queenstown, NZ — alpine lakeside lodge

---

## 2. Brand Positioning & Clientele

- **Positioning:** "A Sense of Place" (registered trademark, ~30+ years old). Anti-chain, anti-cookie-cutter. Each property is meant to read as a love letter to its city.
- **Voice:** Editorial, residential, discreet. Recent (2024–2025) brand refresh leans further into **culture, craftsmanship, and "discovery"** — explicitly trying to position above traditional luxury amenity arms-races.
- **Clientele skew:**
  - UHNW + senior corporate (Silicon Valley founders favor Rosewood Sand Hill; Asian/Greater China heirs visible across Hong Kong, Beijing, Guangzhou; Middle Eastern royalty across the GCC properties).
  - Heavy **multi-generational family** travel — branded residences expansion supports this.
  - Skew is global, but Greater China and US coastal HNW are core. New money is welcome; the brand reads less old-establishment than Aman, less corporate than Four Seasons.
- **ADR:** Entry rates **mostly above USD $1,000/night** before tax. Standard rooms commonly USD $650–$2,260. Suites and villas easily $5K–$25K+/night (Las Ventanas, Phuket, Castiglion del Bosco).
- **Repeat rate:** Not publicly disclosed at portfolio level. Loyalty inferred via Carlyle & Co. members-club crossover and Rosewood Elite booking channel.

---

## 3. Tech Stack Signals

- **PMS:** No public confirmation of Oracle OPERA vs Maestro vs in-house. EHL hospitality-research case study describes Rosewood as actively seeking innovations that could be **"adopted to every Rosewood hotel"** — i.e., a federation problem, not a single-site problem. The phrasing implies a centrally-coordinated but locally-deployed stack, which is exactly the OPERA pattern.
- **Connectivity layer:** Rosewood is named as a customer of **Hapi**, the hospitality data/connectivity middleware — Hapi specializes in real-time PMS data streaming, strongly suggesting an OPERA-class backend (Hapi's core product is OPERA → cloud event streaming).
- **Loyalty:** Rosewood does **not** run a points-based program. Instead: **Rosewood Elite**, a benefit-based travel-advisor channel with tangible perks (upgrades, credits, breakfast, spa). Tiers: Explorer → Insider → Elite.
- **Digital guest layer:** Recent (2024–2025) overhaul of Rosewood.com + Rosewood app blending editorial content with booking. Public messaging from the brand explicitly references **"predictive analytics to anticipate guest preferences"** and a "relationship hospitality" model where the brand "knows you before you ask." This is the exact narrative our pitch should attach to.
- **Members club:** **Carlyle & Co.** (launched Hong Kong, named after the NYC Carlyle) — separate IT footprint, but same parent.

---

## 4. Cross-Property Guest Patterns

- Public language already aligns with what we're building: "**relationship hospitality**", "**knows you before you ask**", "**every touchpoint feels curated**" (Rosewood corporate, 2024–2025 brand refresh).
- No published case study on cross-property recognition specifically — this is the **gap our pitch fills**.
- **Asaya wellness** is in 13 properties live with 19 in pipeline — explicit cross-property wellness journey continuity is a stated brand goal.
- Branded residences (14 live, 13+ in pipeline) create owners who are also frequent guests of other Rosewoods — a textbook cross-property recognition use case.

---

## 5. Competitive Set

Per industry rankings (Luxury Travel Intelligence, One Mile at a Time, Pursuitist):

| Brand | What they do | Cross-property memory? |
|---|---|---|
| **Aman** | Architectural minimalism, anti-chain ethos | No public AI/data play; deliberately analog brand voice |
| **Four Seasons** | The corporate-reliable luxury default | Strong global guest profiles, Four Seasons app, but no public AI prep-brief layer |
| **Mandarin Oriental** | Spa + F&B emphasis; #1 in LTI rankings | Public 2025 announcement of "next-generation technology to elevate luxury hotel guest experience" — closest stated peer to what we're proposing |
| **Belmond** (LVMH) | Heritage trains, palazzos, "anti-Aman" | LVMH-owned; CRM benefits from LVMH client graph but not publicly surfaced to staff |
| **Park Hyatt / St. Regis / Ritz-Carlton** | Premium tier below Rosewood/Aman | Tied to Marriott/Hyatt loyalty stacks — points-driven, not relationship-driven |

Rosewood's competitive wedge is the "residential, knows-you" voice. **None of these competitors have publicly shipped a staff-facing live cross-property prep brief.** That's the white space.

---

## 6. Pitch-Ready Facts (cite-ready)

1. **38 hotels in 23 countries, 21+ in pipeline** (Rosewood corporate factsheet 2025; Wikipedia property list).
2. **Founded 1979 in Dallas by Caroline Rose Hunt**; acquired by **New World Hospitality / Rosewood Hotel Group for ~USD $229M in 2011**; consolidated under **Chow Tai Fook Enterprises** (Cheng family, Hong Kong) in **2015 for HK$1.96 billion**.
3. **Led by CEO Sonia Cheng** (granddaughter of Cheng Yu-tung); aggressive expansion footprint — **30+ projects in pipeline over the next 5 years** including Rosewood Amaala and Rosewood Red Sea in Saudi Arabia.
4. **Entry ADR ~USD $1,000+/night** across most properties; suite rates routinely $5K–$25K+ (Las Ventanas, Phuket, Castiglion del Bosco).
5. **Loyalty is benefit-based, not points-based** — Rosewood Elite tiers (Explorer → Insider → Elite), distinct from Marriott Bonvoy / Hyatt World peer programs.
6. **Public brand language already names the problem we solve:** "predictive analytics," "knows you before you ask," "relationship hospitality" (Rosewood 2024–2025 brand refresh, Skift coverage Oct 2025).
7. **2026 openings on the runway include Rosewood San Francisco, Rosewood Milan, Rosewood Rome, Rosewood Blue Palace Crete, Rosewood Shenzhen** — fresh properties = fresh staff onboarding = perfect zero-history cold-start use case for an AI prep brief.

---

**Bottom line for the pitch:** Rosewood has *already stated* the strategic intent ("know you before you ask," "relationship hospitality"), has the federated multi-property surface area (38 hotels, 23 countries, cross-property residences and wellness), and runs a benefit-based — not points-based — guest model where staff knowledge IS the loyalty product. That is the textbook deployment target.
