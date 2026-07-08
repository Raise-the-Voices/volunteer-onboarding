---
name: update-tasks
description: Turn source docs dumped in sources/ into onboarding task pages — add new tasks or update existing ones, keep the sidebar in sync, deploy. Use when Golda dumps onboarding/outreach docs into sources/ or asks to add or change volunteer tasks.
---

# Update onboarding tasks from source docs

You are editing the Raise the Voices volunteer onboarding guide. Read
`README.md` first — it has the page pattern and writing rules. This skill adds
the rules for turning Golda's dumped docs into pages.

## Input

Source docs live in `sources/` (gitignored — they may contain private contact
info and internal process; they are input, never published). If the user
didn't name a specific doc, list `sources/` and confirm which doc(s) to
process before writing anything.

## Extraction rules

1. **Small tasks only.** The audience is new nontechnical volunteers. Pull out
   the smallest discrete actions a beginner can complete in one sitting —
   things that get them warmed up and talking to each other. If a doc is one
   big advanced process (e.g. landing a meeting with a senator), do NOT expand
   it into pages — link it from an "Advanced" pointer page (see
   `outreach/meeting-officials.md`) and, if possible, extract one or two
   beginner-sized pieces of it as their own tasks.

2. **Use Golda's / the team's own words.** Quote or lightly edit the source
   doc. Never rewrite into marketing voice, never pad, never invent process
   steps that aren't in the doc. If a step is unclear or missing (a link, a
   contact, which chat), leave a marker: `*[FILL IN: what's missing]*` —
   do not guess.

3. **Fill existing gaps first.** Before creating a new page, grep the content
   for `FILL IN` — if the doc answers an existing gap (ally accounts, calendar
   link, example searches, team leads…), fill that gap in place.

4. **Every task links out and ends social.** The doing happens in the real
   tool (always a link); the page keeps only instructions and checkboxes. Where
   the source allows, the last step shares something with the team.

## Page mechanics

- One task = one `.md` file in the matching section directory: `start/`,
  `warmup/`, `work/`, `outreach/`, `teams/`, `finish/`. New section
  directories only if the user asks for one (e.g. per-team tracks under
  `teams/`).
- Follow the page pattern in `README.md` (Goal / checkbox steps / Done when /
  tips). Internal links root-relative ending in `.md`.
- Add every new page to `_sidebar.md` or it won't appear. Keep sidebar order =
  the order volunteers should do things; the Previous/Next footer follows it.

## Don't break saved progress

Checkbox state is stored per browser, keyed by **page path + checkbox
position**. When editing an existing page:

- Append new checkboxes after the existing ones; don't reorder or insert
  between them.
- Don't rename or move existing page files unless the user asks — a rename
  resets everyone's progress on that page (say so in the commit message if it
  happens).
- Rewording a checkbox's text is safe.

## Finish

1. `grep -rn "FILL IN" --include="*.md" .` — report remaining gaps to the user.
2. Commit with a message saying which source doc(s) the change came from;
   push.
3. `./deploy.sh`, then verify the live page renders (fetch a changed page's
   `.md` from https://demos.linkedtrust.us/rtv-onboarding/ and spot-check).
4. Report: pages added/changed, which text is verbatim/lightly edited from the
   source vs. AI-drafted scaffolding, and the remaining FILL IN list.
