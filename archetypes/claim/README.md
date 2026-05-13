# RopeBridge Claim

Claim is the first implemented RopeBridge archetype: "I want the thing."

The current state flow is intentionally fixed:

1. On page load, check localStorage for `ropebridge-connected`, `ropebridge-name`, and `ropebridge-phone`.
2. If no saved visitor exists, show Connect.
3. If a saved visitor exists, skip Connect and show Claim immediately.
4. When Connect is submitted, save the visitor locally and move to Claim.
5. When Claim is submitted, insert one row into `public.interactions` and move to Connected.
6. Show the recognition message only for remembered visitors.

The browser uses only the Supabase publishable key. RLS must keep anon access insert-only.
