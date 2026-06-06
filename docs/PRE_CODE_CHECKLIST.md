# Pre-Code Checklist

_Last updated: 2026-06-06_

## Purpose

This checklist must be read before any repo edit.

It exists to force active use of:

```txt
docs/REPO_SAFETY_PROTOCOL.md
```

This file does not replace the repository safety protocol.  
It is the visible pre-edit gate that proves the protocol was read and applied.

---

## Required Identifier Phrase

Before any repo edit, the assistant must visibly say:

```txt
reading checklist before changing the repo
```

If this exact phrase is not shown before repo-edit work begins, the user should stop the process manually.

No phrase, no edit.

---

## Controlling Rule

The controlling rule from `docs/REPO_SAFETY_PROTOCOL.md` is:

```txt
Protect first.
Prove second.
Edit third.
Inspect fourth.
Merge last.
```

This checklist must be completed in that order.

Do not compress this rule into a vague summary.

---

## 1. Source Protocol Check

Before any repo edit, read or re-read:

```txt
docs/REPO_SAFETY_PROTOCOL.md
```

Do NOT skim. Read it in entirety.

Required visible answer:

```txt
RSP read for this change: yes/no
```

Stop condition:

```txt
If RSP has not been read COMPLETELY for this change, stop.
```

---

## 2. Source Hierarchy Check

When deciding repo safety practices, use this hierarchy:

```txt
1. Official GitHub documentation
2. Official Git documentation
3. Established engineering practice
4. Project-specific lessons from prior mistakes
5. User preference for naming and workflow friction
```

Required visible answer:

```txt
Safety source hierarchy checked: yes/no
```

Stop condition:

```txt
If the process conflicts with RSP or the source hierarchy, stop.
```

---

## 3. Target File Declaration

Before edits, declare every target file.

Required visible answer:

```txt
Target file(s):
- 
```

Also declare the change type:

```txt
Change type:
- code
- documentation
- configuration
- database/Supabase
- deployment/GitHub Pages
- design/UI
- asset/image
- security/secrets
- other
```

Stop condition:

```txt
If the target file(s) are unclear, stop.
```

---

## 4. Critical File Classification

Critical files are defined by `docs/REPO_SAFETY_PROTOCOL.md`.

Do not maintain a separate competing critical-file list here.

Known RopeBridge critical files currently include:

```txt
NEWCHAT.md
README.md
PROJECT_CONTEXT.md
AGENTS.md
SECURITY.md
archetypes/claim/index.html
archetypes/claim/app.js
archetypes/claim/create/create.js
go/registry.js
.github/workflows/*
```

Required visible answer:

```txt
Critical file involved: yes/no
Reason:
```

Stop condition:

```txt
If a critical file is involved and the critical-file workflow is not being used, stop.
```

---

## 5. Branch Role Declaration

Branch roles from RSP:

```txt
main = stable, approved work only
feature/* = active work
docs/* or feature-* = documentation/protocol work
backup/* = restore point before risky work
golden/* = known-good approved product state
hotfix/* = emergency correction
```

Required visible answer:

```txt
Current base branch:
Work branch:
Backup branch if needed:
Golden branch involved: yes/no
```

Rules:

```txt
main is not a workbench.
backup/* is not a workbench.
golden/* is not a workbench.
```

Stop condition:

```txt
If the work would edit main directly, stop.
If a backup branch is being used as a work branch, stop.
If a golden branch is being used as a work branch, stop.
```

---

## 6. Main Branch Protection Check

Expected protection for `main`:

```txt
Require a pull request before merging: ON
Block force pushes: ON
Restrict deletions: ON
```

Required visible answer:

```txt
Main protected from direct/risky edits: yes/no/unknown
```

Stop condition:

```txt
If the proposed process bypasses PR/diff inspection for a meaningful or critical change, stop.
```

---

## 7. Standard Change Pathway

For meaningful app/code/design changes, follow:

```txt
1. Confirm the current state is healthy enough to preserve.
2. Create a backup branch before risky work.
3. Create a feature branch.
4. Make small commits only.
5. Inspect the diff.
6. Test the relevant page or flow.
7. Merge only after approval.
8. Update project documentation last, after the decision is approved.
```

Required visible answer:

```txt
Current state healthy enough to preserve: yes/no/unknown
Backup branch needed: yes/no
Feature branch planned:
Relevant page/flow to test:
Documentation update needed after approval: yes/no
```

Stop condition:

```txt
If current state is not healthy enough to preserve, stop and diagnose.
If meaningful app/code/design work has no feature branch plan, stop.
```

---

## 8. Critical-File Rules

For critical files, RSP requires:

```txt
No test writes.
No direct full replacement on main.
No full replacement without a backup branch and file-level backup.
No partial backup pretending to be complete.
No edits without reading the current file first.
```

Required visible answer:

```txt
Critical-file workflow required: yes/no
Current file read before editing: yes/no
Backup branch:
Feature/docs branch:
File-level backup path:
Full replacement required: yes/no
```

Stop condition:

```txt
If the current file has not been read, stop.
If full replacement is required and no backup branch exists, stop.
If full replacement is required and no file-level backup exists, stop.
If only a partial backup exists, stop.
```

---

## 9. Startup / Context Document Workflow

Startup/context documents include files that tell future sessions how to understand the project.

Examples:

```txt
NEWCHAT.md
PROJECT_CONTEXT.md
AGENTS.md
handoff.md
startup.md
```

Before replacing or heavily editing a startup/context document:

```txt
1. Create a backup branch.
2. Create a feature branch.
3. Create a file-level backup copy if the full current file body is available.
4. Edit the document only on the feature branch.
5. Inspect the diff before merge.
6. Provide the full updated text after approval so the local redundant copy can be updated.
```

