# Security

RopeBridge treats the browser as untrusted.

## Keys

The Supabase publishable key may appear in browser configuration only when Row Level Security is correct.

The Supabase `service_role` key must never be committed, shipped to the browser, pasted into example configs, or used in static pages.

## Database Access

`public.interactions` has RLS enabled.

The anon role is granted insert-only access through a single insert policy. There are no anon select, update, or delete policies.

The authenticated role receives no broad default access in this foundation.

The service role is intended for trusted server-side or admin operations only.

## Browser Behavior

The Claim app inserts one interaction row. It does not read from Supabase, update records, delete records, expose database errors to visitors, or implement auth.

## Known MVP Risk

A public insert endpoint can receive spam. This is acceptable for the early static foundation, but production deployments should monitor volume and abuse.

Future hardening ideas include rate limiting through an edge function, CAPTCHA or turnstile challenges for higher-risk campaigns, server-side validation, campaign allowlists, origin checks, bot detection, and vendor-facing admin tools that use trusted server-side credentials.
