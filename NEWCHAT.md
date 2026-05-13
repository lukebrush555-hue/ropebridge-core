# RopeBridge New Chat Startup

_Last updated: 2026-05-13_

## Start Here

This project is centered on the clean repo:

```txt
lukebrush555-hue/ropebridge-core
```

The older repo remains useful as historical/prototype context only:

```txt
lukebrush555-hue/qr-intake-system
```

Do **not** treat `qr-intake-system` as the current production foundation unless explicitly asked.

Current product name:

```txt
RopeBridge
```

Current framing:

```txt
RopeBridge turns physical QR scans into remembered vendor/customer interactions.
It is like Linktree for physical-world relationships, but action-based and recognition-aware.
```

---

## Core Philosophy

RopeBridge is not a generic SaaS dashboard, CMS, ecommerce app, or pile of unrelated landing pages.

It is infrastructure for physical-to-digital interactions:

```txt
physical encounter
→ QR scan
→ lightweight identity handshake
→ vendor-specific interaction
→ persistent relationship continuity
```

Core operating principles:

- QR-first
- mobile-first
- friction once
- recognition continuity
- browser remains untrusted
- static-first implementation
- reusable bones + explicit config
- no heavy auth unless there is a clear need
- no dashboard unless operational need proves it
- premium physical-world UX over generic SaaS UI

---

## Current Product Hierarchy

Top-level product:

```txt
RopeBridge
```

Core archetypes:

```txt
RopeBridge Claim
RopeBridge Handshake
RopeBridge Remember
```

Definitions:

```txt
Claim = “I want the thing.”
Handshake = “I want the relationship.”
Remember = “Remember this for next time.”
```

Current implemented archetype:

```txt
Claim
```

Future archetypes documented but not implemented yet:

```txt
Handshake
Remember
```

SamplePass is no longer the top-level product. It is only an example/demo configuration of the Claim archetype.

---

## Current Repo

Primary repo:

```txt
lukebrush555-hue/ropebridge-core
```

Current GitHub Pages URL:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/
```

Current known-good cache-busted test URL after restoring the approved visual migration:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/?v=restored-approved-1
```

Current structure:

```txt
ropebridge-core/
  NEWCHAT.md
  README.md
  PROJECT_CONTEXT.md
  AGENTS.md
  SECURITY.md
  ARCHETYPES.md
  .env.example
  .gitignore

  assets/
    css/
      ropebridge/
        tokens.css
        base.css
        components.css
        states.css
    images/
      ropebridge-seal.svg
      samplepass-stand.jpg

  archetypes/
    claim/
      index.html
      app.js
      README.md

    handshake/
      README.md

    remember/
      README.md

  configs/
    examples/
      claim-samplepass-demo.js

  supabase/
    schema.sql
    migrations/
      202605130001_init_interactions.sql
```

GitHub Pages workflow exists:

```txt
.github/workflows/deploy-pages.yml
```

---

## Important Migration Correction

Codex initially created a clean `ropebridge-core` Claim page, but it looked different from the approved old visual branch.

The new implementation was too stripped down:

```txt
bare sections
huge direct page title
direct offer image
missing tactile card structure
less faithful to the approved cream/olive/brass mockup
```

The approved visual implementation was then migrated from the old repo into `ropebridge-core`.

Restored into `ropebridge-core`:

```txt
approved SamplePass v1 structure
centered seal header
recognition banner
card-based offer layout
cream/olive/brass design tokens
tactile CTA/card styling
Connect → Claim → Connected flow
ROPEBRIDGE_CONFIG compatibility
public.interactions insert path
```

Recent migration commits included:

```txt
0c0cc13  Restore approved Claim visual structure
6c15042  Restore approved cream olive tokens
bcb6b47  Restore approved mobile flow layout
67d526c  Restore approved tactile component styling
97d5787  Restore approved Claim state styling
032a597  Align Claim demo config with approved structure
fe760ad  Adapt Claim behavior to restored visual structure
```

Future AI/Codex work should preserve the restored approved visual implementation, not the earlier stripped-down clean-room version.

---

## Current Supabase State

Use the existing Supabase project:

```txt
qr-intake-core
project ref: chqwqnxxggswbsijxnio
```

Do not create a new Supabase project yet.

The new RopeBridge table is:

