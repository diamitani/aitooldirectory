/* LetsVibe AI Academy — content library
   Curriculum + articles are first-party (Patrick Diamitani / LetsVibeAI).
   Videos, courses, podcasts, and blogs are curated external resources. */
window.ACADEMY_DATA = {
  updated: "2026-07",

  /* ---------- First-party: Vibe Coding Masterclass ---------- */
  modules: [
    {
      num: 1, title: "What Is AI?", duration: "2–3h", level: "Beginner",
      desc: "Machine learning vs. rule-based systems, how LLMs process and generate text, tokens and context windows, and the map of today's model landscape.",
      outcomes: ["Explain how LLMs actually work", "Understand tokens & context windows", "Know each major model's strengths"]
    },
    {
      num: 2, title: "What Is Vibe Coding?", duration: "2h", level: "Beginner",
      desc: "The mindset shift: describe → generate → review → refine. Why natural language is the new programming interface and where human judgment still matters.",
      outcomes: ["Master the vibe coding loop", "Know when to trust and verify AI output", "Set up your first workspace"]
    },
    {
      num: 3, title: "The Toolkit", duration: "3h", level: "All levels",
      desc: "Hands-on tour of the builder stack: Cursor, Claude Code, Lovable, v0, Bolt, Replit Agent, and Windsurf — what each is for and how to combine them.",
      outcomes: ["Choose the right tool per project", "Combine tools into one workflow", "Ship something in every tool once"]
    },
    {
      num: 4, title: "Prompt Chaining", duration: "2–3h", level: "Intermediate",
      desc: "Break complex builds into sequenced prompts. Planning prompts, scaffold prompts, refinement prompts, and recovery prompts when the AI goes sideways.",
      outcomes: ["Design multi-step prompt sequences", "Write prompts that constrain scope", "Recover from bad generations fast"]
    },
    {
      num: 5, title: "Context Engineering", duration: "3h", level: "Intermediate",
      desc: "Manage what the model knows: project rules files, docs-as-context, context budgets, and feeding the right information at the right moment.",
      outcomes: ["Write effective rules files", "Manage context windows deliberately", "Ground the AI in your project's truth"]
    },
    {
      num: 6, title: "Process Engineering", duration: "2–3h", level: "Advanced",
      desc: "Turn one-off wins into repeatable systems: standardized build processes, checklists, version control habits, and team-ready AI workflows.",
      outcomes: ["Design reproducible build processes", "Use git as your safety net", "Scale vibe coding to a team"]
    }
  ],

  labs: [
    {
      num: 1, title: "Build a Marketing Website", duration: "~4h", level: "Beginner",
      desc: "Plan, generate, and deploy a complete marketing site with a hero, features, and contact form — live on a public URL by the end.",
      skills: ["Modules 1–3", "Deployment"]
    },
    {
      num: 2, title: "Build an E-Commerce Store", duration: "~6h", level: "Intermediate",
      desc: "A working storefront with product catalog, cart, authentication, and payments — your first real full-stack build.",
      skills: ["Modules 1–5", "Auth", "Payments"]
    },
    {
      num: 3, title: "Build a Directory / Marketplace", duration: "~8h", level: "Advanced",
      desc: "The capstone: a searchable, filterable directory with user accounts and listings. The same pattern behind this very platform.",
      skills: ["Modules 1–6", "Full-stack", "Database"]
    }
  ],

  bootcamp: [
    { day: 1, focus: "AI Foundations", content: "Module 1: What Is AI?" },
    { day: 2, focus: "Vibe Coding Mindset", content: "Module 2: What Is Vibe Coding?" },
    { day: 3, focus: "Tool Familiarization", content: "Module 3: The Toolkit" },
    { day: 4, focus: "Prompting Fundamentals", content: "Module 4: Prompt Chaining" },
    { day: 5, focus: "Context Mastery", content: "Module 5: Context Engineering" },
    { day: 6, focus: "Workflow Design", content: "Module 6: Process Engineering" },
    { day: 7, focus: "Build Sprint 1", content: "Lab 1: Marketing Website" },
    { day: 8, focus: "Build Sprint 2", content: "Lab 2: E-Commerce Store" },
    { day: 9, focus: "Build Sprint 3", content: "Lab 3: Marketplace" },
    { day: 10, focus: "Ship + Portfolio", content: "Deploy, polish, portfolio review" }
  ],

  /* ---------- Guided video tutorials (real YouTube videos) ---------- */
  videos: [
    {
      id: "EWvNQjAaOHw", title: "How I Use LLMs", creator: "Andrej Karpathy",
      duration: "2:11:00", track: "Getting Started", level: "Beginner",
      desc: "A practical, example-driven tour of the entire LLM ecosystem — tools, settings, and workflows — from OpenAI's founding team member."
    },
    {
      id: "uogxJPnYyPQ", title: "How to Use Replit to Build an App (Vibe Coding Tutorial)", creator: "Simpletivity",
      duration: "11:39", track: "Getting Started", level: "Beginner",
      desc: "Build and publish a custom productivity app with zero code — the friendliest possible on-ramp to vibe coding."
    },
    {
      id: "tR-N1InkwLc", title: "Lovable Tutorial: Build a Web App from Text Prompts", creator: "AI Academy",
      duration: "12:00", track: "Getting Started", level: "Beginner",
      desc: "Plan an idea, write a clear prompt, and generate a working full-stack app with React and Supabase — no code touched."
    },
    {
      id: "1OldXkFjF0w", title: "How To Build REAL Apps with AI Using Replit", creator: "",
      duration: "11:33", track: "Getting Started", level: "Beginner",
      desc: "From first prompt to a live deployed business app — project board, calendar, and database — built phase by phase in one afternoon."
    },
    {
      id: "2aldTxnbNt0", title: "Cursor 2.0 Tutorial for Beginners (Full Course)", creator: "Riley Brown",
      duration: "2:34:14", track: "Cursor", level: "Beginner",
      desc: "The most comprehensive Cursor course on the internet: basics through advanced features, landing pages to full-stack apps. No prior programming needed."
    },
    {
      id: "5zR1ZE5aqho", title: "Cursor Crash Course & AI Coding For Beginners", creator: "Traversy Media",
      duration: "52:41", track: "Cursor", level: "Beginner",
      desc: "Context, rules, tab completion, agent vs. ask mode, and model selection — AI coding practices that transfer to any tool."
    },
    {
      id: "iYiuzAsWnHU", title: "Claude Code Beginner Guide — Get Started in 20 Minutes", creator: "",
      duration: "20:00", track: "Claude Code", level: "Beginner",
      desc: "Set up Claude Code, give it commands, and let it build autonomously — including running it inside Cursor for extra power."
    },
    {
      id: "sX-FmJL7Wd0", title: "Claude Code Tutorial for Beginners (2026) — Skills, Subagents, Hooks & MCP", creator: "",
      duration: "1:10:00", track: "Claude Code", level: "Intermediate",
      desc: "Zero to pro in an hour: CLAUDE.md, plan mode, essential commands, subagents, skills, hooks, and connecting external tools via MCP."
    },
    {
      id: "TAKDIvvUdc4", title: "Complete Claude Code Course In 2 Hours For Developers", creator: "",
      duration: "2:00:00", track: "Claude Code", level: "Intermediate",
      desc: "Installation, integration, building agents and agent teams, and extending Claude Code with skills and plugins."
    },
    {
      id: "YLjopoEnPi8", title: "Lovable FULL Tutorial — For COMPLETE Beginners", creator: "Tech With Tim",
      duration: "36:13", track: "App Builders", level: "Beginner",
      desc: "Every core Lovable feature step by step: prompting best practices, visual edits, meta prompting, GitHub integration, Supabase backend, and deployment."
    },
    {
      id: "ZRmePOajOiI", title: "How I Built an App with Lovable in Under 1 Hour", creator: "",
      duration: "27:00", track: "App Builders", level: "Intermediate",
      desc: "Live build of a client project-management system with logins, dashboards, and an approval pipeline — exact prompts included."
    },
    {
      id: "7Y1O09Ssnew", title: "Build and Deploy a Full-Stack App Using Lovable", creator: "",
      duration: "25:00", track: "App Builders", level: "Intermediate",
      desc: "Plan mode, Lovable Cloud backend, publishing — plus an advanced technique for continuing the build in Claude Code or Codex."
    },
    {
      id: "jOGtu3Y2yBQ", title: "Replit AI Agent: Build a Micro SaaS (Vibe Coding Tutorial)", creator: "Moe Lueker",
      duration: "17:52", track: "App Builders", level: "Intermediate",
      desc: "A revenue-ready micro-SaaS from scratch: OpenAI API integration, file uploads, deployment, and monetization strategy."
    },
    {
      id: "mtubt_wqxqE", title: "4 Ways To Store Memory In Your AI Agents (n8n Tutorial)", creator: "Michele Torti",
      duration: "17:12", track: "Automation & Agents", level: "Intermediate",
      desc: "Simple Memory, Redis, Postgres via Supabase, and MongoDB — how to give n8n agents real memory, and which to choose."
    },
    {
      id: "sahuZMMXNpI", title: "Model Context Protocol (MCP) — Explained", creator: "",
      duration: "12:05", track: "Automation & Agents", level: "Intermediate",
      desc: "What MCP is, the problem it solves, hosts vs. clients vs. servers, and a full transaction walkthrough — the standard connecting AI to your tools."
    },
    {
      id: "zjkBMFhNj_g", title: "Intro to Large Language Models", creator: "Andrej Karpathy",
      duration: "59:48", track: "Fundamentals", level: "Beginner",
      desc: "The famous one-hour talk: what an LLM actually is, how it's trained, and where the field is going. The single best foundation video."
    },
    {
      id: "wjZofJX0v4M", title: "But What Is a GPT? Visual Intro to Transformers", creator: "3Blue1Brown",
      duration: "27:14", track: "Fundamentals", level: "Beginner",
      desc: "The most beautiful visual explanation of how transformers work — no math background required."
    },
    {
      id: "eMlx5fFNoYc", title: "Attention in Transformers, Visually Explained", creator: "3Blue1Brown",
      duration: "26:10", track: "Fundamentals", level: "Intermediate",
      desc: "The attention mechanism — the heart of every modern AI model — made visually intuitive."
    },
    {
      id: "7xTGNNLPyMI", title: "Deep Dive into LLMs like ChatGPT", creator: "Andrej Karpathy",
      duration: "3:31:00", track: "Fundamentals", level: "Advanced",
      desc: "Everything under the hood: pretraining, fine-tuning, RLHF, hallucinations, and capabilities — a full general-audience course in one video."
    },
    {
      id: "kCc8FmEb1nY", title: "Let's Build GPT: From Scratch, in Code", creator: "Andrej Karpathy",
      duration: "1:56:20", track: "Fundamentals", level: "Advanced",
      desc: "Write a working GPT line by line. The definitive hands-on deep-learning session for coders who want true understanding."
    }
  ],

  /* ---------- External course library ---------- */
  courses: [
    {
      title: "Vibe Coding 101 with Replit", provider: "DeepLearning.AI", price: "Free", level: "Beginner",
      url: "https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit/",
      desc: "Build and share two apps with an AI coding agent — the official beginner's vibe coding course, taught with Replit."
    },
    {
      title: "ChatGPT Prompt Engineering for Developers", provider: "DeepLearning.AI", price: "Free", level: "Beginner",
      url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
      desc: "The classic short course on practical prompting patterns, co-taught by Andrew Ng and OpenAI."
    },
    {
      title: "AI Agents Course", provider: "Hugging Face", price: "Free", level: "Intermediate",
      url: "https://huggingface.co/learn/agents-course",
      desc: "Free hands-on curriculum on building AI agents: frameworks, tools, memory, and a certified final project."
    },
    {
      title: "Anthropic Academy", provider: "Anthropic", price: "Free", level: "All levels",
      url: "https://www.anthropic.com/learn",
      desc: "Official structured courses on prompting, tool use, MCP, and agent design — straight from Claude's maker."
    },
    {
      title: "OpenAI Academy", provider: "OpenAI", price: "Free", level: "All levels",
      url: "https://academy.openai.com",
      desc: "Free AI literacy and builder training: ChatGPT fundamentals through advanced API and agent engineering."
    },
    {
      title: "Google AI Essentials", provider: "Google / Coursera", price: "Free + cert", level: "Beginner",
      url: "https://grow.google/ai-essentials/",
      desc: "Google's self-paced AI-at-work course: prompting, productivity, and responsible use, with a completion certificate."
    },
    {
      title: "Generative AI for Beginners", provider: "Microsoft", price: "Free", level: "Beginner",
      url: "https://microsoft.github.io/generative-ai-for-beginners/",
      desc: "21 lessons with code samples covering everything from prompt basics to building full generative AI apps."
    },
    {
      title: "Neural Networks: Zero to Hero", provider: "Andrej Karpathy", price: "Free", level: "Advanced",
      url: "https://karpathy.ai/zero-to-hero.html",
      desc: "Build neural networks and a working GPT from scratch alongside one of the field's best teachers."
    },
    {
      title: "Practical Deep Learning for Coders", provider: "fast.ai", price: "Free", level: "Intermediate",
      url: "https://course.fast.ai",
      desc: "The legendary top-down course that takes practical coders to state-of-the-art deep learning."
    },
    {
      title: "AI Engineer Path", provider: "Scrimba", price: "Freemium", level: "Intermediate",
      url: "https://scrimba.com/the-ai-engineer-path-c02v",
      desc: "Interactive path to building AI-powered apps with OpenAI APIs, embeddings, vector databases, and agents."
    },
    {
      title: "Prompt Engineering Guide", provider: "DAIR.AI", price: "Free", level: "All levels",
      url: "https://www.promptingguide.ai",
      desc: "The open reference for prompting techniques — zero-shot to chain-of-thought, RAG, and agent patterns."
    },
    {
      title: "Rundown University", provider: "The Rundown AI", price: "Paid", level: "All levels",
      url: "https://university.therundown.ai",
      desc: "Practical courses, workshops, and tool tutorials for applying AI at work, updated as the stack changes."
    }
  ],

  /* ---------- First-party articles: LiveBuildAI series ---------- */
  articles: [
    {
      title: "LiveBuildAI — Sales Automation Guide", type: "How-To Lab",
      url: "https://www.linkedin.com/pulse/livebuildai-sales-automation-guide-patrick-diamitani-9akdc",
      desc: "Build a go-to-market email automation with Make.com, Google Sheets, and Resend — including deliverability setup (SPF, DKIM, DMARC)."
    },
    {
      title: "Build a Personalized Email Outreach Engine", type: "How-To Lab",
      url: "https://www.linkedin.com/pulse/build-personalized-email-outreach-engine-makecom-google-diamitani-jibhc",
      desc: "Combine Make.com, Google Sheets, Perplexity, DeepSeek, and Resend into an outreach engine that personalizes at scale."
    },
    {
      title: "Custom LinkedIn Marketing Automation with ChatGPT & Make.com", type: "How-To Lab",
      url: "https://www.linkedin.com/pulse/how-build-custom-linkedin-marketing-automation-patrick-diamitani-i86ac",
      desc: "Automate LinkedIn content creation and publishing with a ChatGPT-powered Make.com pipeline."
    },
    {
      title: "How to Get Perplexity Pro + Comet Free for a Year", type: "Tool Guide",
      url: "https://www.linkedin.com/pulse/how-get-perplexity-pro-comet-access-free-1-year-paypal-diamitani-5vekc",
      desc: "Step-by-step walkthrough for unlocking a year of Perplexity Pro and the Comet browser at no cost."
    },
    {
      title: "AI Today: What's Moving", type: "News Briefing",
      url: "https://www.linkedin.com/pulse/ai-today-whats-moving-patrick-diamitani-diy2c",
      desc: "A field report on the AI shifts that matter for builders — models, tools, and what to do about them."
    },
    {
      title: "LiveBuildAI: The Week AI Grew Up", type: "News Briefing",
      url: "https://www.linkedin.com/pulse/livebuildai-10625-patrick-diamitani-yhszc",
      desc: "Briefing on a pivotal week in AI: what changed, why it matters, and how builders should respond."
    },
    {
      title: "LiveBuildAI | September 9 Briefing", type: "News Briefing",
      url: "https://www.linkedin.com/pulse/livebuildai-9925-patrick-diamitani-xro2c",
      desc: "Rapid-fire rundown of model releases, tool updates, and automation plays worth your attention."
    },
    {
      title: "LiveBuildAI | September 8 Briefing", type: "News Briefing",
      url: "https://www.linkedin.com/pulse/livebuildai-monday-september-8-2025-patrick-diamitani-px9mc",
      desc: "Monday briefing: the week's AI setup for operators and builders."
    }
  ],

  /* ---------- Podcasts ---------- */
  podcasts: [
    { name: "Latent Space", by: "swyx & Alessio", url: "https://latent.space", desc: "The podcast of the AI engineering discipline — deep interviews with the people building frontier products." },
    { name: "The AI Daily Brief", by: "Nathaniel Whittemore", url: "https://www.youtube.com/@AIDailyBrief", desc: "Daily 15-minute analysis of the most important AI news for business and strategy." },
    { name: "AI & I", by: "Dan Shipper / Every", url: "https://every.to/podcast", desc: "How smart people actually use AI in their work — screen-share-style conversations." },
    { name: "How I AI", by: "Claire Vo", url: "https://www.youtube.com/@howiaipodcast", desc: "Practical, demo-driven episodes showing exactly how operators automate real workflows." },
    { name: "No Priors", by: "Sarah Guo & Elad Gil", url: "https://www.no-priors.com", desc: "Investor-grade conversations with AI founders and researchers shaping the industry." },
    { name: "Lex Fridman Podcast", by: "Lex Fridman", url: "https://lexfridman.com/podcast", desc: "Long-form conversations with the biggest names in AI research and engineering." },
    { name: "Practical AI", by: "Changelog", url: "https://practicalai.fm", desc: "Grounded, implementation-focused discussions that make AI practical for working teams." },
    { name: "Machine Learning Street Talk", by: "Tim Scarfe", url: "https://www.youtube.com/@MachineLearningStreetTalk", desc: "Technical deep dives and spicy debates with leading AI researchers." }
  ],

  /* ---------- Blogs & newsletters ---------- */
  blogs: [
    { name: "Simon Willison's Weblog", url: "https://simonwillison.net", desc: "The most useful builder-blog in AI — hands-on notes on every model and tool release." },
    { name: "One Useful Thing", by: "Ethan Mollick", url: "https://www.oneusefulthing.org", desc: "Wharton professor's essays on working and learning with AI — practical and evidence-based." },
    { name: "Every — Chain of Thought", url: "https://every.to/chain-of-thought", desc: "Sharp essays on how AI changes business, creativity, and how we work." },
    { name: "Ben's Bites", url: "https://bensbites.com", desc: "Daily AI news and hands-on how-tos tuned for business builders." },
    { name: "The Rundown AI", url: "https://therundown.ai", desc: "5-minute daily briefing on everything that matters in AI, plus tutorials." },
    { name: "TLDR AI", url: "https://tldr.tech/ai", desc: "Concise daily digest of AI research, releases, and industry moves — the engineer's read." },
    { name: "Anthropic Engineering Blog", url: "https://www.anthropic.com/engineering", desc: "How Anthropic builds with Claude — agent design, prompting, and MCP patterns from the source." },
    { name: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com", desc: "Product and growth wisdom, increasingly focused on building in the AI era." },
    { name: "Import AI", by: "Jack Clark", url: "https://importai.substack.com", desc: "Weekly research-grade analysis of AI progress and policy from an Anthropic co-founder." },
    { name: "Latent Space Newsletter", url: "https://latent.space", desc: "Essays and paper club notes defining the AI engineer discipline." }
  ],

  /* ---------- Toolbox ---------- */
  tools: [
    { name: "Cursor", url: "https://cursor.com", tag: "AI code editor" },
    { name: "Claude Code", url: "https://www.anthropic.com/claude-code", tag: "Terminal agent" },
    { name: "Lovable", url: "https://lovable.dev", tag: "Full-stack from chat" },
    { name: "v0 by Vercel", url: "https://v0.dev", tag: "UI generation" },
    { name: "Replit Agent", url: "https://replit.com", tag: "Build + host anywhere" },
    { name: "Bolt.new", url: "https://bolt.new", tag: "In-browser builder" },
    { name: "Windsurf", url: "https://windsurf.com", tag: "Agentic IDE" },
    { name: "n8n", url: "https://n8n.io", tag: "AI workflow automation" },
    { name: "Make.com", url: "https://make.com", tag: "Visual automation" },
    { name: "Supabase", url: "https://supabase.com", tag: "Backend + database" }
  ]
};
