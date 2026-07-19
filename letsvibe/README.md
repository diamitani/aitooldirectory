# 🌊 LetsVibe AI Academy

The structured path from AI-curious to AI builder — the evolution of the LetsVibeAI platform, rebuilt as a zero-dependency static web app.

**Mission:** help 1 million people build tools, systems, and businesses with AI by making vibe coding simple, structured, and free.

## What's inside

- **4-stage learning path** — fundamentals → guided tutorials → project labs → depth & currency. A process, not a content dump.
- **The Vibe Coding Masterclass** — the original 6-module first-party curriculum (~14h, free) plus 3 project labs that each end in a deployed app, and a 10-day bootcamp plan.
- **Guided video tutorials** — 20 real, hand-verified YouTube tutorials organized into tracks (Getting Started, Cursor, Claude Code, App Builders, Automation & Agents, Fundamentals), playable in-page.
- **Course library** — 12 curated external courses from DeepLearning.AI, Anthropic, OpenAI, Google, Hugging Face, fast.ai, Karpathy, and more.
- **Builder's library** — the LiveBuildAI article series (8 first-party automation guides), 8 podcasts, and 10 blogs/newsletters.
- **Toolbox** — the 10 platforms used across the academy, linking to the companion [AI Stack Directory](https://aitooldirectory-two.vercel.app).

## Structure

```
index.html        The single-page academy
assets/
  styles.css      Design system (shared DNA with the AI Stack Directory)
  app.js          Tracks, video modal, rendering
  data.js         All content: curriculum, videos, courses, articles, podcasts, blogs
vercel.json       Static deployment config
```

No frameworks, no build step, no tracking. Edit `assets/data.js` to add content.

## Local development

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Content notes

- Curriculum modules, labs, bootcamp, and the LiveBuildAI articles are first-party (Patrick Diamitani / LetsVibeAI).
- Videos, courses, podcasts, and blogs belong to their creators; listings are informational, not endorsements.
- Video embeds use `youtube-nocookie.com` and thumbnails load lazily from `i.ytimg.com`.
