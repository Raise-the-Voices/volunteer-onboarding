# Raise the Voices — Volunteer Onboarding Guide

Step-by-step onboarding for new RTV volunteers: little tasks with checkboxes,
links out to the real tools, an always-visible table of contents, and a
certificate at the end. Not an app — a guide.

**Live (dev):** https://demos.linkedtrust.us/rtv-onboarding/
**Audience:** nontechnical human rights volunteers, mostly young people.

## Editing content

Every page is a markdown file. Edit it, commit, push, deploy. No build step.

The fast path: dump your docs (Google Docs exports etc.) into `sources/` and
ask Claude to run `/update-tasks` — it extracts beginner-sized tasks and fills
`[FILL IN]` gaps using your wording, then deploys. `sources/` is gitignored:
source docs are never committed or published. The skill lives at
`.claude/skills/update-tasks/SKILL.md`.

- `_sidebar.md` — the table of contents. Add a page here or it won't show up.
- `welcome.md` — the home page.
- `start/`, `warmup/`, `work/`, `outreach/`, `teams/`, `finish/` — one file per task.

Page pattern (adapted from [Cooperation-org/onboarding](https://github.com/Cooperation-org/onboarding)):

```markdown
# Task name

One or two sentences of why.

**Goal:** one line.

- [ ] step
- [ ] step

**Done when:** observable evidence.

> Tips / clues.
```

Writing rules:

- Slim. Text, maybe one diagram. Link out to do the thing; the checkbox lives here.
- Every task should end with sharing something with the team — the point is to
  get volunteers talking to each other.
- `*[FILL IN: …]*` marks a gap that needs real content (links, contacts, the
  content from the onboarding Google Docs). Grep for `FILL IN` to find them all.
- Several pages are AI-drafted scaffolding (marked with HTML comments) — replace
  with the team's own words before pointing real volunteers at this.

Internal links must be root-relative and end in `.md`: `[text](/warmup/pick-your-issue.md)`.

## How it works

[docsify](https://docsify.js.org) v4.13.1 plus
[docsify-pagination](https://github.com/imyelo/docsify-pagination) v2.10.1
(the Previous/Next footer — it follows `_sidebar.md` order, no checkboxes
required), both vendored in `vendor/` (no CDN at runtime). `index.html` is the
whole configuration. `assets/progress.js` makes the markdown task-list
checkboxes clickable and persists them.

**Checkbox persistence is per-browser (localStorage), keyed by page path +
position.** Consequences:

- Progress doesn't follow a volunteer across devices.
- Reordering or inserting checkboxes on a page shifts saved state on that page.

That's the v1 scope: a guide, not an app. Planned later: tie completion to the
action engine / a LinkedTrust credential so the certificate is issued from real
data instead of a manual request.

## Deploy

Dev (VM 200): `./deploy.sh` rsyncs the site to `/var/www/demos/rtv-onboarding/`,
served at demos.linkedtrust.us/rtv-onboarding/. Registered in
`/opt/shared/cobox/app-registry.md`.

Final home TBD (likely under a raisethevoices.org domain, deploy by CI like
testimonies-world).
