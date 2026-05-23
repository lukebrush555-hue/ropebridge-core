# AI/Codex Rules

Preserve the current state flow:

1. On page load, check localStorage for remembered visitor keys.
2. If no saved visitor exists, show Connect.
3. If a saved visitor exists, skip Connect and show Claim immediately.
4. On Connect submit, save the visitor locally and move to Claim.
5. On Claim submit, insert one interaction into Supabase and move to Connected.
6. Show the recognition message only for remembered visitors.

Do not expose or commit Supabase `service_role` keys.

Do not add dark mode or `prefers-color-scheme` dark styling to the active Claim flow. Force the approved light cream, olive, and brass RopeBridge theme.

Do not reintroduce SamplePass as the top-level product name. SamplePass may appear only as an example configuration of Claim.

Do not copy old prototype routes, old branches, old visual experiments, old prototype notes, or obsolete SamplePass-specific product naming.

## Claim Create Page Rules

The Claim create page already exists:

```txt
archetypes/claim/create/index.html
archetypes/claim/create/create.js
```

Do not rebuild the create page.

The current create page intentionally uses a fill-in-the-blank visual editing model. Preserve that model.

The image upload field already exists. The current limitation is that it previews locally only through `URL.createObjectURL(file)`. The correct next implementation is to wire the existing image input to Supabase Storage bucket `ropebridge-offer-images`, then inject the returned public image URL into the generated Claim link and QR code.

Do not add a dashboard, admin panel, heavy auth, server framework, or Vercel function for this unless explicitly requested.

## Repo Cleanup Rules

Do not delete files from `main` during cleanup unless a reference search has confirmed they are unused and the deletion is explicitly requested.

Known cleanup candidates:

```txt
configs/examples/claim-samplepass-demo.js
configs/examples/claim-samplepass-demo-local.js
assets/images/samplepass-stand.jpg
```

These are candidates because config naming and image references are currently confusing. They are not automatically safe to delete.

Before deleting any config or asset:

1. Confirm which file is imported by `archetypes/claim/index.html`.
2. Search references across README, NEWCHAT, app files, config files, and CSS.
3. Update documentation/imports first.
4. Delete only after the active path is clear.

Keep changes small and inspectable. Prefer static HTML, CSS, and JavaScript unless explicitly told otherwise.
