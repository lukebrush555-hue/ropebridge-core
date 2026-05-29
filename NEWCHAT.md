# RopeBridge New Chat Startup

_Last updated: 2026-05-29_

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

Current public domain:

```txt
https://ropebridge.space/
```

Current framing:

```txt
RopeBridge turns physical QR scans into remembered vendor/customer interactions.
It is like Linktree for physical-world relationships, but action-based and recognition-aware.
```

Core archetypes:

```txt
Claim     = “I want the thing.”
Handshake = “I want the relationship.”
Remember  = “Remember this for next time.”
```

Current implemented archetype:

```txt
Claim
```

Current wrapper focus:

```txt
SamplePass = farmers market / vendor samples built on Claim.
```

---

## Current Links

Root:

```txt
https://ropebridge.space/
```

Claim page:

```txt
https://ropebridge.space/archetypes/claim/
```

Create page:

```txt
https://ropebridge.space/archetypes/claim/create/
```

QR registry/root route:

```txt
https://ropebridge.space/go/
```

Important:

```txt
/go/ is the registry/root/debug page.
Do not print /go/ itself on a QR stand.
Print only specific child URLs such as /go/svfmpa-sp-001/.
```

GitHub Pages fallback exists, but active testing should prefer the custom domain:

```txt
https://lukebrush555-hue.github.io/ropebridge-core/
```

---

## Custom Domain / Deployment Notes

Current Pages source:

```txt
GitHub Actions
```

Root behavior:

```txt
https://ropebridge.space/ redirects to /go/
```

CNAME:

```txt
CNAME = ropebridge.space
```

DNS:

```txt
@    A       185.199.108.153
@    A       185.199.109.153
@    A       185.199.110.153
@    A       185.199.111.153
www  CNAME   lukebrush555-hue.github.io
```

Important custom-domain path rule:

```txt
On ropebridge.space, internal routes should NOT include /ropebridge-core.
Use /archetypes/claim/ and /assets/images/... instead of /ropebridge-core/archetypes/claim/ and /ropebridge-core/assets/images/...
```

---

## Current Repo Structure

```txt
ropebridge-core/
  CNAME
  index.html
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
      connected-cta.css
    images/
      ropebridge-wax-seal.svg
      samplepass-stand.jpg
      claim-image-arriving-soon.svg
      faux-vendors/
        hollow-road-coffee.png
        crumb-and-hearth.png

  archetypes/
    claim/
      index.html
      app.js
      customer-links.js
      redeem.css
      README.md
      create/
        index.html
        create.js
    handshake/README.md
    remember/README.md

  configs/examples/
    claim-samplepass-demo.js
    claim-samplepass-demo-local.js

  go/
    index.html
    registry.js
    svfmpa-sp-demo/index.html
    svfmpa-sp-onboard/index.html
    svfmpa-sp-001/index.html
    ...
    svfmpa-sp-010/index.html
    lv-wp-001/index.html
    lv-wp-002/index.html

  supabase/
    schema.sql
    migrations/
      202605130001_init_interactions.sql

  .github/workflows/deploy-pages.yml
```

---

## Physical QR URL Template System

RopeBridge uses short, stable physical QR URLs.

SamplePass URL style is approved as readable/sequential because the public farmers-market sample page contains public marketing material:

```txt
https://ropebridge.space/go/svfmpa-sp-001/
https://ropebridge.space/go/svfmpa-sp-002/
https://ropebridge.space/go/svfmpa-sp-003/
```

Pattern:

```txt
/go/{location}-{product-or-wrapper}-{number}/
```

Example:

```txt
/go/svfmpa-sp-001/
```

Meaning:

```txt
svfmpa = Saucon Valley Farmers' Market
sp     = SamplePass
001    = physical QR asset number
```

Security-by-URL rule by product:

```txt
SamplePass: readable/sequential is acceptable for public sample pages.
WinePassport: medium security; prefer readable + random, e.g. WP-LVY-8K4P, because upgrades/offers may have redemption value.
Handshake: high security; use non-enumerable/random bearer-style codes because contact/relationship data may be involved.
DoneLoop: high security; payment/invoice/customer work records require random/authenticated access.
Remember: medium/high security; preferences may be private, so use random or authenticated access.
```

Current SamplePass faux vendor mapping:

```txt
svfmpa-sp-001 = Hollow Road Coffee — Cold Brew Tasting
svfmpa-sp-002 = Backyard Blooms — Market Stem Token
svfmpa-sp-003 = Saucon Valley Apiary — Wildflower Raw Honey
svfmpa-sp-004 = Crumb & Hearth — Sourdough Sample
svfmpa-sp-005 = Ember Jar Provisions — Three-Heat Tasting
svfmpa-sp-006 = Stone Fence Preserves — Strawberry Rhubarb Jam
svfmpa-sp-007 = Creekside Creamery — Aged Cheddar Bite
svfmpa-sp-008 = Brine & Barrel — Garlic Dill Pickle Chip
svfmpa-sp-009 = Willow Tallow & Soap — Mini Balm Sample
svfmpa-sp-010 = Fieldnote Teas — Iced Mint Tea Tasting
```

