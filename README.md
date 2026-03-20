# gstack

gstack is a skills-first workflow for AI coding agents. It packages planning, review,
QA, release, and browser-automation skills as Markdown-based agent skills plus a fast
headless browser tool.

This repository is the **`shelbeely/gstack` fork**. All install instructions and
upgrade paths in this fork point at `shelbeely/gstack`.

## What gstack gives you

- **Product and planning skills** like `office-hours`, `plan-ceo-review`,
  `plan-eng-review`, and `plan-design-review`
- **Execution and quality skills** like `review`, `qa`, `design-review`,
  `document-release`, and `ship`
- **A real browser tool** via `browse` for site QA, screenshots, and dogfooding
- **Safety / workflow tools** like `careful`, `freeze`, `guard`, `unfreeze`, and
  `gstack-upgrade`

## Supported hosts

- **GitHub Copilot Agent** via `.github/skills/`
- **Claude / Codex / Gemini CLI / Cursor-style SKILL.md hosts** via `.agents/skills/`

## Quick start for GitHub Copilot Agent

### Requirements

- [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills)
- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) v1.0+
- [Node.js](https://nodejs.org/) on Windows

### 1) Install gstack on your machine

```bash
git clone https://github.com/shelbeely/gstack.git ~/gstack
cd ~/gstack
./setup --host copilot
```

### 2) Optional: vendor the skills into the current repo

If you want teammates to get the same skills from the repository itself:

```bash
mkdir -p .github/skills
rsync -a --delete --exclude .git ~/gstack/.github/skills/ .github/skills/
cd ~/gstack
./setup --host copilot
```

### 3) Add a gstack section to `COPILOT.md`

Paste this into the relevant `COPILOT.md`:

```md
## gstack

GitHub Copilot automatically discovers matching gstack skills from `.github/skills/`.
In the GitHub Copilot Agent tab, invoke gstack by asking Copilot to use one of the skills listed below
in plain English. If your client exposes a `/skills` picker, you can use that too.

Use `/browse` from gstack for all web browsing and QA. Never use `mcp__claude-in-chrome__*`.

Available gstack skills:
- `/office-hours`
- `/plan-ceo-review`
- `/plan-eng-review`
- `/plan-design-review`
- `/design-consultation`
- `/review`
- `/ship`
- `/browse`
- `/qa`
- `/qa-only`
- `/design-review`
- `/setup-browser-cookies`
- `/retro`
- `/investigate`
- `/document-release`
- `/codex`
- `/careful`
- `/freeze`
- `/guard`
- `/unfreeze`
- `/gstack-upgrade`

If gstack skills are missing or stale, run `cd ~/gstack && ./setup --host copilot`
to rebuild binaries and refresh generated skills.
```

## Using gstack in the GitHub Copilot Agent tab

The gstack names above are the canonical skill names. Different hosts expose them
differently:

- **GitHub Copilot Agent tab:** ask in plain English and include the skill name, for example:
  “Use the gstack review skill on this branch.”
- **Hosts with slash-command UX:** invoke them directly as `/review`, `/qa`, `/ship`, etc.

Examples for the GitHub Copilot Agent tab:

- “Use the gstack `office-hours` skill to help me frame this product idea.”
- “Use the gstack `review` skill on the current branch.”
- “Use the gstack `qa` skill against `https://staging.example.com`.”
- “Use the gstack `browse` skill to inspect this page.”

If Copilot is not picking the skills up:

1. Re-run `cd ~/gstack && ./setup --host copilot`
2. Make sure the repo contains `.github/skills/` if you want repo-local discovery
3. Start a fresh Agent session

## Other hosts

For Codex / Cursor / Gemini CLI / other SKILL.md-style hosts:

```bash
git clone https://github.com/shelbeely/gstack.git ~/.codex/skills/gstack
cd ~/.codex/skills/gstack
./setup --host codex
```

Or let setup auto-detect:

```bash
git clone https://github.com/shelbeely/gstack.git ~/gstack
cd ~/gstack
./setup --host auto
```

## Core workflow

gstack is organized around a typical sprint:

**Think → Plan → Build → Review → Test → Ship → Reflect**

Recommended flow:

1. `office-hours` — pressure-test the problem before coding
2. `plan-ceo-review` / `plan-eng-review` / `plan-design-review` — lock scope, architecture, and UX
3. Implement the work
4. `review` — inspect the diff for issues before landing
5. `qa` or `qa-only` — run browser-based testing
6. `ship` — run the release / PR workflow
7. `retro` — reflect on what shipped

## Skill reference

### Planning and design

| Skill | What it does |
|---|---|
| `/office-hours` | Reframes the problem before coding starts |
| `/plan-ceo-review` | Reviews product scope and ambition |
| `/plan-eng-review` | Reviews architecture, data flow, and tests |
| `/plan-design-review` | Reviews design quality before implementation |
| `/design-consultation` | Builds a design system / visual direction |

### Build, review, and release

| Skill | What it does |
|---|---|
| `/review` | Pre-landing code review |
| `/investigate` | Root-cause debugging workflow |
| `/qa` | Browser QA plus fixes |
| `/qa-only` | Browser QA report without fixes |
| `/design-review` | Visual QA plus design fixes |
| `/document-release` | Sync docs with shipped changes |
| `/ship` | Run the ship / PR workflow |
| `/retro` | Weekly engineering retrospective |

### Tools and helpers

| Skill | What it does |
|---|---|
| `/browse` | Fast headless browser for QA and dogfooding |
| `/setup-browser-cookies` | Import cookies from a local browser |
| `/codex` | Independent Codex review / challenge / consultation |
| `/careful` | Warns before destructive operations |
| `/freeze` | Restricts edits to one directory |
| `/guard` | Combines careful + freeze |
| `/unfreeze` | Removes the freeze restriction |
| `/gstack-upgrade` | Upgrades gstack |

## Browse

The `browse` tool gives the agent a real browser workflow: page navigation, snapshots,
element targeting, clicks, form fill, screenshots, and related QA operations.

- Browser reference: [BROWSER.md](BROWSER.md)
- Skill deep dives: [docs/skills.md](docs/skills.md)

## Development

Useful commands:

```bash
bun install
bun test
bun run build
bun run gen:skill-docs
bun run skill:check
```

Contributor setup and development workflow live in [CONTRIBUTING.md](CONTRIBUTING.md).

## Docs

| Doc | What it covers |
|---|---|
| [docs/skills.md](docs/skills.md) | Skill philosophy and examples |
| [BROWSER.md](BROWSER.md) | Full browser command reference |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System internals |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributor workflow |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |

## License

MIT
