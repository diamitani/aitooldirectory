/* AI Stack Directory — 2026 Edition */
(function () {
  "use strict";

  var DATA = window.DIRECTORY_DATA || { tools: [], updated: "" };
  var TOOLS = DATA.tools;
  var PAGE_SIZE = 24;

  var PERSONAS = {
    founder: {
      label: "Founder",
      blurb: "Move fast with few hands: an assistant for strategy, vibe-coding tools to ship product, and automation so ops don't eat your week."
    },
    marketer: {
      label: "Marketer",
      blurb: "Own the full funnel: content and creative at scale, answer-engine visibility, and outbound that personalizes itself."
    },
    developer: {
      label: "Developer",
      blurb: "Ship more with agents: an AI-native editor, coding agents for the backlog, and the infrastructure layer for building AI features."
    },
    creator: {
      label: "Creator",
      blurb: "Produce studio-quality media solo: video and image generation, voice and music, plus repurposing tools that multiply every upload."
    },
    ops: {
      label: "Operator",
      blurb: "Run the machine: meeting intelligence, workflow automation, data analysis, and AI agents that clear the recurring-task queue."
    }
  };

  /* ---------- helpers ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Deterministic gradient per tool name so logos are stable and varied. */
  function hueFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return h;
  }

  function initials(name) {
    var words = name.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/);
    if (!words[0]) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function pricingBadge(p) {
    if (!p) return "";
    var cls = p === "Free" ? "badge-free" : p === "Paid" ? "badge-paid" : "badge-freemium";
    return '<span class="badge ' + cls + '">' + esc(p) + "</span>";
  }

  function cardHTML(t) {
    var h = hueFor(t.name);
    var style = "--logo-a:hsl(" + h + ",70%,55%);--logo-b:hsl(" + ((h + 60) % 360) + ",75%,50%)";
    return (
      '<a class="card" href="' + esc(t.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="card-top">' +
          '<div class="card-logo" style="' + style + '">' + esc(initials(t.name)) + "</div>" +
          '<div class="card-title-wrap">' +
            '<div class="card-name">' + esc(t.name) +
              (t.featured ? '<span class="badge badge-featured">★ Pick</span>' : "") +
            "</div>" +
            (t.tagline ? '<div class="card-tagline">' + esc(t.tagline) + "</div>" : "") +
          "</div>" +
        "</div>" +
        '<p class="card-desc">' + esc(t.description) + "</p>" +
        '<div class="card-foot">' +
          '<span class="badge badge-cat">' + esc(t.category) + "</span>" +
          pricingBadge(t.pricing) +
          '<span class="card-arrow">↗</span>' +
        "</div>" +
      "</a>"
    );
  }

  /* ---------- hero stats ---------- */

  function renderStats() {
    var curated = TOOLS.filter(function (t) { return t.era === "2026"; });
    var cats = {};
    TOOLS.forEach(function (t) { cats[t.category] = 1; });
    var free = curated.filter(function (t) {
      return t.pricing === "Free" || t.pricing === "Freemium";
    });
    var stats = {
      total: TOOLS.length + "+",
      curated: String(curated.length),
      categories: String(Object.keys(cats).length),
      free: Math.round((free.length / curated.length) * 100) + "%"
    };
    $all("[data-stat]").forEach(function (el) {
      el.textContent = stats[el.getAttribute("data-stat")] || "—";
    });
    var updated = $("#footer-updated");
    if (updated) updated.textContent = "Updated " + (DATA.updated || "2026");
  }

  /* ---------- stack builder ---------- */

  var activePersona = "founder";

  function renderStacks() {
    var blurb = $("#persona-blurb");
    blurb.textContent = PERSONAS[activePersona].blurb;

    var picks = TOOLS.filter(function (t) {
      return t.era === "2026" && t.personas.indexOf(activePersona) !== -1 &&
             t.category !== "Learning & Resources";
    });
    picks.sort(function (a, b) {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    $("#stack-grid").innerHTML = picks.slice(0, 12).map(cardHTML).join("");
  }

  $all(".persona-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activePersona = btn.getAttribute("data-persona");
      $all(".persona-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
      renderStacks();
    });
  });

  /* ---------- directory ---------- */

  var state = { query: "", era: "2026", category: "", pricing: "", sort: "featured", shown: PAGE_SIZE };

  function pool() {
    return state.era === "2026"
      ? TOOLS.filter(function (t) { return t.era === "2026"; })
      : TOOLS;
  }

  function filtered() {
    var q = state.query.toLowerCase().trim();
    var list = pool().filter(function (t) {
      if (state.category && t.category !== state.category) return false;
      if (state.pricing && t.pricing !== state.pricing) return false;
      if (q) {
        var hay = (t.name + " " + t.tagline + " " + t.description + " " +
                   t.category + " " + t.tags.join(" ")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    if (state.sort === "az") {
      list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } else if (state.sort === "category") {
      list.sort(function (a, b) {
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      });
    } else {
      list.sort(function (a, b) {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if ((a.era === "2026") !== (b.era === "2026")) return a.era === "2026" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }

  function renderCategoryChips() {
    var counts = {};
    pool().forEach(function (t) { counts[t.category] = (counts[t.category] || 0) + 1; });
    var cats = Object.keys(counts).sort();
    var html = '<button class="chip' + (state.category === "" ? " active" : "") + '" data-category="">All</button>';
    cats.forEach(function (c) {
      html += '<button class="chip' + (state.category === c ? " active" : "") + '" data-category="' + esc(c) + '">' +
              esc(c) + '<span class="chip-count">' + counts[c] + "</span></button>";
    });
    $("#category-chips").innerHTML = html;
  }

  function renderDirectory() {
    var list = filtered();
    var visible = list.slice(0, state.shown);
    $("#dir-grid").innerHTML = visible.map(cardHTML).join("");
    $("#result-count").textContent =
      "Showing " + visible.length + " of " + list.length +
      (state.era === "2026" ? " curated 2026 tools" : " tools (2026 + archive)");
    $("#empty-state").hidden = list.length > 0;
    $("#load-more").hidden = list.length <= state.shown;
    renderCategoryChips();
  }

  function resetAndRender() {
    state.shown = PAGE_SIZE;
    renderDirectory();
  }

  $("#category-chips").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-category]");
    if (!btn) return;
    state.category = btn.getAttribute("data-category");
    resetAndRender();
  });

  $("#pricing-chips").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-pricing]");
    if (!btn) return;
    state.pricing = btn.getAttribute("data-pricing");
    $all("#pricing-chips .chip").forEach(function (b) { b.classList.toggle("active", b === btn); });
    resetAndRender();
  });

  $all("#era-toggle .seg-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.era = btn.getAttribute("data-era");
      // Pricing labels only exist on curated tools; clear when browsing archive.
      if (state.era === "all" && state.pricing) {
        state.pricing = "";
        $all("#pricing-chips .chip").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-pricing") === "");
        });
      }
      // Category might not exist in the other pool.
      var cats = {};
      pool().forEach(function (t) { cats[t.category] = 1; });
      if (state.category && !cats[state.category]) state.category = "";
      $all("#era-toggle .seg-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
      resetAndRender();
    });
  });

  $("#sort-select").addEventListener("change", function (e) {
    state.sort = e.target.value;
    resetAndRender();
  });

  var dirSearch = $("#dir-search");
  var searchTimer = null;
  function onSearch(value) {
    state.query = value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(resetAndRender, 120);
  }
  dirSearch.addEventListener("input", function (e) { onSearch(e.target.value); });

  $("#load-more").addEventListener("click", function () {
    state.shown += PAGE_SIZE;
    renderDirectory();
  });

  /* Hero search mirrors into the directory and scrolls there. */
  var heroSearch = $("#hero-search");
  heroSearch.addEventListener("input", function (e) {
    dirSearch.value = e.target.value;
    onSearch(e.target.value);
  });
  heroSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") $("#directory").scrollIntoView({ behavior: "smooth" });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && !/input|textarea|select/i.test(e.target.tagName)) {
      e.preventDefault();
      heroSearch.focus();
    }
  });

  /* Playbook deep links that pre-select a category. */
  $all("[data-jump-category]").forEach(function (a) {
    a.addEventListener("click", function () {
      var tmp = document.createElement("textarea");
      tmp.innerHTML = a.getAttribute("data-jump-category");
      state.category = tmp.value;
      state.era = "2026";
      $all("#era-toggle .seg-btn").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-era") === "2026");
      });
      resetAndRender();
    });
  });

  /* ---------- resources lanes ---------- */

  var LANES = [
    { icon: "📬", title: "Newsletters & News", sub: "Pick one daily or weekly brief.", tags: ["newsletter", "news"] },
    { icon: "🎓", title: "Courses & Fundamentals", sub: "Structured learning, mostly free.", tags: ["courses", "fundamentals", "deep-learning", "hands-on", "education", "university"] },
    { icon: "🎙️", title: "Podcasts & Video", sub: "Go deep during your commute.", tags: ["podcast", "youtube", "video", "analysis"] },
    { icon: "📊", title: "Benchmarks & Reports", sub: "Check before you commit to a model.", tags: ["benchmarks", "leaderboard", "report", "data", "trends"] },
    { icon: "🧭", title: "Discovery & Directories", sub: "For the long tail beyond this list.", tags: ["directory", "discovery", "launches", "prompts", "inspiration"] },
    { icon: "🤝", title: "Communities & Practice", sub: "Learn with other builders.", tags: ["community", "meetups", "competitions", "practice", "reading-list", "guide"] }
  ];

  function renderResources() {
    var resources = TOOLS.filter(function (t) {
      return t.era === "2026" && t.category === "Learning & Resources";
    });
    var used = {};
    var html = LANES.map(function (lane) {
      var items = resources.filter(function (t) {
        if (used[t.name]) return false;
        return t.tags.some(function (tag) { return lane.tags.indexOf(tag) !== -1; });
      });
      items.forEach(function (t) { used[t.name] = true; });
      if (!items.length) return "";
      return (
        '<div class="lane">' +
          '<div class="lane-head"><span class="lane-icon">' + lane.icon + '</span><h3>' + esc(lane.title) + "</h3></div>" +
          '<p class="lane-sub">' + esc(lane.sub) + "</p>" +
          '<ul class="lane-list">' +
            items.map(function (t) {
              return '<li><a class="lane-item" href="' + esc(t.url) + '" target="_blank" rel="noopener noreferrer">' +
                '<span class="lane-item-name">' + esc(t.name) + "</span>" +
                '<span class="lane-item-desc">' + esc(t.tagline) + "</span>" +
              "</a></li>";
            }).join("") +
          "</ul>" +
        "</div>"
      );
    }).join("");
    $("#resource-lanes").innerHTML = html;
  }

  /* ---------- init ---------- */

  renderStats();
  renderStacks();
  renderDirectory();
  renderResources();
})();
