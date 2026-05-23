# RopeBridge

RopeBridge turns physical QR scans into remembered vendor/customer interactions.

It is like Linktree for physical-world relationships, but action-based and recognition-aware. The foundation is intentionally static: HTML, CSS, JavaScript, a configuration object, and a small Supabase table.

## Current Archetype: Claim

Claim means: "I want the thing."

The implemented Claim flow is:

1. Check localStorage for `ropebridge-connected`, `ropebridge-name`, and `ropebridge-phone`.
2. If no saved visitor exists, show Connect.
3. If a saved visitor exists, skip Connect and show Claim.
4. Save the visitor locally on Connect submit.
5. Insert one row into `public.interactions` on Claim submit.
6. Move to Connected after a successful insert.

Recognition copy appears only for remembered visitors.

Live route:

```txt
/ropebridge-core/archetypes/claim/
```

## Claim Create Page

The vendor-facing create page exists at:

```txt
/ropebridge-core/archetypes/claim/create/
```

Files:

```txt
archetypes/claim/create/index.html
archetypes/claim/create/create.js
```

The create page is intentionally a fill-in-the-blank visual editor. It currently supports editable offer copy, vendor fields, image selection, generated Claim URL, QR code generation, and copy-link behavior.

Important current limitation: the image selector currently previews the image locally only. The generated Claim link still uses the placeholder image until `create.js` is wired to upload the selected image to Supabase Storage and inject the returned public image URL into the generated link.

Do not rebuild the create page to solve image upload. Wire the existing image input to Storage.

## Current Config Status

The active Claim page currently imports:

```txt
configs/examples/claim-samplepass-demo-local.js
```

There is also a similar example config:

```txt
configs/examples/claim-samplepass-demo.js
```

This duplicated naming is a cleanup candidate. Do not delete either config until the active import path and documentation have been standardized.

SamplePass is only an example Claim configuration; RopeBridge is the platform name.

## Future Archetypes

Handshake means: "I want the relationship."

Remember means: "Remember this for next time."

Both are documented as placeholders in `archetypes/handshake/` and `archetypes/remember/`.

## Local Usage

Open `archetypes/claim/index.html` in a browser, or serve the repository root with any static file server.

For GitHub Pages, use:

```txt
/ropebridge-core/archetypes/claim/
```

For the create page, use:

```txt
/ropebridge-core/archetypes/claim/create/
```

## Supabase Setup

Current project:

```txt
qr-intake-core
project ref: chqwqnxxggswbsijxnio
```

The main RopeBridge table is:

```txt
public.interactions
```

Apply `supabase/schema.sql`, or apply `supabase/migrations/202605130001_init_interactions.sql`, when recreating the table in a fresh environment.

The current MVP image-upload bucket is:

```txt
ropebridge-offer-images
```

It is intended for public vendor offer/sample images uploaded from the Claim create page.

## Security Model

The browser is untrusted. It may use only the Supabase publishable key.

RLS is enabled on `public.interactions`. The anon role receives insert-only access. There are no browser reads, updates, deletes, dashboard views, admin flows, or auth assumptions in this foundation.

For the current MVP Storage bucket, anonymous browser upload/read is allowed only for `ropebridge-offer-images`. This is a prototype shortcut and should be hardened before production use.

Never commit a Supabase `service_role` key.

## GitHub Pages

GitHub Pages is deployed from the repository root.

The Claim page references shared assets and the active example config with relative paths, so it can be hosted as a static site.
