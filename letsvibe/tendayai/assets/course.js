/* TenDayAI interactive course */
(function () {
  "use strict";

  var C = window.TENDAY_COURSE;
  var STORE_KEY = "tendayai-progress";
  var DAY_KEY = "tendayai-current-day";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  /* First-party rich text: allow only <strong>/<em>, escape everything else. */
  function rich(s) {
    return esc(s)
      .replace(/&lt;(\/?)(strong|em)&gt;/g, "<$1$2>");
  }

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveDone(done) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(done)); } catch (e) {}
  }

  var done = loadDone();
  var urlDay = parseInt(new URLSearchParams(location.search).get("day"), 10);
  var currentDay = urlDay || parseInt(localStorage.getItem(DAY_KEY), 10) || 1;
  if (currentDay < 1 || currentDay > C.days.length) currentDay = 1;

  /* ---------- rendering ---------- */

  function moduleHTML(m) {
    switch (m.type) {
      case "heading": return '<h2 class="dc-heading">' + esc(m.text) + "</h2>";
      case "subheading": return '<h3 class="dc-subheading">' + esc(m.text) + "</h3>";
      case "paragraph": return '<p class="dc-paragraph">' + rich(m.text) + "</p>";
      case "list":
        return '<ul class="dc-list">' + m.items.map(function (i) { return "<li>" + rich(i) + "</li>"; }).join("") + "</ul>";
      case "numbered-list":
        return '<ol class="dc-numbered">' + m.items.map(function (i) { return "<li>" + rich(i) + "</li>"; }).join("") + "</ol>";
      case "tip": return '<div class="dc-tip"><span>' + rich(m.text) + "</span></div>";
      case "congrats": return '<div class="dc-congrats">' + rich(m.text) + "</div>";
      case "prompt": return promptHTML(m);
      default: return "";
    }
  }

  function promptHTML(m) {
    var q = encodeURIComponent(m.prompt);
    return '<div class="prompt-card" data-prompt-id="' + esc(m.id) + '">' +
      '<div class="prompt-card-head">' +
        '<div class="prompt-card-title">' + esc(m.title) + "</div>" +
        '<div class="prompt-card-desc">' + esc(m.description) + "</div>" +
      "</div>" +
      '<div class="prompt-box">' +
        '<button class="prompt-copy" data-copy aria-label="Copy prompt">⧉</button>' +
        "<pre>" + esc(m.prompt) + "</pre>" +
      "</div>" +
      '<div class="prompt-card-actions">' +
        '<a class="btn btn-sm btn-primary" href="https://chatgpt.com/?q=' + q + '" target="_blank" rel="noopener noreferrer">Run in ChatGPT ↗</a>' +
        '<a class="btn btn-sm btn-ghost" href="https://claude.ai/new?q=' + q + '" target="_blank" rel="noopener noreferrer">Run in Claude ↗</a>' +
        '<a class="btn btn-sm btn-ghost" href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" title="Copy the prompt, then paste it into Gemini">Open Gemini ↗</a>' +
      "</div>" +
    "</div>";
  }

  function renderDay() {
    var d = C.days[currentDay - 1];
    $("#day-content").innerHTML =
      '<p class="day-eyebrow">Day ' + d.day + " of " + C.days.length + "</p>" +
      '<h1 class="day-title">' + esc(d.title) + "</h1>" +
      '<div class="day-objective"><strong>Objective:</strong> ' + esc(d.objective) + "</div>" +
      d.content.map(moduleHTML).join("");

    $("#prev-day").disabled = currentDay === 1;
    $("#next-day").disabled = currentDay === C.days.length;
    updateCompleteBtn();
    renderSidebar();
    renderProgress();
    try { localStorage.setItem(DAY_KEY, String(currentDay)); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderSidebar() {
    $("#day-nav").innerHTML = C.days.map(function (d) {
      var cls = "day-link" + (d.day === currentDay ? " active" : "") + (done[d.day] ? " done" : "");
      return '<button class="' + cls + '" data-day="' + d.day + '">' +
        '<span class="day-dot">' + (done[d.day] ? "✓" : d.day) + "</span>" +
        '<span class="day-link-text">' +
          '<span class="day-link-label">DAY ' + d.day + "</span><br/>" +
          '<span class="day-link-title">' + esc(d.title) + "</span>" +
        "</span>" +
      "</button>";
    }).join("");

    var sel = $("#day-select");
    sel.innerHTML = C.days.map(function (d) {
      return '<option value="' + d.day + '"' + (d.day === currentDay ? " selected" : "") + ">" +
        (done[d.day] ? "✓ " : "") + "Day " + d.day + " — " + esc(d.title) + "</option>";
    }).join("");
  }

  function renderProgress() {
    var count = C.days.filter(function (d) { return done[d.day]; }).length;
    $("#progress-fill").style.width = (count / C.days.length * 100) + "%";
    $("#progress-label").textContent = count + " / " + C.days.length + " days";
  }

  function updateCompleteBtn() {
    var btn = $("#complete-day");
    if (done[currentDay]) {
      btn.textContent = "Day complete ✓";
      btn.classList.add("completed");
    } else {
      btn.textContent = "Mark day complete ✓";
      btn.classList.remove("completed");
    }
  }

  /* ---------- events ---------- */

  $("#day-nav").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-day]");
    if (!btn) return;
    currentDay = parseInt(btn.getAttribute("data-day"), 10);
    renderDay();
  });

  $("#day-select").addEventListener("change", function (e) {
    currentDay = parseInt(e.target.value, 10);
    renderDay();
  });

  $("#prev-day").addEventListener("click", function () {
    if (currentDay > 1) { currentDay--; renderDay(); }
  });
  $("#next-day").addEventListener("click", function () {
    if (currentDay < C.days.length) { currentDay++; renderDay(); }
  });

  $("#complete-day").addEventListener("click", function () {
    done[currentDay] = !done[currentDay];
    if (!done[currentDay]) delete done[currentDay];
    saveDone(done);
    updateCompleteBtn();
    renderSidebar();
    renderProgress();
    if (done[currentDay] && currentDay < C.days.length) {
      currentDay++;
      renderDay();
    }
  });

  $("#reset-progress").addEventListener("click", function () {
    if (!confirm("Reset all course progress?")) return;
    done = {};
    saveDone(done);
    currentDay = 1;
    renderDay();
  });

  $("#day-content").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var pre = btn.parentElement.querySelector("pre");
    navigator.clipboard.writeText(pre.textContent).then(function () {
      btn.textContent = "✓";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = "⧉";
        btn.classList.remove("copied");
      }, 1800);
    });
  });

  /* ---------- init ---------- */
  renderDay();
})();
