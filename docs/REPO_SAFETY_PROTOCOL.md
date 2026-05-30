# Repository Safety Protocol

_Last updated: 2026-05-30_

## Purpose

This protocol protects a repository from accidental destructive edits, especially when AI-assisted tools are modifying files.

It is meant to be reusable across projects. Project-specific branches, filenames, and local backup locations can be listed in a short addendum at the bottom.

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
3. Established engineering practice for small commits, pull request review, and release snapshots.
4. Project-specific lessons from prior mistakes.
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
8. Update project documentation last, after the decision is approved.
```

## Critical files

Each project should define its own critical files. These usually include:

```txt
startup/context docs
README.md
security docs
deployment files
workflow files
routing/registry files
core app entry files
core data/schema files
```

Examples:

```txt
NEWCHAT.md
README.md
PROJECT_CONTEXT.md
AGENTS.md
SECURITY.md
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

## Startup/context document handling

A startup/context document is any file that tells future work sessions how to understand the project.

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
6. Provide the full updated text after approval so any local redundant copy can be updated.
```

If the full current file body cannot be retrieved safely, do not perform a full replacement.

## File-level backups

Use this pattern:

```txt
docs/backups/{FILE_OR_TOPIC}/{FILE}_YYYY-MM-DD_before-description.md
```

Examples:

```txt
docs/backups/NEWCHAT/NEWCHAT_2026-05-30_before-connect-doc-update.md
docs/backups/README/README_2026-05-30_before-restructure.md
```

Local redundancy is also recommended for critical project instructions. Example:

```txt
CRITICAL/
```

When a critical startup/context document changes, provide the full updated text so the local redundant copy can be updated.

## Golden savepoints

Golden branches mark known-good approved states. They are not working branches.

Use golden branches for customer-facing states or functional states that are approved and worth preserving before future risky work.

Pattern:

```txt
golden/approved-state-name
```

Examples:

```txt
golden/connect-approved
golden/create-page-approved
golden/vendor-page-approved
```

## Backup branches

Backup branches are restore points before risky work.

Pattern:

```txt
backup/YYYY-MM-DD-before-description
backup/short-description
```

Examples:

```txt
backup/2026-05-30-before-newchat-update
backup/newchat-before-connect-doc-update
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
Does project documentation need an update after approval?
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

---

# Project Addendum: RopeBridge / SamplePass

Current repo:

```txt
lukebrush555-hue/ropebridge-core
```

Current golden branch:

```txt
golden/connect-approved
```

Meaning:

```txt
Known-good approved Connect/Add Phone customer-facing state.
```

Current doc backup branch:

```txt
backup/newchat-before-connect-doc-update
```

Meaning:

```txt
Recoverable repo state before updating project docs with the approved Connect/Add Phone and repo safety protocol notes.
```

Critical RopeBridge files include:

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

Local redundant copy location used by the user:

```txt
CRITICAL/
```

Rule:

```txt
When NEWCHAT.md changes, provide the full updated text so the local CRITICAL copy can be updated.
```