---

## Current Claim / SamplePass Flow

Current implemented state flow is now:

```txt
Connect → Claim → Redeem → Vendor
```

Where:

```txt
Connect = current Add Phone / recognition screen.
Claim   = offer page where customer claims sample.
Redeem  = vendor PIN verification screen.
Vendor  = simple vendor mini-site / return page.
```

Important naming decision:

```txt
Call the pages/states Claim and Redeem.
The final post-redeem page is the Vendor page / mini-site / return card.
```

Current implemented behavior:

```txt
1. User lands on page.
2. App checks localStorage for remembered visitor keys.
3. If no saved visitor exists, show Connect state.
4. User enters first name + phone + consent.
5. App saves visitor locally.
6. App moves to Claim state.
7. If saved visitor exists on later scan, app skips Connect and goes to Claim.
8. User taps Claim.
9. App moves to Redeem state.
10. User asks vendor for 4-digit PIN.
11. PIN boxes auto-advance as digits are entered.
12. When all 4 digits are entered, app auto-checks PIN.
13. Correct PIN opens Vendor page automatically; no tapping Redeem button.
14. Incorrect PIN clears the boxes and shows: “Incorrect code. Ask the vendor to confirm the PIN.”
15. On correct PIN, app attempts to insert one row into public.interactions with metadata.redeemed = true.
```

Current default PIN:

```txt
1234
```

PIN can be supplied by URL param:

```txt
pin=1234
```

Current A/B test direction:

```txt
A: scan → Claim → Redeem → Vendor
B: scan → Add Phone → Claim → Redeem → Vendor
```

The user has explicitly identified that the old Connect/Add Phone page needs to be fixed. Do not treat the current Add Phone screen as final.

---

## Redeem Screen — Current Approved Direction

Redeem is intentionally simple.

Keep only:

```txt
centered RopeBridge wax seal logo
Ask vendor for PIN to redeem
4 standard cookie-cutter PIN boxes
incorrect-code error when needed
```

Do not add:

```txt
extra explanatory copy
fake security-app styling
OTP / SMS language
large verification-app layout
success illustration
manual Redeem button requirement
social/vendor links
```

Redeem is the shameless RopeBridge self-promotion moment because the customer and vendor are likely both looking at the phone.

Current redeem files:

```txt
archetypes/claim/redeem.css
archetypes/claim/app.js
archetypes/claim/index.html
```

Recent implementation notes:

```txt
The Redeem button exists in markup but is visually hidden.
Auto-advance is handled by app.js after the fourth digit is entered.
Incorrect code is displayed through #redeem-status.
```

---

## Vendor Page / Mini-Site — Current Direction

The final post-redeem page should feel like a lightweight vendor mini-site / Linktree-esque return card.

Current direction:

```txt
Hollow Road Coffee

[Order Online]
[Schedule an Event]

Instagram · Facebook · TikTok · Google
```

This page is for customers to return to later for:

```txt
ordering
scheduling/events
finding the vendor
following socials
Google Business/profile links
```

The previous “You’re connected” card was rejected and is removed visually by customer-links.js.

Current customer link params include:

```txt
order=
booking=
website=
instagram=
facebook=
tiktok=
google=
action1_label=
action1_url=
action2_label=
action2_url=
```

Vendor page files:

```txt
archetypes/claim/customer-links.js
assets/css/ropebridge/connected-cta.css
```

Important: improve this template next. The current template is better than before, but not final.

---

## Approved Claim Visual Design

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
Recognition line: 14px sans, rgba(63,63,59,0.62)
Vendor business name: 34px serif, 600 weight, tight line-height
RopeBridge corner seal: 76px × 76px
Offer title: 22px serif
```

Approved logo asset:

```txt
assets/images/ropebridge-wax-seal.svg
```

Important: use the current approved raster-style wax seal asset. Do not replace it with a generated line-art/vector-only seal.

---

## Approved Claim Create Page — Current

Create mirrors the Claim output rather than feeling like a detached form.

Approved Create layout:

```txt
[Instruction text]                         [wax seal]
[Editable vendor business name]
[Blue dashed editable sample section]
  [Claim-style card]
    [standard recognizable upload-image visual]
    [editable offer title at 22px]
    [editable description]
    [editable CTA]
    [noneditable limit note]
[Blue dashed customer links section]
  Website
  Order online
  Social profiles
    helper: Open your profile, tap Share, then paste the link here.
    Instagram
    Facebook
    TikTok
[Review card]
  [Preview page]
  [Submit for approval] only after preview opens
