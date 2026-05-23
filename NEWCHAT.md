# RopeBridge New Chat Startup

_Last updated: 2026-05-23_

## Start Here

Current repo:

```txt
lukebrush555-hue/ropebridge-core
```

Historical/prototype repo only:

```txt
lukebrush555-hue/qr-intake-system
```

Do **not** treat `qr-intake-system` as the current production foundation unless explicitly asked.

Current product:

```txt
RopeBridge
```

Current framing:

```txt
RopeBridge turns physical QR scans into remembered vendor/customer interactions.
It is like Linktree for physical-world relationships, but action-based and recognition-aware.
```

Core archetypes:

```txt
Claim = “I want the thing.”
Handshake = “I want the relationship.”
Remember = “Remember this for next time.”
```

Current implemented archetype:

```txt
Claim
```

Current status:

```txt
Claim page visual design is complete and approved.
Claim Create page mirrors Claim and works as a fill-in-the-blank generator.
Create uses true placeholder text, tap-image upload, inline preview, and a submit-for-approval workflow.
QR/link download tools were removed from the visible Create flow for now.
Short-link JSON config storage is paused; long draft URLs are the stable fallback.
```

---

## Current Links

Claim page:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/
```

Create page:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/create/
```

Latest Create test URL:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/create/?v=approval-flow-1
```

---

## Current Repo Structure

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
    css/ropebridge/
      tokens.css
      base.css
      components.css
      states.css
    images/
      ropebridge-wax-seal.svg
      samplepass-stand.jpg
      claim-image-arriving-soon.svg
      markup_1000003500.jpg

  archetypes/
    claim/
      index.html
      app.js
      README.md
      create/
        index.html
        create.js
    handshake/README.md
    remember/README.md

  configs/examples/
    claim-samplepass-demo.js
    claim-samplepass-demo-local.js

  supabase/
    schema.sql
    migrations/
      202605130001_init_interactions.sql

  .github/workflows/deploy-pages.yml
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

```txt
QR-first
mobile-first
friction once
recognition continuity
browser remains untrusted
static-first implementation
reusable bones + explicit config
no heavy auth unless there is a clear need
no dashboard unless operational need proves it
premium physical-world UX over generic SaaS UI
```

SamplePass is no longer the top-level product. It is only an example/demo configuration of the Claim archetype.

---

## Current Claim Flow

The state flow is critical and must be preserved.

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

---

## Approved Claim Visual Design — COMPLETE

Approved active Claim layout:

```txt
top header:
  left: recognition line, e.g. “Welcome back, Luke.”
  below it: vendor business name, e.g. “Backyard Blooms”
  right: RopeBridge wax seal, profile/menu-button style

main card:
  image inside tactile rounded card
  offer title
  description
  CTA button
  limit note

footer:
  powered by RopeBridge text
```

Approved typography and sizing:

```txt
Recognition line:
  font-size: 14px
  line-height: 1.45
  font-family: var(--rb-font-sans)
  color: rgba(63,63,59,0.62)

Vendor business name:
  font-family: var(--rb-font-serif)
  font-size: 34px
  line-height: 1.04
  font-weight: 600
  letter-spacing: -0.02em
  color: var(--rb-text-primary)

RopeBridge corner seal:
  76px × 76px
  top right of Claim state

Offer title:
  font-size: 22px
  same serif family and weight
```

Approved logo asset:

```txt
assets/images/ropebridge-wax-seal.svg
```

Important: use the current approved raster-style wax seal asset. Do not replace it with a generated line-art/vector-only seal.

Claim files:

```txt
archetypes/claim/index.html
archetypes/claim/app.js
assets/css/ropebridge/components.css
assets/css/ropebridge/states.css
```

---

## Approved Claim Create Page — CURRENT

Create mirrors the Claim output rather than feeling like a detached form.

Approved Create layout:

```txt
[Instruction text]                         [wax seal]

[Editable vendor business name]

[Claim-style card]
  [tap image area to upload/replace image]
  [editable offer title at 22px]
  [editable description]
  [editable CTA]
  [noneditable limit note]

[Review card]
  [Preview page]
  [Submit for approval] only after preview opens

