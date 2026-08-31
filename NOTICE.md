# NOTICE

## Rosewood Hotels & Resorts is named here as an illustrative target, nothing more

Sandy Chain-Recall is an independent prototype built in 8 hours at the SF Anthropic
Hackathon. It is not a Rosewood product, not a Rosewood pilot, and not built under any
agreement with Rosewood.

James Olusoga and Joshua Dare are **not affiliated with, endorsed by, sponsored by, or
connected to Rosewood Hotels & Resorts** or any of its parent, subsidiary, or affiliated
companies. Rosewood is named because a pitch has to name the kind of customer it is aimed
at, and a hotel chain that already runs Oracle OPERA is the shape of that customer.

"Rosewood", "Rosewood Hotels & Resorts", the Rosewood monogram, the individual property
names, and all associated marks are the property of their respective owners. Naming them
in a description of an intended customer is nominative reference, not a claim of any right
in them.

## No Rosewood asset is redistributed here

This repository ships **no** Rosewood photography, video, logo, monogram, or other brand
asset. An earlier version of this repository did: roughly 305 image and video files under
`public/properties/`, plus property plates, the monogram and a cut of Rosewood's brand
reel under `public/brand/` and `public/mashup/`. Those were pulled from Rosewood's own
website during the hackathon and should never have been committed. They have been removed
from the working tree.

What replaces them:

- `public/brand/plates/*.svg` — abstract placeholder plates generated for this repository
  by `scripts/gen-plates.mjs`. They are drawings, not photographs, and are labelled
  PLACEHOLDER on their face.
- The opening title card renders the chain's name as **text**. There is no logo file.
- The ambient reel behind the property triptych is gone. The gradient wash that sat over
  it is now the background on its own. This is a deliberate empty state, not a bug.

If you fork this and want real imagery, supply files you have the right to use and repoint
`PROPERTY_PLATES` in `app/brand-tokens.ts`.

`research/rosewood.md` and `research/rosewood-properties.md` remain. They are our own
written notes about a public company, compiled from public sources and cited inline. They
contain short attributed quotations of published marketing copy and no images.

## What the MIT licence covers

`LICENSE` covers the code, configuration, documentation and generated placeholder graphics
authored by the repository's contributors. It does not, and cannot, grant any right in a
third party's trademarks or copyrighted works. No such work is included here.

## The guest data is invented

The four guest profiles in `lib/data.ts` are fictional. No real person's booking history,
preferences, allergies or contact details appear anywhere in this repository.
