/* LetsVibe AI Academy */
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

  function levelBadge(level) {
    var cls = level === "Beginner" ? "badge-free"
      : level === "Advanced" ? "badge-paid" : "badge-freemium";
    return '<span class="badge ' + cls + '">' + esc(level) + "</span>";
  }

  /* ---------- hero stats ---------- */
  $all("[data-stat]").forEach(function (el) {
    var key = el.getAttribute("data-stat");
    var val = key === "modules" ? D.modules.length + D.labs.length
      : key === "videos" ? D.videos.length
      : key === "courses" ? D.courses.length
      : D.podcasts.length + D.blogs.length + D.articles.length;
    el.textContent = String(val);
  });
  $("#footer-updated").textContent = "Updated " + D.updated;

  /* ---------- bootcamp ---------- */
  var bootcampGrid = $("#bootcamp-grid");
  bootcampGrid.innerHTML = D.bootcamp.map(function (d) {
    return '<div class="bootcamp-day">' +
      '<div class="bd-num">DAY ' + d.day + "</div>" +
      '<div class="bd-focus">' + esc(d.focus) + "</div>" +
      '<div class="bd-content">' + esc(d.content) + "</div>" +
    "</div>";
  }).join("");
  $("#bootcamp-toggle").addEventListener("click", function () {
    var open = !bootcampGrid.hidden;
    bootcampGrid.hidden = open;
    this.textContent = open ? "View the 10-day plan" : "Hide the plan";
  });

  /* ---------- curriculum ---------- */
  $("#module-grid").innerHTML = D.modules.map(function (m) {
    return '<div class="card module-card">' +
      '<div class="module-num">MODULE 0' + m.num + "</div>" +
      '<div class="card-name">' + esc(m.title) + "</div>" +
      '<div class="module-meta">' + levelBadge(m.level) +
        '<span class="badge">' + esc(m.duration) + "</span></div>" +
      '<p class="card-desc" style="-webkit-line-clamp:4">' + esc(m.desc) + "</p>" +
      '<ul class="outcome-list">' +
        m.outcomes.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") +
      "</ul>" +
    "</div>";
  }).join("");

  $("#lab-grid").innerHTML = D.labs.map(function (l) {
    return '<div class="card module-card">' +
      '<div class="module-num">LAB 0' + l.num + "</div>" +
      '<div class="card-name">' + esc(l.title) + "</div>" +
      '<div class="module-meta">' + levelBadge(l.level) +
        '<span class="badge">' + esc(l.duration) + "</span></div>" +
      '<p class="card-desc" style="-webkit-line-clamp:4">' + esc(l.desc) + "</p>" +
      '<div class="card-foot">' +
        l.skills.map(function (s) { return '<span class="badge badge-cat">' + esc(s) + "</span>"; }).join("") +
      "</div>" +
    "</div>";
  }).join("");

  /* ---------- guided tutorials ---------- */
  var TRACK_ORDER = ["All", "Getting Started", "Cursor", "Claude Code", "App Builders", "Automation & Agents", "Latest from Creators", "Interviews & Insights", "Fundamentals"];
  var activeTrack = "All";

  function renderTrackChips() {
    $("#track-chips").innerHTML = TRACK_ORDER.map(function (t) {
      var count = t === "All" ? D.videos.length
        : D.videos.filter(function (v) { return v.track === t; }).length;
      return '<button class="chip' + (activeTrack === t ? " active" : "") + '" data-track="' + esc(t) + '">' +
        esc(t) + '<span class="chip-count">' + count + "</span></button>";
    }).join("");
  }

  function videoCard(v) {
    return '<div class="card video-card" data-video="' + esc(v.id) + '" role="button" tabindex="0" aria-label="Play ' + esc(v.title) + '">' +
      '<div class="video-thumb">' +
        '<img loading="lazy" src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" />' +
        '<div class="video-play"><span>▶</span></div>' +
        '<div class="video-duration">' + esc(v.duration) + "</div>" +
      "</div>" +
      '<div class="video-info">' +
        '<div class="video-title">' + esc(v.title) + "</div>" +
        (v.creator ? '<div class="video-creator">' + esc(v.creator) + "</div>" : "") +
        '<p class="video-desc">' + esc(v.desc) + "</p>" +
        '<div class="card-foot">' +
          '<span class="badge badge-cat">' + esc(v.track) + "</span>" + levelBadge(v.level) +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function renderVideos() {
    var list = activeTrack === "All" ? D.videos
      : D.videos.filter(function (v) { return v.track === activeTrack; });
    $("#video-grid").innerHTML = list.map(videoCard).join("");
    renderTrackChips();
  }

  $("#track-chips").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-track]");
    if (!btn) return;
    activeTrack = btn.getAttribute("data-track");
    renderVideos();
  });

  /* video modal */
  var modal = $("#video-modal");
  var embed = $("#video-embed");
  function openVideo(id) {
    embed.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) +
      '?autoplay=1&rel=0" title="Tutorial video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeVideo() {
    modal.hidden = true;
    embed.innerHTML = "";
    document.body.style.overflow = "";
  }
  $("#video-grid").addEventListener("click", function (e) {
    var card = e.target.closest("[data-video]");
    if (card) openVideo(card.getAttribute("data-video"));
  });
  $("#video-grid").addEventListener("keydown", function (e) {
    var card = e.target.closest("[data-video]");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openVideo(card.getAttribute("data-video"));
    }
  });
  $all("[data-close]", modal).forEach(function (el) {
    el.addEventListener("click", closeVideo);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });

  /* ---------- courses ---------- */
  $("#course-grid").innerHTML = D.courses.map(function (c) {
    var priceCls = /free/i.test(c.price) && !/\+|paid/i.test(c.price) ? "badge-free"
      : /paid/i.test(c.price) && !/free/i.test(c.price) ? "badge-paid" : "badge-freemium";
    return '<a class="card" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<div class="card-name">' + esc(c.title) + "</div>" +
      '<div class="card-tagline" style="margin-bottom:10px">' + esc(c.provider) + "</div>" +
      '<p class="card-desc">' + esc(c.desc) + "</p>" +
      '<div class="card-foot">' +
        '<span class="badge ' + priceCls + '">' + esc(c.price) + "</span>" +
        levelBadge(c.level) +
        '<span class="card-arrow">↗</span>' +
      "</div>" +
    "</a>";
  }).join("");

  /* ---------- articles ---------- */
  $("#article-grid").innerHTML = D.articles.map(function (a) {
    return '<a class="card" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<div class="module-num">' + esc(a.type.toUpperCase()) + "</div>" +
      '<div class="card-name">' + esc(a.title) + "</div>" +
      '<p class="card-desc" style="margin-top:8px">' + esc(a.desc) + "</p>" +
      '<div class="card-foot"><span class="badge badge-cat">LinkedIn Pulse</span><span class="card-arrow">↗</span></div>' +
    "</a>";
  }).join("");

  /* ---------- podcasts & blogs ---------- */
  function laneItem(x) {
    return '<li><a class="lane-item" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="lane-item-name">' + esc(x.name) + "</span>" +
      '<span class="lane-item-desc">' + esc(x.desc) + "</span>" +
    "</a></li>";
  }
  $("#podcast-list").innerHTML = D.podcasts.map(laneItem).join("");
  $("#blog-list").innerHTML = D.blogs.map(laneItem).join("");

  /* ---------- toolbox ---------- */
  $("#tool-strip").innerHTML = D.tools.map(function (t) {
    return '<a class="tool-pill" href="' + esc(t.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="tp-name">' + esc(t.name) + "</span>" +
      '<span class="tp-tag">' + esc(t.tag) + "</span>" +
    "</a>";
  }).join("");

  /* ---------- init ---------- */
  renderVideos();
})();
