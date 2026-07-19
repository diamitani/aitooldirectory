/* LetsVibeAI growth layer - newsletter capture, funnel CTAs, and soft gates.
   Design principles:
   - Newsletter capture works today (serverless /api/subscribe).
   - Auth gates are SOFT and only engage once Cognito is configured
     (LVAuth.configured()) - the free experience is never broken.
   - One nudge per session max; everything dismissible. */
(function () {
  "use strict";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  var SUBSCRIBED_KEY = "lv-subscribed";
  var NUDGE_KEY = "lv-nudge-shown"; /* sessionStorage: once per session */

  function isSubscribed() { return read(SUBSCRIBED_KEY) === "1"; }
  function isAuthed() { return !!(window.LVAuth && window.LVAuth.currentUser && window.LVAuth.currentUser()); }

  /* ---------- newsletter form ---------- */

  function formHTML(source, variant) {
    return (
      '<form class="nl-form ' + (variant || "") + '" data-source="' + esc(source) + '" novalidate>' +
        '<div class="nl-row">' +
          '<input type="email" name="email" required placeholder="you@example.com" autocomplete="email" aria-label="Email address" />' +
          '<button type="submit" class="btn btn-primary">Get the briefing</button>' +
        "</div>" +
        '<p class="nl-status" role="status"></p>' +
      "</form>"
    );
  }

  function bindForm(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[name=email]");
      var status = form.querySelector(".nl-status");
      var btn = form.querySelector("button");
      var email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        status.textContent = "Please enter a valid email.";
        status.className = "nl-status err";
        return;
      }
      btn.disabled = true;
      btn.textContent = "Subscribing…";
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, source: form.getAttribute("data-source") || "site" })
      }).then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (d) {
          if (d.ok) {
            store(SUBSCRIBED_KEY, "1");
            form.innerHTML = '<p class="nl-done">✓ You\'re in! Watch your inbox for the next briefing.</p>';
            document.dispatchEvent(new CustomEvent("lv:subscribed"));
          } else if (d.reason === "not_configured") {
            /* Provider not wired yet - don't lose the lead. */
            store(SUBSCRIBED_KEY, "1");
            var mailto = "mailto:subscribe@letsvibeai.com?subject=" +
              encodeURIComponent("Subscribe me to the LetsVibeAI briefing") +
              "&body=" + encodeURIComponent("Please add " + email + " to the list.");
            form.innerHTML = '<p class="nl-done">✓ Almost there - <a href="' + mailto + '">tap to confirm by email</a> and you\'re in.</p>';
          } else {
            btn.disabled = false;
            btn.textContent = "Get the briefing";
            status.textContent = "Something went wrong - try again in a minute.";
            status.className = "nl-status err";
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "Get the briefing";
          status.textContent = "Network error - try again.";
          status.className = "nl-status err";
        });
    });
  }

  function mountForms() {
    document.querySelectorAll("[data-newsletter]").forEach(function (mount) {
      if (mount.dataset.mounted) return;
      mount.dataset.mounted = "1";
      mount.innerHTML = formHTML(mount.getAttribute("data-newsletter"), mount.getAttribute("data-variant") || "");
      bindForm(mount.querySelector("form"));
    });
  }

  /* ---------- slide-in nudge (once/session, after real engagement) ---------- */

  function maybeShowNudge() {
    if (isSubscribed()) return;
    try { if (sessionStorage.getItem(NUDGE_KEY)) return; } catch (e) {}
    var fired = false;
    function fire() {
      if (fired || isSubscribed()) return;
      fired = true;
      try { sessionStorage.setItem(NUDGE_KEY, "1"); } catch (e) {}
      var el = document.createElement("div");
      el.className = "nl-slidein";
      el.innerHTML =
        '<button class="nl-slidein-close" aria-label="Dismiss">✕</button>' +
        '<div class="nl-slidein-head">🌊 <strong>The LetsVibeAI Briefing</strong></div>' +
        '<p>One email a week: the best new tools, tutorials, and builds - no noise, unsubscribe anytime.</p>' +
        '<div data-newsletter="slidein"></div>';
      document.body.appendChild(el);
      mountForms();
      el.querySelector(".nl-slidein-close").addEventListener("click", function () { el.remove(); });
      document.addEventListener("lv:subscribed", function () {
        setTimeout(function () { el.remove(); }, 2400);
      });
      requestAnimationFrame(function () { el.classList.add("visible"); });
    }
    /* Trigger on meaningful engagement: 55% scroll or 45s dwell */
    var t = setTimeout(fire, 45000);
    window.addEventListener("scroll", function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.55) {
        clearTimeout(t);
        window.removeEventListener("scroll", onScroll);
        fire();
      }
    }, { passive: true });
  }

  /* ---------- soft gates ---------- */

  /* Show a value-framed signup/subscribe moment. Never blocks: always offers
     "continue without an account". Auth CTAs only when Cognito is configured. */
  function showGate(opts) {
    if ($(".lv-gate")) return;
    var authReady = window.LVAuth && window.LVAuth.configured();
    var el = document.createElement("div");
    el.className = "lv-gate";
    el.innerHTML =
      '<div class="lv-gate-backdrop"></div>' +
      '<div class="lv-gate-card">' +
        '<button class="lv-gate-close" aria-label="Close">✕</button>' +
        '<div class="lv-gate-icon">' + (opts.icon || "🔓") + "</div>" +
        "<h3>" + esc(opts.title) + "</h3>" +
        "<p>" + esc(opts.body) + "</p>" +
        (authReady
          ? '<div class="lv-gate-actions">' +
              '<button class="btn btn-primary" data-gate-signup>Create free account</button>' +
              '<button class="btn btn-ghost" data-gate-signin>Sign in</button>' +
            "</div>"
          : '<div data-newsletter="' + esc(opts.source || "gate") + '"></div>') +
        '<button class="lv-gate-skip" data-gate-skip>' + esc(opts.skipLabel || "Continue without an account") + "</button>" +
      "</div>";
    document.body.appendChild(el);
    mountForms();
    function close() { el.remove(); if (opts.onSkip) opts.onSkip(); }
    el.querySelector(".lv-gate-close").addEventListener("click", close);
    el.querySelector("[data-gate-skip]").addEventListener("click", close);
    el.querySelector(".lv-gate-backdrop").addEventListener("click", close);
    var su = el.querySelector("[data-gate-signup]");
    if (su) su.addEventListener("click", function () { window.LVAuth.signUp(); });
    var si = el.querySelector("[data-gate-signin]");
    if (si) si.addEventListener("click", function () { window.LVAuth.signIn(); });
    document.addEventListener("lv:subscribed", function () {
      setTimeout(close, 2200);
    });
  }

  window.LVGrowth = {
    mountForms: mountForms,
    maybeShowNudge: maybeShowNudge,
    showGate: showGate,
    isSubscribed: isSubscribed,
    isAuthed: isAuthed
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountForms);
  } else {
    mountForms();
  }
})();