```txt
public.interactions
```

The old prototype table remains:

```txt
public.lead_requests
```

Do not rename `lead_requests`. Leave it as historical/prototype data.

Current intended split:

```txt
old qr-intake-system repo → public.lead_requests
new ropebridge-core repo → public.interactions
```

### `public.interactions` status

`public.interactions` exists and has:

```txt
RLS enabled
anon INSERT only
authenticated no broad grants
service_role full access
rows: 0 initially
```

Columns:

```txt
id
created_at
archetype
campaign_id
vendor_id
qr_id
visitor_name
visitor_phone
visitor_email
business_name
action_label
metadata
```

Allowed archetypes:

```txt
claim
handshake
remember
```

There was an accidental table named `public."public.interactions"` created during setup. It was removed.

---

## Security Rules

Never expose:

```txt
service_role key
database password
private API keys
admin tokens
```

Browser may use only:

```txt
Supabase URL
Supabase publishable key
```

That is acceptable only because RLS and grants restrict browser access.

Browser behavior should remain:

```txt
INSERT only
no SELECT
no UPDATE
no DELETE
```

`.env.example` should use placeholders only:

```txt
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not put real secrets in `.env.example`.

Public insert endpoint spam is a known MVP risk. Future hardening may include:

```txt
rate limits
CAPTCHA
edge functions
stricter allowlists
server-side validation
```

---

## Current Claim Flow

The state flow is critical and must be preserved.

Current behavior:

```txt
First-time visitor:
Connect → Claim → Connected

