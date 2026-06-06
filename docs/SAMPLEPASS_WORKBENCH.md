# SamplePass Workbench

_Last updated: 2026-06-06_

## Purpose

This is the active working document for SamplePass / RopeBridge Claim work.

It is allowed to be messy.

Use this file for:

```txt
next steps
unresolved decisions
current complications
in-progress plans
not-final decisions
status tracking
tool / GitHub friction
```

Do not treat this file as the finalized startup map.

Use:

```txt
NEWCHAT.md = finalized start-here map
docs/SAMPLEPASS_WORKBENCH.md = active workbench / messy truth
docs/REPO_SAFETY_PROTOCOL.md = safety source of truth
docs/PRE_CODE_CHECKLIST.md = required pre-edit gate
```

When something becomes implemented, tested, approved, and worth preserving, summarize the durable truth in `NEWCHAT.md` and consider creating a golden savepoint.

---

## Status Labels

Use this fixed set unless deliberately changed:

```txt
Unstarted
Discussing
Planned
In Progress
Implemented
Testing
Approved
Finalized
Archived
```

Definitions:

```txt
Approved = the decision/design is accepted.
Finalized = implemented, tested, documented in NEWCHAT.md, and protected by an appropriate golden savepoint if needed.
```

---

## Current Status Table

| Area | Status | Source of Truth | Golden Savepoint | Notes |
|---|---|---|---|---|
| Repo Safety Protocol | Approved | docs/REPO_SAFETY_PROTOCOL.md | none | Durable safety doctrine. Rarely edited. |
| Pre-Code Checklist | Implemented | docs/PRE_CODE_CHECKLIST.md | none | Added on docs-pre-code-checklist branch; pending review/merge. |
| Workbench Document | In Progress | docs/SAMPLEPASS_WORKBENCH.md | none | This document. |
| NEWCHAT.md | Needs update | NEWCHAT.md | none | Should become short finalized startup map after supporting docs exist. |
| Claim Flow | Needs documentation cleanup | Workbench until promoted | none | Current flow: Scan → Claim → Redeem PIN → Vendor page. |
| Redeem Page | Implemented / likely approved | Workbench until promoted | proposed: golden/redeem-pin-approved | Needs decision whether finalized enough for NEWCHAT + golden. |
| Vendor Page | In Progress | Workbench | proposed: golden/vendor-page-approved | Next major product/design target. |
| Create Page | In Progress | Workbench | proposed: golden/create-page-approved | Needs PIN/image/actions/link fields clarified and finalized. |
| Add Phone / Connect | Approved copy, unresolved placement | Workbench | golden/connect-approved | Do not insert into active flow without explicit approval. |

---

## Current Flow Truth

Current active flow to preserve:

```txt
Scan → Claim → Redeem PIN → Vendor page
```

Returning same-offer behavior under discussion/documentation cleanup:

```txt
Returning same offer:
Scan → Vendor page

New offer:
Scan → Claim → Redeem PIN → Vendor page
```

Old stale flow to avoid resurrecting:

```txt
Connect → Claim → Connected
```

---

## Active Workbench Items

### 1. Repo / Document Safety System

Status: `In Progress`

Current items:

```txt
Create docs/PRE_CODE_CHECKLIST.md
Create docs/SAMPLEPASS_WORKBENCH.md
Update NEWCHAT.md after supporting docs exist
Keep docs/REPO_SAFETY_PROTOCOL.md mostly stable
```

Rules:

```txt
docs/REPO_SAFETY_PROTOCOL.md = doctrine / constitution
docs/PRE_CODE_CHECKLIST.md = working gate / cockpit checklist
NEWCHAT.md = finalized start-here map
docs/SAMPLEPASS_WORKBENCH.md = active messy working doc
```

Open questions:

```txt
Exact final shape of NEWCHAT.md
When to merge documentation branch
Whether to create a golden savepoint after doc system is stable
```

---

### 2. Vendor Page

Status: `In Progress`

Current direction:

```txt
Vendor page = clean return-utility page for customers after redeeming
```

Known requirements:

```txt
Vendor name
Return action buttons
Social icons
Subtle powered-by footer
No “You’re connected” header
No clutter
No RopeBridge explanation
```

Likely/default return actions:

```txt
Order Online
Schedule an Event
```

Likely social / discovery links:

```txt
Instagram
Facebook
TikTok
Google / Google Business
Website
```

Open issues:

```txt
Which actions are default?
How many actions should show before clutter?
Button style and hierarchy
Whether phone/contact belongs here
How website/order/schedule/contact links should be named
Whether vendor logo/image appears on this page
How subtle powered-by footer should look
```

Do not resurrect:

```txt
“You’re connected” as a large header
RopeBridge explanation copy
Claim/redeem language on the return page
Cluttered form-like layout
```

---

### 3. Redeem Page

Status: `Implemented / likely approved`

Current behavior:

```txt
Centered wax seal logo
“Ask vendor for PIN to redeem.”
4 standard PIN boxes
No Redeem button
Auto-check after 4th digit
Correct PIN → Vendor page
Incorrect PIN → error and clear boxes
```

Approved incorrect-code copy:

```txt
Incorrect code. Ask the vendor to confirm the PIN.
```

Workbench action:

