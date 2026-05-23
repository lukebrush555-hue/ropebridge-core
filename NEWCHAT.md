# RopeBridge New Chat Startup

_Last updated: 2026-05-23_

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
Claim create page is now aligned with Claim and works as a fill-in-the-blank generator.
Create page supports hosted Supabase Storage image upload, QR generation, one-tap copy+QR download, and inline preview.
```

---

## Current Repo / Links

Primary repo:

```txt
lukebrush555-hue/ropebridge-core
```

Current GitHub Pages URL:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/
```

Current create-page URL:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/create/
```

Current latest cache-busted test URL:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/create/?v=inline-preview-1
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

    handshake/
      README.md

    remember/
      README.md

  configs/
    examples/
      claim-samplepass-demo.js
      claim-samplepass-demo-local.js

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

## Approved Claim Visual Design — COMPLETE

Claim is visually approved as of 2026-05-23.

Use this layout for the active Claim state:

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
  matches create-page note text
  font-size: 14px
  line-height: 1.45
  font-family: var(--rb-font-sans)
  color: rgba(63,63,59,0.62)

Vendor business name:
  uses same family/weight/spacing as the original offer headline
  font-family: var(--rb-font-serif)
  font-size: 34px
  line-height: 1.04
  font-weight: 600
  letter-spacing: -0.02em
  color: var(--rb-text-primary)

RopeBridge corner seal:
  76px × 76px
  top right of Claim state
  same visual size as create-page centered logo

Offer title:
  font-size: 22px
  same serif family and weight
```

Approved logo asset:

```txt
assets/images/ropebridge-wax-seal.svg
```

Important: use the current approved raster-style wax seal asset. Do not replace it with a generated line-art/vector-only seal.

Current Claim styling lives mainly in:

```txt
assets/css/ropebridge/components.css
assets/css/ropebridge/states.css
```

Current Claim structure lives in:

```txt
archetypes/claim/index.html
archetypes/claim/app.js
```

---

## Approved Claim Create Page — CURRENT

Create is now intended to mirror the Claim output rather than feel like a detached form.

Approved create-page layout:

```txt
[Instruction text]                         [wax seal]

[Editable vendor business name]

[Claim-style card]
  [tap image area to upload/replace image]
  [editable offer title at 22px]
  [editable description]
  [editable CTA]
  [noneditable limit note]

[QR preview + actions]

[inline preview panel]
```

Approved create-page behavior:

```txt
Vendor name is editable directly in the header.
Category field is removed from the visible UI.
The separate visible upload image field is removed.
The image card itself is the upload target.
A subtle “Tap to upload image” overlay explains the image action.
Limit note is not editable in the create UI.
Image upload validates file type and size.
Image upload stores the selected image in Supabase Storage bucket ropebridge-offer-images.
Generated Claim URL receives the hosted public image URL in ?image=.
QR code updates immediately after edits.
```

Approved QR/action section:

```txt
[QR code]

[Preview page]
[Copy link + Download QR code]
[Open full page]
```

Behavior:

```txt
Preview page opens an inline iframe preview below the QR tools.
Button changes to Hide preview while open.
Inline preview refreshes automatically as edits change.
Open full page remains as a secondary full-page test link.
Copy link + Download QR code is one action:
  - copies the generated Claim URL
  - downloads the QR code PNG
```

Current create-page files:

```txt
archetypes/claim/create/index.html
archetypes/claim/create/create.js
```

Recent create-page commits:

```txt
1ef6283  Align create page with approved Claim layout
31f8ffb  Add tap-image upload and QR download action
35e3d45  Add inline preview panel to create page
c7b580a  Wire inline preview refresh on create page
```

---

## Approved State Branding Rules

Current approved state branding:

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
```

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

`public.interactions` exists and has:

```txt
RLS enabled
anon INSERT only
authenticated no broad grants
service_role full access
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

### Supabase Storage status for vendor offer images

Storage bucket created:

```txt
ropebridge-offer-images
```

Bucket intent:

```txt
Store public vendor offer/sample images uploaded from the Claim create page.
```

Current bucket settings:

```txt
public: true
file size limit: 5 MB
allowed MIME types: image/jpeg, image/png, image/webp, image/gif
```

Current policies on `storage.objects`:

```txt
anon SELECT allowed for bucket_id = 'ropebridge-offer-images'
anon INSERT allowed for bucket_id = 'ropebridge-offer-images'
```

Important: a public bucket only makes files publicly readable. Uploads still require storage policies. Those policies now exist for MVP testing.

Security note:

```txt
Anonymous public image upload is acceptable only as an MVP/prototype shortcut.
Future hardening should include one or more of:
- stricter upload path rules
- rate limiting
- CAPTCHA
- Edge Function validation
- authenticated vendor mode
- cleanup process for unused uploads
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

That is acceptable only because RLS, grants, and storage policies restrict browser access.

Browser behavior for database interactions should remain:

```txt
INSERT only
no SELECT
no UPDATE
no DELETE
```

Browser behavior for current MVP Storage images may be:

```txt
INSERT into ropebridge-offer-images
SELECT/read public image URLs from ropebridge-offer-images
```

`.env.example` should use placeholders only:

```txt
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not put real secrets in `.env.example`.

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

Claim and Create visual/design flow are complete enough for testing. Future Claim work should focus on polish, vendor testing, and security hardening rather than redesign.

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

Current Claim route:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/
```

Current create route:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/archetypes/claim/create/
```

If Chrome Android makes the page look tiny, check:

```txt
Chrome menu → Desktop site
```

Desktop Site being enabled caused a false mobile-layout problem earlier.

Potential next work:

```txt
1. Test Create → upload image → generated Claim page → QR download on phone.
2. Confirm public.interactions inserts land in Supabase from several test vendors.
3. Verify State 3 links and Connected screen.
4. Do light security hardening after MVP testing.
5. Build Handshake after Claim/create is stable.
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
Create QR tools include Preview page, Copy link + Download QR code, and Open full page
Create inline preview refreshes while editing
restored approved card-based Claim layout
fill-in-the-blank create-page concept
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
add dashboard/auth/server complexity without explicit approval
```

Keep changes small, inspectable, and compatible with static deployment.