Returning visitor:
skip Connect → Claim with recognition message → Connected
```

Detailed behavior:

```txt
1. User lands on page.
2. App checks localStorage for remembered visitor keys.
3. If no saved visitor exists, show Connect state.
4. User enters first name + phone + consent.
5. App saves visitor locally.
6. App moves to Claim state.
7. If saved visitor exists on later scan, app skips Connect.
8. Returning visitor lands directly on Claim state.
9. Recognition message appears, e.g. “Welcome back, Luke.”
10. User taps Claim.
11. App inserts one row into public.interactions.
12. App moves to Connected state.
```

Current localStorage keys:

```txt
ropebridge-connected
ropebridge-name
ropebridge-phone
```

Do not break this flow when renaming, cleaning, or refactoring.

---

## Approved Claim Screen Hierarchy

The active Claim screen should follow this order:

```txt
centered RopeBridge seal/logo
recognition message if remembered
image inside tactile card
offer title
description
CTA button
limit note
```

The active Claim screen should use the restored `.rb-card rb-flow-card rb-offer-card` structure, not the stripped-down direct-page image/title layout.

Do not re-add:

```txt
top vendor text
Raw Honey top subtitle
SAMPLEPASS eyebrow
powered by RopeBridge text
dark app theme
automatic dark-mode styling
```

The seal/logo is enough as the RopeBridge brand mark.

---

## Approved Visual Direction

The approved visual direction is:

```txt
cream / olive / brass
premium artisan
quiet
physical-world
boutique packaging
heritage object
not generic SaaS
not dark dashboard
not QR tool UI
```

Important theme rule:

```txt
Force the approved light cream / olive / brass RopeBridge theme regardless of device dark-mode settings.
Do not add automatic prefers-color-scheme dark styling for the active Claim flow.
```

The previous dark mode look was rejected.

---

## Claim Config Model

Use one global config object:

```js
window.ROPEBRIDGE_CONFIG = {
  archetype: "claim",
  campaignId: "backyard-blooms-sample",
  vendor: {
    id: "backyard-blooms",
    name: "Backyard Blooms",
    category: "Raw Honey",
    links: {
      order: "...",
      instagram: "...",
      facebook: "...",
      website: "..."
    }
  },
  offer: {
    title: "Wildflower Raw Honey",
    description: "Made locally in small seasonal batches using wildflower nectar gathered throughout the Saucon Valley region.",
    cta: "Claim sample",
    limitNote: "One claim per person, per day.",
    image: "../../assets/images/samplepass-stand.jpg",
    imageAlt: "Backyard Blooms wildflower raw honey sample"
  },
  copy: {
    connectHeadline: "Sign in once. Easier every time.",
    connectSubheadline: "Use your phone number so participating vendors can recognize you when you scan again.",
    connectBody: "No password. No account to manage. Just a faster path back to the vendor you already met.",
    connectPrimaryAction: "Continue",
    connectedHeadline: "You’re connected.",
    connectedBody: "Next time you scan, we’ll know where to pick up. You can also use this page to find this vendor again.",
    connectedNote: "Your details are saved for next time."
  },
  supabase: {
    url: "YOUR_SUPABASE_URL",
    publishableKey: "YOUR_SUPABASE_PUBLISHABLE_KEY"
  },
  tracking: {
    qrId: "farmers-market-table-sign-001"
  }
};
```

Do not use these old globals in the new repo:

```txt
SAMPLEPASS_DEMO_CONFIG
SAMPLEPASS_DESIGN_SYSTEM_V1_CONFIG
```

---

## Archetypes

### Claim

Claim means:

```txt
“I want the thing.”
```

Examples:

```txt
claim sample
claim upgrade
claim tasting
claim coupon
claim raffle entry
claim event perk
```

Current implemented archetype.

### Handshake

Handshake means:

```txt
“I want the relationship.”
```

Future flow:

```txt
Connect → Share contact → Connected
```

Use cases:

```txt
expo lead capture
vendor booth scans
business card replacement
market/conference relationship capture
```

Handshake is core and important, but not fully implemented yet.

### Remember

Remember means:

```txt
“Remember this for next time.”
```

Future flow:

```txt
Connect → Save preference → Retrieve/update later
```

Use cases:

```txt
save my haircut
save my bike specs
save my usual order
save grooming notes
save product preferences
```

Remember is core, but not fully implemented yet.

---

## What Is Out of Scope Right Now

Do not add unless explicitly requested:

```txt
dashboard
admin panel
heavy authentication
server-side app framework
Vercel server functions
service intake workflow
direct ordering archetype
passport-progress archetype
dark mode for Claim
complex CRM integration
```

QR ordering is currently just a State 3 link, not a separate archetype.

WinePassport is not a separate archetype unless it adds multi-stop passport/check-in progress. Simple “claim upgrade” belongs under Claim.

Service intake may be supported later, but it is not core right now.

---

## Legacy Repo Context

Old repo:

```txt
lukebrush555-hue/qr-intake-system
```

Useful for historical context only.

Do not migrate these into the clean repo:

```txt
templates/samplepass-claim/
configs/samplepass-demo.js
old visual experiments
old branches
old prototype notes
old dark-mode attempts
SamplePass as top-level product identity
```

Exception:

```txt
The approved visual implementation from templates/samplepass-v1/ and assets/css/ropebridge/ was intentionally migrated into ropebridge-core after the first clean implementation looked wrong.
```

The old repo helped discover the working flow and visual direction, but `ropebridge-core` is the new foundation.

---

## Current Known Issues / Things To Check

Check GitHub Pages deployment:

```txt
Actions tab → Deploy static site to GitHub Pages
```

Current test route:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/?v=restored-approved-1
```

If Chrome Android makes the page look tiny, check:

```txt
Chrome menu → Desktop site
```

Desktop Site being enabled caused a false mobile-layout problem earlier.

Potential next work:

```txt
1. Verify GitHub Pages deployment shows the restored approved Claim layout.
2. Replace placeholder Supabase values in configs/examples/claim-samplepass-demo.js if testing live inserts.
3. Test Claim flow against public.interactions.
4. Confirm inserts land in Supabase.
5. Inspect visual fidelity on mobile.
6. Verify State 3 links and Connected screen.
7. Build Handshake after Claim is stable.
```

---

## Rules for Future AI / Codex Work

Preserve:

```txt
RopeBridge as top-level product name
Claim / Handshake / Remember archetype model
Connect → Claim → Connected state flow
returning visitor skip-Connect behavior
localStorage recognition behavior
cream / olive / brass visual direction
restored approved card-based Claim layout
public.interactions table model
browser insert-only posture
```

Do not:

```txt
expose service_role
add dark mode to active Claim
reintroduce SamplePass as platform name
copy old prototype routes
rename old lead_requests table
break the working state flow
replace the approved card-based layout with a stripped-down direct image/title layout
add dashboard/auth/server complexity without explicit approval
```

Keep changes small, inspectable, and compatible with static deployment.