Required visible answer:

```txt
Startup/context doc involved: yes/no
Backup branch:
Feature/docs branch:
File-level backup path:
Full current body available: yes/no
Will updated full text be provided after approval: yes/no
```

Stop condition:

```txt
If the full current file body cannot be retrieved safely, do not perform a full replacement.
If local CRITICAL copy cannot be updated after approval, flag it before merge.
```

---

## 10. File-Level Backup Rule

Use this pattern:

```txt
docs/backups/{FILE_OR_TOPIC}/{FILE}_YYYY-MM-DD_before-description.md
```

Examples:

```txt
docs/backups/NEWCHAT/NEWCHAT_2026-06-06_before-startup-map-update.md
docs/backups/README/README_2026-06-06_before-restructure.md
```

Required visible answer:

```txt
File-level backup needed: yes/no
Backup path:
```

Stop condition:

```txt
If file-level backup is required and no exact backup path is stated, stop.
```

---

## 11. Full-Replacement Rule

If the available tool requires replacing an entire existing file:

```txt
Treat it as full replacement.
Do not call it a small edit.
```

Before full replacement:

```txt
1. Confirm backup branch exists.
2. Confirm feature/docs branch exists.
3. Confirm current file content has been read.
4. Confirm file-level backup path.
5. Prepare complete replacement.
6. Compare old vs new section-by-section.
7. Inspect GitHub diff.
8. Merge only after approval.
```

Required visible answer:

```txt
Tool requires full-file replacement: yes/no
If yes:
- backup branch exists:
- feature/docs branch exists:
- current file read:
- file-level backup path:
- section comparison planned:
- diff inspection planned:
```

Stop condition:

```txt
If full replacement is required and any item above is missing, stop.
```

---

## 12. Golden Savepoint Rule

Golden branches mark known-good approved states.

Pattern:

```txt
golden/approved-state-name
```

Examples:

```txt
golden/connect-approved
golden/create-page-approved
golden/vendor-page-approved
golden/redeem-pin-approved
```

Rules:

```txt
golden/* is not a working branch.
golden/* is not a backup branch.
Create golden/* only after the state is approved and worth preserving.
Do not edit golden/*.
```

Required visible answer:

```txt
Golden savepoint needed after this work: yes/no/maybe
Proposed golden branch name if approved:
```

Stop condition:

```txt
If the plan edits a golden branch, stop.
```

---

## 13. Documentation Promotion Rule

Project documentation should be updated last, after the decision is approved.

Workbench items do not automatically graduate into `NEWCHAT.md`.

Required visible answer:

```txt
Is this work finalized enough for NEWCHAT.md: yes/no
If no, should it stay in workbench/spec docs: yes/no
```

Rules:

```txt
NEWCHAT.md = finalized startup map.
Workbench/spec docs = active, messy, unresolved, or in-progress truth.
```

Stop condition:

```txt
If an unresolved decision is being promoted into NEWCHAT.md as final, stop.
```

---

## 14. Diff Inspection Checklist

Before merge, inspect:

```txt
What files changed?
Did any unrelated file change?
Did any secrets appear?
Did generated or accidental changes appear?
Does the diff match the request?
Does the live page or relevant flow still work?
Does project documentation need an update after approval?
```

Required visible answer:

```txt
Diff inspected: yes/no
Unexpected files changed: yes/no
Secrets exposed: yes/no
Generated/accidental changes: yes/no
Diff matches request: yes/no
Relevant page/flow tested: yes/no/not applicable
Docs update needed after approval: yes/no
```

Stop condition:

```txt
If the diff cannot be inspected, stop.
If secrets appear, stop.
If unrelated files changed, stop and explain.
If the diff does not match the request, stop.
```

---

## 15. Secret Safety Rule

Never expose or commit:

```txt
privileged database keys
server-only credentials
private API keys
admin tokens
personal credentials
```

Browser-safe values may include only intentionally public values protected by permissions/RLS, such as:

```txt
Supabase project URL
Supabase publishable/anon key
```

Required visible answer:

```txt
Secrets involved: yes/no
Public browser-safe keys involved: yes/no
RLS/permission assumption checked: yes/no/not applicable
```

Stop condition:

```txt
If secret safety is uncertain, stop.
```

---

## 16. Recovery Rule

If a change goes wrong:

```txt
Stop.
Do not stack more fixes blindly.
Identify the last known-good branch or commit.
Compare diff.
Restore deliberately.
Document what happened.
```

Required visible answer if something goes wrong:

```txt
Recovery mode active: yes
Last known-good branch/commit:
Bad change identified:
Restore plan:
```

Stop condition:

```txt
If a change goes wrong, do not continue piling on edits.
```

---

## 17. Required Pre-Edit Report

Before any repo edit, produce this visible report:

```txt
reading checklist before changing the repo

RSP read for this change:
Target file(s):
Change type:
Critical file involved:
Startup/context doc involved:
Current base branch:
Backup branch if needed:
Work branch:
File-level backup path if needed:
Tool requires full-file replacement:
Golden branch involved:
Approval point:
Stop conditions checked:
```

No visible report, no edit.

---

## 18. Final Permission Gate

Before editing, state the exact next action.

Required visible answer:

```txt
Next action:
```

Then wait for approval if the action involves:

```txt
critical files
startup/context documents
full-file replacement
security/secrets
branch protection
deployment/workflows
database/schema changes
routing changes
user-facing flow changes
```

Stop condition:

```txt
If approval is required and has not been given, stop.
```