```txt
Decide whether this is finalized enough for NEWCHAT.md + golden/redeem-pin-approved.
```

Open issue:

```txt
Whether Redeem should ever include phone capture or whether phone capture must remain separate/optional.
```

Protection rule:

```txt
Do not add phone capture to Redeem without explicit approval.
```

---

### 4. Add Phone / Connect Page

Status: `Approved copy, unresolved placement`

Approved copy exists, but final placement is unresolved.

Known copy direction:

```txt
Headline: Scan the QR code. Get the thing.
Subhead: No passwords. No profiles. No problems.
Fields: First name, Phone number.
Checkbox: I understand my number is only shared with a vendor when I redeem their offer.
Button: Continue. Button text may change later.
```

Open placement question:

```txt
Does phone capture belong before Claim, inside Redeem, after Redeem, on Vendor page, or as a separate optional step?
```

Protection rule:

```txt
Do not insert phone capture into the active Claim → Redeem → Vendor flow without explicit approval.
```

Known golden:

```txt
golden/connect-approved
```

Meaning:

```txt
Known-good approved Connect/Add Phone customer-facing state.
```

---

### 5. Create Page

Status: `In Progress`

Known active needs:

```txt
Vendor chooses custom 4-digit PIN/code
Vendor can configure return actions
Vendor can add booking / Google / social links
Vendor can upload/change image
Immediate link / QR generation remains important
```

Current known direction:

```txt
Creation flow should feel like filling in the end page, not like a generic form.
Preview should resemble the customer-facing output.
Image upload can use standard upload behavior because vendors understand it.
```

Open issues:

```txt
How many return actions are editable?
Whether website and online ordering are separate fields
How to represent Google Business link
How to avoid clutter while still collecting needed links
Whether create page needs separate sections for Claim, Redeem, and Vendor output
```

---

### 6. Claim Page / Flow Documentation

Status: `Needs documentation cleanup`

Current flow to document:

```txt
Scan → Claim → Redeem PIN → Vendor page
```

Old stale assumptions to remove or clearly mark as legacy:

```txt
Connect → Claim → Connected
SamplePass as top-level platform identity
“You’re connected” as final state language
Dark app/dashboard style
```

Workbench action:

```txt
After PRE_CODE_CHECKLIST.md and SAMPLEPASS_WORKBENCH.md are merged, update NEWCHAT.md as a short finalized startup map.
```

---

### 7. Golden Savepoints

Status: `Planned / needs decisions`

Known existing golden:

```txt
golden/connect-approved
```

Potential future golden branches:

```txt
golden/redeem-pin-approved
golden/vendor-page-approved
golden/create-page-approved
golden/docs-safety-system-approved
```

Rules:

```txt
Golden branches are known-good approved states.
Golden branches are not working branches.
Golden branches are not backup branches.
Create golden branches only after approval.
```

---

## Tool / GitHub Friction Log

Purpose:

```txt
Track repeated tool failures and safe workarounds so future repo edits waste less time and create less risk.
```

| Date | Task | Failure | Likely Cause | Safe Workaround | Rule Going Forward |
|---|---|---|---|---|---|
| 2026-06-06 | Create PRE_CODE_CHECKLIST.md | `create_file` failed on non-existent branch | Branch had not been created first | Create/confirm branch before `create_file` | Always create/confirm work branch before file writes |
| 2026-06-06 | Create PRE_CODE_CHECKLIST.md | Slash-style branch write path was blocked | Tool friction with `docs/...` branch style | Use simple branch name | Prefer `docs-pre-code-checklist` style when tooling complains |
| 2026-06-06 | NEWCHAT.md update planning | Safe surgical edit unavailable | Tool required full-file replacement | Treat as full replacement | Existing critical docs require backup branch + file-level backup + diff |
| 2026-06-06 | Create PRE_CODE_CHECKLIST.md | Write blocked by sensitive-key wording | Safety filter rejected exact secret-key phrase | Use generalized credential categories | Use “privileged database keys / server-only credentials” |
| 2026-06-06 | Find latest commit | Commit search failed | GitHub search rejected qualifier-only query | Use actual search text or fetch known ref | Do not use qualifier-only commit searches |

Rule:

```txt
Before GitHub repo edits, after reading PRE_CODE_CHECKLIST.md, check this friction log if GitHub tools will be used.
```

---

## Do Not Resurrect

Do not bring these back unless explicitly requested:

```txt
Old Connect → Claim → Connected flow as active truth
“You’re connected” Vendor page header
Dark mode Claim styling
SamplePass as top-level platform name
Old qr-intake-system routes as production routes
Top vendor text on Claim page
SAMPLEPASS eyebrow
Cluttered SaaS/dashboard UI
Phone capture inserted into flow without approval
```

---

## Promotion Rules

A workbench item may graduate into `NEWCHAT.md` only when it is:

```txt
implemented
reviewed/tested
approved
stable enough to preserve
summarized without bloating NEWCHAT.md
```

When promoted:

```txt
1. Summarize durable truth in NEWCHAT.md.
2. Remove or archive stale workbench detail.
3. Consider whether a golden savepoint is warranted.
4. Update local CRITICAL copy if NEWCHAT.md changes.
```

Do not promote unresolved decisions into `NEWCHAT.md` as final truth.
