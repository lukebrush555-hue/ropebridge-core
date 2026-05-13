# Project Context

RopeBridge is a physical-to-digital interaction layer for QR scans that happen in the real world: markets, booths, counters, shops, service desks, and product packaging.

The product is built around recognition continuity. A visitor who has connected before should be treated as remembered, not anonymous, without introducing heavy auth or a dashboard before the product needs one.

The foundation is "bones + config": reusable static interaction bones, configured per campaign. The active foundation should stay small, readable, and easy to inspect.

RopeBridge is not a generic SaaS dashboard. It should feel physical-world, premium, quiet, and specific to boutique packaging and vendor/customer rituals. Avoid dashboard patterns, dark app themes, generic QR tooling, and broad platform chrome in the active Claim flow.

The browser is untrusted. Browser code can create an interaction, but it should not read interaction records, update them, delete them, or carry privileged keys.

The current implementation favors static HTML/CSS/JS until there is a clear product reason to add a build system, framework, auth system, admin panel, or server layer.