[inline preview panel]
```

Create currently supports:

```txt
website=
order=
instagram=
facebook=
tiktok=
```

Create must be updated later to support:

```txt
Redeem PIN / vendor PIN
booking / Schedule an Event
Google Business link
editable return action labels + URLs
```

Important Create principle:

```txt
Return Actions do not need to be overthought: use buttons and make the button text editable in Create.
```

Current approval behavior:

```txt
Submit for approval validates that business name and sample name are filled.
For current MVP, it copies the long draft Claim URL and shows submitted-for-approval status.
Vendor does not publish directly.
```

Do not reintroduce browser-side JSON config saving unless explicitly requested.

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

Storage bucket:

```txt
ropebridge-offer-images
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

## Product Wrappers / Sales Concepts

SamplePass:

```txt
Farmers market / vendor samples.
Uses Claim.
Code shorthand: sp.
Public sample pages can use readable sequential QR URLs because the shared page data is public marketing material.
Current flow: Claim → Redeem → Vendor, with Add Phone/Connect still needing redesign.
```

WinePassport:

```txt
Winery tasting, upgrade, route, or passport wrapper.
If it is only “claim upgrade,” it still uses Claim.
If it becomes multi-stop passport progress, it may need a distinct passport-progress layer later.
Code shorthand: wp.
Security tier: medium. Prefer readable + random URLs for live printed assets because upgrades/offers can be abused.
```

DoneLoop:

```txt
Provider workflow concept for “work done → payment → next visit / receipt / scheduling.”
Likely service-provider territory/niche QR codes.
Code shorthand: dl.
Security tier: high. DoneLoop involves payments/invoices/customer work records, so use random/authenticated access.
```

Handshake:

```txt
Contact / relationship capture.
Code shorthand: hs.
Security tier: high.
```

Remember:

```txt
Save preference / retrieve later.
Code shorthand: rm.
Security tier: medium/high depending on sensitivity.
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
Meta/Facebook/Instagram OAuth login
```

QR ordering is currently a Vendor page link, not a separate archetype.

WinePassport is not a separate archetype unless it adds multi-stop passport/check-in progress. Simple “claim upgrade” belongs under Claim.

---

## Current Known Issues / Things To Check

If Chrome Android makes the page look tiny, check:

```txt
Chrome menu → Desktop site
```

Potential next work, in current order:

```txt
1. Discuss whether Redeem should include “add phone number” section + brief explanation of why.
2. Make the Vendor template better.
3. Fix existing Add Phone / Connect page.
4. Update Create to support vendor-selected Redeem PIN.
5. Update Create to support booking/google/action labels and URLs.
6. Test custom-domain SamplePass child routes after deploy.
7. Verify all printed QR routes exist before laminating/using them in the field.
8. Decide whether Submit for approval should insert into public.claim_submissions or stay manual/copied-link for now.
9. Build a separate admin approval/redirect/shortener layer after Create is stable.
10. Confirm public.interactions inserts land in Supabase from several Claim test vendors.
11. Do light security hardening after MVP testing.
12. Build Handshake and Remember after Claim/Create are stable.
```

---

## Rules for Future AI / Codex Work

Preserve:

```txt
RopeBridge as top-level product name
Claim / Handshake / Remember archetype model
current approved Claim visual design
current Claim → Redeem → Vendor direction
Redeem screen simplicity: wax seal, one sentence, 4 PIN boxes, incorrect-code error only
Vendor page concept: vendor name, return action buttons, quiet social links
cream / olive / brass visual direction
approved wax seal asset at assets/images/ropebridge-wax-seal.svg
Create mirrors Claim with editable vendor name and editable Claim-style card
Create image upload happens by tapping the image card, not a separate field
Create uses the standard recognizable upload-image placeholder visual
Create uses true placeholder text
Create uses blue dashed editable section groups
Create uses Preview page → Submit for approval
long draft URL fallback remains stable
public.interactions table model
browser insert-only posture for database rows
static-first implementation unless explicitly changed
physical QR URLs should be short, stable /go/ child routes
/go/ itself is not for printing; print only specific child routes
SamplePass readable sequential QR style is approved
security tiers: SamplePass low, WinePassport medium, Handshake/DoneLoop high
```

Do not:

```txt
expose service_role
add dark mode to active Claim
reintroduce SamplePass as platform name
copy old prototype routes
rename old lead_requests table
replace the approved wax seal asset with line art or a different generated mark
replace the approved card-based Claim layout with a stripped-down direct image/title layout
rebuild the create page into a traditional form
auto-readd category or separate image upload fields to Create
show QR/export tools before approval
reintroduce browser-side JSON config saving without explicit approval
add dashboard/auth/server complexity without explicit approval
add Meta/Facebook/Instagram OAuth just to capture public profile links
turn Redeem into a fake OTP/SMS verification screen
add a required manual Redeem button tap after the 4th PIN digit
```

Keep changes small, inspectable, and compatible with static deployment.
