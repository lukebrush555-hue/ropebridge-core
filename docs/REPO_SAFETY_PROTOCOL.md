# RopeBridge Repo Safety Protocol

_Last updated: 2026-05-30_

## Purpose

This protocol protects RopeBridge from accidental destructive edits, especially when AI-assisted tools are modifying the repository.

Operating rule:

```txt
Protect first.
Prove second.
Edit third.
Inspect fourth.
Merge last.
```

## Source hierarchy

Use this order when deciding repo safety practices:

1. Official GitHub documentation for branch protection, pull requests, releases, and repository controls.
2. Official Git documentation for branches, stable branches, topic branches, and recovery concepts.
3. Established engineering practice for small commits, PR review, and release snapshots.
4. RopeBridge-specific lessons from prior mistakes.
5. User preference for naming and workflow friction.

## Branch roles

```txt
main = stable, approved work only
feature/* = active work
docs/* or feature-* = documentation/protocol work
backup/* = restore point before risky work
golden/* = known-good approved product state
hotfix/* = emergency correction
```

`main` is not a workbench. Do not test write tools on `main`.

## Branch protection expectation for main

The `main` branch should be protected with these settings:

```txt
Require a pull request before merging: ON
Block force pushes: ON
Restrict deletions: ON
```

If practical, require status checks before merging. For a solo project, zero required approvals can still be useful because the pull request creates an inspection checkpoint before merge.

## Standard change pathway

For meaningful app/code/design changes:

```txt
1. Confirm the current state is healthy enough to preserve.
2. Create a backup branch before risky work.
3. Create a feature branch.
4. Make small commits only.
5. Inspect the diff.
6. Test the relevant page or flow.
7. Merge only after approval.
8. Update NEWCHAT.md last, after the decision is approved.
```

## Critical files

Treat these as protected-by-process:

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

Rules for critical files:

```txt
No test writes.
No direct full replacement on main.
No full replacement without a backup branch and file-level backup.
No partial backup pretending to be complete.
No edits without reading the current file first.
```

## NEWCHAT.md handling

`NEWCHAT.md` is a critical operating document.

Before replacing or heavily editing it:

```txt
1. Create a backup branch.
2. Create a feature branch.
3. Create a file-level backup copy under docs/backups/NEWCHAT/ if the full current file body is available.
4. Edit NEWCHAT.md only on the feature branch.
5. Inspect the diff before merge.
6. Provide the full updated NEWCHAT.md text after approval so the local CRITICAL copy can be updated.
```

If the full current file body cannot be retrieved safely, do not perform a full replacement.

## File-level backups

Use this pattern:

```txt
docs/backups/NEWCHAT/NEWCHAT_YYYY-MM-DD_before-description.md
```

For local redundancy, the user keeps a separate local safety copy under:

```txt
CRITICAL/
```

When `NEWCHAT.md` changes, provide the updated full text so the local `CRITICAL` copy can be updated.

## Golden savepoints

Golden branches mark known-good approved states. They are not working branches.

Use golden branches for customer-facing states that are approved and worth preserving before future risky work.

Current golden branch:

```txt
golden/connect-approved
```

Meaning:

```txt
Known-good approved Connect/Add Phone customer-facing state.
```

## Current doc backup branch

Current branch backup before NEWCHAT.md doc work:

```txt
backup/newchat-before-connect-doc-update
```

Meaning:

```txt
Recoverable repo state before updating NEWCHAT.md with the approved Connect/Add Phone and repo safety protocol notes.
```

## Branch naming

Approved patterns:

```txt
backup/YYYY-MM-DD-before-description
feature/description
feature-description
docs/description
golden/approved-state
hotfix/description
```

Use simpler branch names when tooling rejects slash-based branch names.

## Commit discipline

Small commits only.

Good:

```txt
Update Connect page copy
Remove duplicate Connect helper copy
Document approved Connect copy
Add repo safety protocol
```

Bad:

```txt
Update app
Fix everything
Big changes
```

## Diff inspection checklist

Before merge, inspect:

```txt
What files changed?
Did any unrelated file change?
Did any secrets appear?
Did generated or accidental changes appear?
Does the diff match the request?
Does the live page or relevant flow still work?
Does NEWCHAT.md need an update after approval?
```

## Recovery rule

If a change goes wrong:

```txt
Stop.
Do not stack more fixes blindly.
Identify the last known-good branch or commit.
Compare diff.
Restore deliberately.
Document what happened.
```
