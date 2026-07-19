# ⚡ AI Stack Directory — 2026 Edition

A curated directory of **950+ AI tools and learning resources**, rebuilt as a modern, zero-dependency web app. Free to use and reuse. Pay it forward.

**Live site:** enable GitHub Pages on this repo (Settings → Pages → deploy from `main`, root) and it's live — no build step required.

## What's inside

- **138 hand-curated 2026 picks** — the tools that actually define today's AI stack, each with a tagline, honest description, category, pricing tier, and persona tags (`data/tools_2026.json`).
- **The original 900-tool archive** — the directory this project began as, cleaned up and browsable under the "Full Archive" toggle (`data/ai_tools_legacy.csv`).
- **A 5-step playbook** — a structured process for getting real value instead of collecting bookmarks: pick your role → choose one core assistant → add 2–3 workflow tools → automate one process → stay current 20 min/week.
- **Stack Builder** — persona-based starter stacks for founders, marketers, developers, creators, and operators.
- **Learning resources** — 30+ newsletters, courses, benchmarks, podcasts, and communities organized into lanes so you can pick one of each.

## Site features

- Instant search across name, description, category, and tags (press `/` anywhere)
- Category, pricing, and collection (2026 vs. archive) filters with live counts
- Featured-first, A–Z, and by-category sorting with paginated loading
- Dark, glassy 2026-SaaS design — responsive, accessible, reduced-motion friendly
- No frameworks, no build step, no tracking: three static files (`index.html`, `assets/styles.css`, `assets/app.js`) plus a generated data file

## Project structure

```
index.html              The single-page app
assets/
  styles.css            All styling
  app.js                Search, filters, stack builder, resources
  data.js               Generated dataset (do not edit by hand)
data/
  tools_2026.json       Curated 2026 collection — edit this to add tools
  ai_tools_legacy.csv   Original 900-tool archive
scripts/
  build_data.py         Merges both datasets into assets/data.js
```

## Adding or updating tools

1. Edit `data/tools_2026.json` (curated picks) or `data/ai_tools_legacy.csv` (archive).
2. Regenerate the data file:

```bash
python3 scripts/build_data.py
```

3. Open `index.html` in a browser (or `python3 -m http.server`) to verify, then open a PR.

### Curated tool schema

```json
{
  "name": "Tool Name",
  "url": "https://example.com",
  "tagline": "One-line value prop",
  "description": "Two or three honest sentences.",
  "category": "One of the site categories",
  "pricing": "Free | Freemium | Paid",
  "tags": ["lowercase", "keywords"],
  "featured": false,
  "personas": ["founder", "marketer", "developer", "creator", "ops"]
}
```

## License & spirit

Free to use, remix, and redistribute. Listings are informational, not endorsements — pricing changes fast, verify before you buy. If this saved you time, pass it along to someone building their first AI stack.
