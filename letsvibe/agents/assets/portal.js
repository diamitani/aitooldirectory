/* LetsVibeAI Agent Portal — Curriculum Architect
   A client-side port of the CurriculumOS pipeline (PAL → Research → Index → Generate)
   running against the academy's curated resource index. */
(function () {
  "use strict";

  var D = window.ACADEMY_DATA;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- state ---------- */
  var state = { topic: "vibe-coding", level: "beginner", hours: 5 };

  /* ---------- resource index (Research + Index layers) ---------- */

  function toMinutes(dur) {
    if (!dur) return 20;
    var parts = String(dur).split(":").map(Number);
    if (parts.length === 3) return parts[0] * 60 + parts[1];
    if (parts.length === 2) return parts[0];
    return 20;
  }

  function video(v) {
    return {
      kind: "▶️", type: "video", name: v.title, sub: v.creator,
      url: "https://www.youtube.com/watch?v=" + v.id,
      minutes: toMinutes(v.duration), level: v.level, track: v.track
    };
  }
  function findVideos(pred) { return D.videos.filter(pred).map(video); }
  function course(title, minutes) {
    var c = D.courses.filter(function (x) { return x.title === title; })[0];
    if (!c) return null;
    return { kind: "🎓", type: "course", name: c.title, sub: c.provider + " · " + c.price, url: c.url, minutes: minutes || 120, level: c.level };
  }
  function article(match) {
    var a = D.articles.filter(function (x) { return x.title.indexOf(match) !== -1; })[0];
    if (!a) return null;
    return { kind: "📝", type: "article", name: a.title, sub: "LiveBuildAI · " + a.type, url: a.url, minutes: 25, level: "Intermediate" };
  }
  function firstParty(name, sub, url, minutes, level) {
    return { kind: "🌊", type: "academy", name: name, sub: sub, url: url, minutes: minutes, level: level };
  }

  /* Topic blueprints: ordered phases, each with a pool of resources (prerequisite order preserved). */
  var BLUEPRINTS = {
    "vibe-coding": {
      title: "Vibe Coding: Zero to Shipped App",
      phases: [
        { theme: "Foundations & mindset", pool: function () { return [
          firstParty("Module 1–2: What Is AI? / What Is Vibe Coding?", "Vibe Coding Masterclass", "/#curriculum", 150, "Beginner"),
          findVideos(function (v) { return v.id === "EWvNQjAaOHw"; })[0],
          findVideos(function (v) { return v.id === "wjZofJX0v4M"; })[0]
        ]; } },
        { theme: "Meet your tools", pool: function () { return [
          firstParty("Module 3: The Toolkit", "Vibe Coding Masterclass", "/#curriculum", 180, "Beginner"),
          findVideos(function (v) { return v.track === "Getting Started" && v.id !== "EWvNQjAaOHw"; })[0],
          findVideos(function (v) { return v.track === "Cursor"; })[1] || findVideos(function (v) { return v.track === "Cursor"; })[0],
          findVideos(function (v) { return v.id === "6eBSHbLKuN0"; })[0]
        ]; } },
        { theme: "Go deep on one builder", pool: function () { return [
          findVideos(function (v) { return v.id === "YLjopoEnPi8"; })[0],
          findVideos(function (v) { return v.id === "2aldTxnbNt0"; })[0],
          course("Vibe Coding 101 with Replit", 104)
        ]; } },
        { theme: "Prompting & context mastery", pool: function () { return [
          firstParty("Module 4–5: Prompt Chaining + Context Engineering", "Vibe Coding Masterclass", "/#curriculum", 330, "Intermediate"),
          firstParty("TenDayAI Days 1–3: Custom GPTs & Chain Prompting", "Interactive course", "/tendayai/", 90, "Beginner"),
          course("ChatGPT Prompt Engineering for Developers", 90)
        ]; } },
        { theme: "Build & ship (capstone)", pool: function () { return [
          firstParty("Lab 1: Build a Marketing Website", "Deploy to a live URL", "/#labs", 240, "Beginner"),
          firstParty("Lab 2: Build an E-Commerce Store", "Auth + payments", "/#labs", 360, "Intermediate"),
          findVideos(function (v) { return v.id === "K65vd9EYbDU"; })[0]
        ]; } }
      ],
      checkpoints: [
        "Checkpoint: explain tokens & context windows to a friend in plain English.",
        "Checkpoint: you've generated your first working page in at least 2 different tools.",
        "Checkpoint: one complete app built end-to-end in your chosen builder.",
        "Checkpoint: you've recovered a broken generation using a planned prompt chain.",
        "Capstone shipped: a deployed URL you can put in your portfolio."
      ]
    },
    "automation": {
      title: "AI Automation & Agents: From Zaps to Agent Loops",
      phases: [
        { theme: "Automation fundamentals", pool: function () { return [
          firstParty("TenDayAI Day 4–5: The Power of Automation + Make.com", "Interactive course", "/tendayai/?day=4", 120, "Beginner"),
          article("Sales Automation Guide"),
          firstParty("Module 6: Process Engineering", "Vibe Coding Masterclass", "/#curriculum", 150, "Advanced")
        ]; } },
        { theme: "Build real pipelines", pool: function () { return [
          article("Personalized Email Outreach Engine"),
          article("LinkedIn Marketing Automation"),
          firstParty("TenDayAI Day 6: Designing Automations with Chain Prompting", "Interactive course", "/tendayai/?day=6", 60, "Intermediate")
        ]; } },
        { theme: "Agents & memory", pool: function () { return [
          findVideos(function (v) { return v.id === "mtubt_wqxqE"; })[0],
          findVideos(function (v) { return v.id === "EuzYhzB0vbI"; })[0],
          course("AI Agents Course", 240)
        ]; } },
        { theme: "Connect everything (MCP + assistants)", pool: function () { return [
          findVideos(function (v) { return v.id === "sahuZMMXNpI"; })[0],
          firstParty("TenDayAI Day 7–8: Production AI Assistants", "Interactive course", "/tendayai/?day=7", 120, "Intermediate"),
          findVideos(function (v) { return v.id === "sX-FmJL7Wd0"; })[0]
        ]; } },
        { theme: "Scale it (capstone)", pool: function () { return [
          findVideos(function (v) { return v.id === "-EInjdpjKy0"; })[0],
          findVideos(function (v) { return v.id === "oC1h922cDoY"; })[0]
        ]; } }
      ],
      checkpoints: [
        "Checkpoint: one working automation running on a schedule.",
        "Checkpoint: a pipeline that reads a sheet, calls AI, and writes results back.",
        "Checkpoint: an agent with memory answering across sessions.",
        "Checkpoint: one external tool connected to an assistant via MCP.",
        "Capstone shipped: an automation that saves you 2+ hours every week."
      ]
    },
    "fundamentals": {
      title: "AI Fundamentals: How LLMs Actually Work",
      phases: [
        { theme: "The big picture", pool: function () { return [
          firstParty("Module 1: What Is AI?", "Vibe Coding Masterclass", "/#curriculum", 150, "Beginner"),
          findVideos(function (v) { return v.id === "zjkBMFhNj_g"; })[0],
          findVideos(function (v) { return v.id === "EWvNQjAaOHw"; })[0]
        ]; } },
        { theme: "Inside the transformer", pool: function () { return [
          findVideos(function (v) { return v.id === "wjZofJX0v4M"; })[0],
          findVideos(function (v) { return v.id === "eMlx5fFNoYc"; })[0]
        ]; } },
        { theme: "Under the hood", pool: function () { return [
          findVideos(function (v) { return v.id === "7xTGNNLPyMI"; })[0],
          course("Generative AI for Beginners", 300)
        ]; } },
        { theme: "Hands-on depth", pool: function () { return [
          findVideos(function (v) { return v.id === "kCc8FmEb1nY"; })[0],
          course("Neural Networks: Zero to Hero", 600),
          course("Practical Deep Learning for Coders", 600)
        ]; } },
        { theme: "Where it's heading", pool: function () { return [
          findVideos(function (v) { return v.id === "We7BZVKbCVw"; })[0],
          findVideos(function (v) { return v.id === "BYXbuik3dgA"; })[0],
          findVideos(function (v) { return v.id === "qH7thwrCluM"; })[0]
        ]; } }
      ],
      checkpoints: [
        "Checkpoint: explain the difference between training and inference.",
        "Checkpoint: sketch the attention mechanism from memory.",
        "Checkpoint: describe RLHF and why hallucinations happen.",
        "Checkpoint: (advanced) a neural network you trained yourself.",
        "You can now evaluate AI claims critically. Stay current with one newsletter."
      ]
    },
    "business": {
      title: "AI for Business & GTM: Build the Machine",
      phases: [
        { theme: "The landscape & the opportunity", pool: function () { return [
          findVideos(function (v) { return v.id === "8JLyq_-3n58"; })[0],
          findVideos(function (v) { return v.id === "4pAt0DP-x50"; })[0],
          findVideos(function (v) { return v.id === "deMrq2uzRKA"; })[0]
        ]; } },
        { theme: "Your AI operating system", pool: function () { return [
          findVideos(function (v) { return v.id === "oC1h922cDoY"; })[0],
          firstParty("TenDayAI: full 10-day course", "Custom GPTs → automations → apps", "/tendayai/", 300, "Beginner"),
          article("Perplexity Pro")
        ]; } },
        { theme: "GTM engineering", pool: function () { return [
          article("Sales Automation Guide"),
          article("Personalized Email Outreach Engine"),
          article("LinkedIn Marketing Automation")
        ]; } },
        { theme: "Revenue plays", pool: function () { return [
          findVideos(function (v) { return v.id === "K65vd9EYbDU"; })[0],
          findVideos(function (v) { return v.id === "-EInjdpjKy0"; })[0],
          findVideos(function (v) { return v.id === "4IyJm1i__ag"; })[0]
        ]; } },
        { theme: "Stay ahead (leaders' view)", pool: function () { return [
          findVideos(function (v) { return v.id === "qH7thwrCluM"; })[0],
          findVideos(function (v) { return v.id === "PQU9o_5rHC4"; })[0],
          findVideos(function (v) { return v.id === "SlGRN8jh2RI"; })[0]
        ]; } }
      ],
      checkpoints: [
        "Checkpoint: you can articulate where AI creates leverage in YOUR business.",
        "Checkpoint: a daily AI brief or assistant working for you.",
        "Checkpoint: one GTM automation running against real leads.",
        "Checkpoint: one revenue experiment launched with AI tooling.",
        "You're operating with an AI-first playbook. Review quarterly."
      ]
    }
  };

  /* ---------- PAL: level filter ---------- */
  function levelFits(resLevel, learner) {
    if (!resLevel || resLevel === "All levels") return true;
    var r = resLevel.toLowerCase();
    if (learner === "beginner") return r !== "advanced";
    if (learner === "advanced") return r !== "beginner" || true; /* advanced learners may skim basics */
    return true;
  }

  /* ---------- Generate ---------- */
  function generatePlan() {
    var bp = BLUEPRINTS[state.topic];
    var weeklyBudget = state.hours * 60;
    var weeks = [];

    bp.phases.forEach(function (phase, i) {
      var pool = phase.pool().filter(Boolean).filter(function (r) {
        return levelFits(r.level, state.level);
      });
      if (!pool.length) return;

      /* Fit resources into 1..n weeks for this phase based on budget */
      var phaseWeeks = [[]];
      var used = 0;
      pool.forEach(function (r) {
        var current = phaseWeeks[phaseWeeks.length - 1];
        if (used + r.minutes > weeklyBudget * 1.25 && current.length) {
          phaseWeeks.push([]);
          used = 0;
        }
        phaseWeeks[phaseWeeks.length - 1].push(r);
        used += r.minutes;
      });
      phaseWeeks.forEach(function (items, j) {
        weeks.push({
          theme: phase.theme + (phaseWeeks.length > 1 ? " (part " + (j + 1) + ")" : ""),
          items: items,
          checkpoint: j === phaseWeeks.length - 1 ? bp.checkpoints[i] : null
        });
      });
    });

    return { title: bp.title, weeks: weeks };
  }

  function fmtMinutes(m) {
    if (m >= 60) {
      var h = Math.floor(m / 60), r = m % 60;
      return r ? h + "h " + r + "m" : h + "h";
    }
    return m + "m";
  }

  function renderPlan(plan) {
    var totalMin = 0;
    plan.weeks.forEach(function (w) { w.items.forEach(function (r) { totalMin += r.minutes; }); });

    var levelLabel = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" }[state.level];
    var html =
      '<div class="pcur-head">' +
        "<h3>" + esc(plan.title) + "</h3>" +
        '<div class="pcur-meta">' +
          '<span class="ppill">' + plan.weeks.length + " weeks</span>" +
          '<span class="ppill">' + esc(levelLabel) + "</span>" +
          '<span class="ppill">' + state.hours + " hrs/week</span>" +
          '<span class="ppill">~' + fmtMinutes(totalMin) + " total</span>" +
        "</div>" +
        '<div class="pcur-actions">' +
          '<button class="pbtn pbtn-ghost" id="copy-plan">⧉ Copy as Markdown</button>' +
          '<button class="pbtn pbtn-ghost" onclick="window.print()">🖨️ Print / PDF</button>' +
        "</div>" +
      "</div>";

    plan.weeks.forEach(function (w, i) {
      var weekMin = w.items.reduce(function (s, r) { return s + r.minutes; }, 0);
      html += '<div class="pweek">' +
        '<div class="pweek-head">' +
          '<span class="pweek-num">WEEK ' + (i + 1) + "</span>" +
          '<span class="pweek-title">' + esc(w.theme) + "</span>" +
          '<span class="pweek-hours">~' + fmtMinutes(weekMin) + "</span>" +
        "</div>" +
        '<ul class="pres-list">' +
          w.items.map(function (r) {
            return '<li><a class="pres-item" href="' + esc(r.url) + '"' +
              (r.url.indexOf("http") === 0 ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" +
              '<span class="pres-kind">' + r.kind + "</span>" +
              "<span><span class=\"pres-name\">" + esc(r.name) + "</span><br/><span class=\"pres-sub\">" + esc(r.sub || "") + "</span></span>" +
              '<span class="pres-dur">' + fmtMinutes(r.minutes) + "</span>" +
            "</a></li>";
          }).join("") +
        "</ul>" +
        (w.checkpoint ? '<div class="pcheckpoint">✓ ' + esc(w.checkpoint) + "</div>" : "") +
      "</div>";
    });

    $("#curriculum-result").innerHTML = html;

    $("#copy-plan").addEventListener("click", function () {
      var md = "# " + plan.title + "\n\n" +
        "_" + levelLabel + " · " + state.hours + " hrs/week · " + plan.weeks.length + " weeks · generated by the LetsVibeAI Curriculum Architect_\n\n";
      plan.weeks.forEach(function (w, i) {
        md += "## Week " + (i + 1) + " — " + w.theme + "\n\n";
        w.items.forEach(function (r) {
          var url = r.url.indexOf("http") === 0 ? r.url : "https://letsvibeai.com" + r.url;
          md += "- [" + r.name + "](" + url + ") — " + (r.sub || "") + " (" + fmtMinutes(r.minutes) + ")\n";
        });
        if (w.checkpoint) md += "\n> ✓ " + w.checkpoint + "\n";
        md += "\n";
      });
      navigator.clipboard.writeText(md).then(function () {
        var btn = $("#copy-plan");
        btn.textContent = "✓ Copied!";
        setTimeout(function () { btn.textContent = "⧉ Copy as Markdown"; }, 2000);
      });
    });
  }

  /* ---------- interactions ---------- */

  $("#topic-grid").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-topic]");
    if (!btn) return;
    state.topic = btn.getAttribute("data-topic");
    $all("#topic-grid .ptopic").forEach(function (b) { b.classList.toggle("active", b === btn); });
  });
  $("#level-seg").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-level]");
    if (!btn) return;
    state.level = btn.getAttribute("data-level");
    $all("#level-seg .pseg-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
  });
  $("#time-seg").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-hours]");
    if (!btn) return;
    state.hours = parseInt(btn.getAttribute("data-hours"), 10);
    $all("#time-seg .pseg-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
  });

  $("#generate-btn").addEventListener("click", function () {
    var thinking = $("#thinking");
    $("#output-placeholder").hidden = true;
    $("#curriculum-result").innerHTML = "";
    thinking.hidden = false;
    /* restart the staged animation */
    $all(".pthinking-line", thinking).forEach(function (el) {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
    var plan = generatePlan();
    setTimeout(function () {
      thinking.hidden = true;
      renderPlan(plan);
      $("#curriculum-result").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2200);
  });

  /* ---------- master prompt (Power mode) ---------- */

  var MASTER_PROMPT = [
    "You are CurriculumOS, an AI Curriculum Architect built on the ROSTR Framework (source: github.com/diamitani/curriculum-os).",
    "",
    "You are a hybrid of an instructional designer, research librarian, and personal tutor. You architect learning journeys — you don't just list resources.",
    "",
    "## Your pipeline (run in order — never skip a layer)",
    "1. PAL COMPILE: Extract my true intent (level, goals, constraints, learning style). Ask up to 3 clarifying questions if anything is ambiguous.",
    "2. RESEARCH: Search for the best learning resources across YouTube, Coursera/edX/Udemy, official docs, blogs, newsletters, arXiv, podcasts, and GitHub. Find the 20 best resources, not 200 mediocre ones.",
    "3. INDEX: Classify every resource by credibility tier (1 = authoritative/academic, 2 = editorial/professional, 3 = community/UGC). Map prerequisite chains. Group by format and difficulty.",
    "4. GENERATE: Build a personalized week-by-week curriculum with time estimates, sequenced modules, assessment checkpoints, and custom bridging notes where resources leave gaps.",
    "",
    "## Rules",
    "- Research before you index. Index before you generate.",
    "- Every resource gets a credibility tier and a time estimate.",
    "- Sequencing matters: what must come before what.",
    "- End with a capstone project and a plan for staying current.",
    "- Output as clean markdown: overview table, then week-by-week plan.",
    "",
    "## My request",
    "Topic: {{TOPIC}}",
    "Current level: {{LEVEL}}",
    "Time budget: {{HOURS}} hours/week",
    "Goal: [describe what you want to be able to DO when finished]"
  ].join("\n");

  /* Deep links: /agents/?topic=automation&level=intermediate&hours=5&auto=1 */
  (function applyParams() {
    var p = new URLSearchParams(location.search);
    if (p.get("topic") && BLUEPRINTS[p.get("topic")]) {
      state.topic = p.get("topic");
      $all("#topic-grid .ptopic").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-topic") === state.topic);
      });
    }
    if (p.get("level")) {
      state.level = p.get("level");
      $all("#level-seg .pseg-btn").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-level") === state.level);
      });
    }
    if (p.get("hours")) {
      state.hours = parseInt(p.get("hours"), 10) || 5;
      $all("#time-seg .pseg-btn").forEach(function (b) {
        b.classList.toggle("active", parseInt(b.getAttribute("data-hours"), 10) === state.hours);
      });
    }
    if (p.get("auto") === "1") $("#generate-btn").click();
  })();

  $("#copy-master-prompt").addEventListener("click", function () {
    var topicLabel = {
      "vibe-coding": "Vibe coding — building real apps with AI tools (Cursor, Claude Code, Lovable, Replit)",
      "automation": "AI automation and agents (n8n, Make.com, agent loops, MCP)",
      "fundamentals": "AI/LLM fundamentals — how models actually work",
      "business": "Applying AI to business, marketing, and go-to-market"
    }[state.topic];
    var prompt = MASTER_PROMPT
      .replace("{{TOPIC}}", topicLabel)
      .replace("{{LEVEL}}", state.level)
      .replace("{{HOURS}}", String(state.hours));
    navigator.clipboard.writeText(prompt).then(function () {
      var btn = $("#copy-master-prompt");
      btn.textContent = "✓ Copied — paste into ChatGPT or Claude";
      setTimeout(function () { btn.textContent = "⧉ Copy master prompt"; }, 2600);
    });
  });
})();
