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

Keep changes small and inspectable. Prefer static HTML, CSS, and JavaScript unless explicitly told otherwise.