[inline preview panel]
```

Approved Create behavior:

```txt
Vendor name is editable directly in the header.
Text fields use true placeholder behavior; placeholder text is not real content.
Category field is removed from visible UI.
The separate visible upload image field is removed.
The image card itself is the upload target.
A subtle “Tap to upload image” overlay explains image upload.
Limit note is not editable in the create UI.
Image upload validates file type and size.
Image upload stores selected image in Supabase Storage bucket ropebridge-offer-images.
Generated draft Claim URL receives the hosted public image URL in ?image=.
Preview page opens an inline iframe preview.
Inline preview refreshes automatically as edits change.
Submit for approval appears after preview opens.
```

Removed from visible Create flow for now:

```txt
Scan to preview label
QR code block
Copy link + Download QR code button
Open full page link
```

Current approval behavior:

```txt
Submit for approval validates that business name and sample name are filled.
For the current MVP implementation, it copies the long draft Claim URL and shows a submitted-for-approval status.
This keeps the working long URL fallback stable and avoids the broken short-link JSON config approach.
```

Important architectural decision:

```txt
Vendor does not publish directly.
Vendor submits a draft for approval.
User/admin reviews and can fix copy, image, slug, URL, QR, and typos before anything goes live.
```

Preferred vendor-facing label:

```txt
Submit for approval
```

Do not use “Publish” on the vendor-facing Create page yet. It implies the vendor controls final release.

Create files:

```txt
archetypes/claim/create/index.html
archetypes/claim/create/create.js
```

Recent relevant commits:

```txt
8efc834 Restore long URL create links
0bd1874 Point create page to restored long link script
aee0432 Simplify create output to approval submission
987043e Add preview approval UI to create page
```

---

## Short-Link / Redirect Decision

Short-link JSON config storage was attempted and paused.

Problem:

```txt
The short-link approach tried to save claim-configs/*.json from the browser into Supabase Storage.
That introduced 400 errors and broke preview.
```

Stable fallback:

```txt
Create generates a long draft Claim URL.
That long URL works and includes all draft page data as query parameters.
```

Better future model:

```txt
Create generates the working long draft URL
→ vendor submits for approval
→ admin/user reviews and approves
→ separate redirect/shortener layer maps a clean URL to the approved long URL
→ QR uses the clean approved URL
```

Do not reintroduce browser-side JSON config saving into Create unless explicitly requested.

---

## Approved State Branding Rules

```txt
Connect / sign-in:
centered RopeBridge wax seal above the Connect card

Claim:
recognition line + vendor name on the left
small RopeBridge wax seal at top right

Connected:
small RopeBridge wax seal at top right
simple connected card + useful links
powered-by text remains quiet

Create:
instruction line + editable vendor name on the left
small RopeBridge wax seal at top right
Claim-style editable card
Preview → Submit for approval
```

Do not re-add:

```txt
top vendor subtitle
Raw Honey top subtitle
SAMPLEPASS eyebrow
large centered seal on Claim
large centered seal on Connected
dark app theme
automatic dark-mode styling
separate visible upload-image field on Create
category field on Create
QR/export tools before approval
```

---

## Approved Visual Direction

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

Theme rule:

```txt
Force the approved light cream / olive / brass RopeBridge theme regardless of device dark-mode settings.
Do not add automatic prefers-color-scheme dark styling for the active Claim flow.
```

---

## Current Supabase State

Use the existing Supabase project:

```txt
qr-intake-core
project ref: chqwqnxxggswbsijxnio
```

Do not create a new Supabase project yet.

Tables:

```txt
public.interactions       = live Claim interactions
public.lead_requests      = old prototype table; do not rename
public.claim_submissions  = created for future approval workflow
```

`public.interactions`:

```txt
RLS enabled
anon INSERT only
authenticated no broad grants
service_role full access
```

`public.claim_submissions`:

```txt
Created 2026-05-23.
Intended for future approval submissions.
Currently not fully wired into Create because the first safe repo update kept submission as copied long draft URL only.
```

Claim submissions columns:

```txt
id
created_at
status
vendor_id
vendor_name
offer_title
offer_description
cta_label
limit_note
image_url
image_alt
draft_url
metadata
```

Storage bucket:

```txt
ropebridge-offer-images
```

Bucket intent:

```txt
Store public vendor offer/sample images uploaded from the Claim create page.
```

Bucket settings:

```txt
public: true
file size limit: 5 MB
allowed MIME types include image/jpeg, image/png, image/webp, image/gif
```

Security note:

```txt
Anonymous public image upload is acceptable only as an MVP/prototype shortcut.
Future hardening should include stricter path rules, rate limiting, CAPTCHA, Edge Function validation, authenticated vendor mode, and cleanup of unused uploads.
```

Do not use a service_role key in browser code.

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

Browser database behavior should remain:

```txt
INSERT only
no SELECT
no UPDATE
no DELETE
```

Browser Storage behavior for current MVP images may be:

```txt
INSERT into ropebridge-offer-images
SELECT/read public image URLs from ropebridge-offer-images
```

`.env.example` should use placeholders only:

```txt
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

---

## Claim Config Model

Use one global config object for direct config-based Claim pages:

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

Do not use old globals:

```txt
SAMPLEPASS_DEMO_CONFIG
SAMPLEPASS_DESIGN_SYSTEM_V1_CONFIG
```

---

## Archetypes

### Claim

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

Claim and Create are stable enough for testing. Future Claim work should focus on vendor testing, approval workflow polish, short-link/redirect layer, and security hardening rather than redesign.

### Handshake

```txt
“I want the relationship.”
```

Future flow:

```txt
Connect → Share contact → Connected
```

### Remember

```txt
“Remember this for next time.”
```

Future flow:

```txt
Connect → Save preference → Retrieve/update later
```

---

## Out of Scope Right Now

Do not add unless explicitly requested:

```txt
dashboard
admin panel
heavy authentication
server-side app framework
Vercel server functions
direct ordering archetype
passport-progress archetype
dark mode for Claim
complex CRM integration
```

QR ordering is currently just a State 3 link, not a separate archetype.

WinePassport is not a separate archetype unless it adds multi-stop passport/check-in progress. Simple “claim upgrade” belongs under Claim.

---

## Legacy Repo Context

Old repo:

```txt
lukebrush555-hue/qr-intake-system
```

Useful for historical context only.

Do not migrate old prototype routes, dark-mode attempts, SamplePass-as-platform naming, or obsolete configs into `ropebridge-core`.

---

## Current Known Issues / Things To Check

If Chrome Android makes the page look tiny, check:

```txt
Chrome menu → Desktop site
```

Potential next work:

```txt
1. Test Create → upload image → preview → submit for approval on phone.
2. Decide whether Submit for approval should insert into public.claim_submissions or stay manual/copied-link for now.
3. Build a separate admin approval/redirect/shortener layer after Create is stable.
4. Confirm public.interactions inserts land in Supabase from several Claim test vendors.
5. Verify State 3 links and Connected screen.
6. Do light security hardening after MVP testing.
7. Build Handshake after Claim/Create is stable.
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
approved wax seal asset at assets/images/ropebridge-wax-seal.svg
Claim header: recognition line + vendor name + 76px top-right seal
Claim typography: vendor 34px serif; offer title 22px serif; recognition line 14px sans
Create mirrors Claim with editable vendor name and editable Claim-style card
Create image upload happens by tapping the image card, not a separate field
Create uses true placeholder text
Create uses Preview page → Submit for approval
Create inline preview refreshes while editing
long draft URL fallback remains stable
public.interactions table model
browser insert-only posture for database rows
static-first implementation unless explicitly changed
```

Do not:

```txt
expose service_role
add dark mode to active Claim
reintroduce SamplePass as platform name
copy old prototype routes
rename old lead_requests table
break the working state flow
replace the approved wax seal asset with line art or a different generated mark
replace the approved card-based layout with a stripped-down direct image/title layout
rebuild the create page into a traditional form
auto-readd category or separate image upload fields to Create
show QR/export tools before approval
reintroduce browser-side JSON config saving without explicit approval
add dashboard/auth/server complexity without explicit approval
```

Keep changes small, inspectable, and compatible with static deployment.
