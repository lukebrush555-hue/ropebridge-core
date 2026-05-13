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

## Future Archetypes

Handshake means: "I want the relationship."

Remember means: "Remember this for next time."

Both are documented as placeholders in `archetypes/handshake/` and `archetypes/remember/`.

## Local Usage

Open `archetypes/claim/index.html` in a browser, or serve the repository root with any static file server.

The demo config lives at `configs/examples/claim-samplepass-demo.js` and sets `window.ROPEBRIDGE_CONFIG`. SamplePass is only an example Claim configuration; RopeBridge is the platform name.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`, or apply `supabase/migrations/202605130001_init_interactions.sql`.
3. Copy `configs/examples/claim-samplepass-demo.js` for your campaign.
4. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_PUBLISHABLE_KEY` with your project URL and publishable key.

## Security Model

The browser is untrusted. It may use only the Supabase publishable key.

RLS is enabled on `public.interactions`. The anon role receives insert-only access. There are no browser reads, updates, deletes, dashboard views, admin flows, or auth assumptions in this foundation.

Never commit a Supabase `service_role` key.

## GitHub Pages

For GitHub Pages, deploy from the repository root and use:

`/ropebridge-core/archetypes/claim/`

The Claim page references shared assets and the example config with relative paths, so it can be hosted as a static site.
