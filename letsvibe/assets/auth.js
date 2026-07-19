/* LetsVibeAI auth - OAuth 2.0 Authorization Code + PKCE against AWS Cognito.
   Static-site friendly: no client secret, tokens kept in sessionStorage. */
(function () {
  "use strict";

  var CFG = window.AUTH_CONFIG || {};
  var TOKENS_KEY = "lv-auth-tokens";
  var VERIFIER_KEY = "lv-pkce-verifier";
  var RETURN_KEY = "lv-auth-return";

  function configured() {
    return !!(CFG.cognitoDomain && CFG.clientId);
  }

  /* ---------- PKCE helpers ---------- */
  function randomString(len) {
    var bytes = new Uint8Array(len);
    crypto.getRandomValues(bytes);
    return Array.prototype.map.call(bytes, function (b) {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"[b % 66];
    }).join("");
  }
  function sha256base64url(str) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
      var bin = "";
      new Uint8Array(buf).forEach(function (b) { bin += String.fromCharCode(b); });
      return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    });
  }

  /* ---------- token store ---------- */
  function getTokens() {
    try { return JSON.parse(sessionStorage.getItem(TOKENS_KEY)) || null; }
    catch (e) { return null; }
  }
  function setTokens(t) {
    try { sessionStorage.setItem(TOKENS_KEY, JSON.stringify(t)); } catch (e) {}
  }
  function clearTokens() {
    try { sessionStorage.removeItem(TOKENS_KEY); } catch (e) {}
  }

  function decodeJwtPayload(jwt) {
    try {
      var b64 = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(b64));
    } catch (e) { return null; }
  }

  function currentUser() {
    var t = getTokens();
    if (!t || !t.id_token) return null;
    var claims = decodeJwtPayload(t.id_token);
    if (!claims) return null;
    if (claims.exp && claims.exp * 1000 < Date.now()) { clearTokens(); return null; }
    return {
      email: claims.email || "",
      name: claims.name || claims.given_name || (claims.email || "").split("@")[0],
      sub: claims.sub
    };
  }

  /* ---------- flows ---------- */
  function authorize(endpoint, identityProvider) {
    if (!configured()) {
      window.location.href = "/signin";
      return;
    }
    var verifier = randomString(64);
    try {
      sessionStorage.setItem(VERIFIER_KEY, verifier);
      sessionStorage.setItem(RETURN_KEY, window.location.pathname + window.location.search);
    } catch (e) {}
    sha256base64url(verifier).then(function (challenge) {
      var url = CFG.cognitoDomain.replace(/\/$/, "") + endpoint +
        "?response_type=code" +
        "&client_id=" + encodeURIComponent(CFG.clientId) +
        "&redirect_uri=" + encodeURIComponent(CFG.redirectUri) +
        "&scope=" + encodeURIComponent(CFG.scopes || "openid email profile") +
        "&code_challenge_method=S256" +
        "&code_challenge=" + challenge +
        (identityProvider ? "&identity_provider=" + encodeURIComponent(identityProvider) : "");
      window.location.href = url;
    });
  }
  function signIn(identityProvider) { authorize("/oauth2/authorize", identityProvider); }
  /* Cognito hosted UI: /signup renders the account-creation form directly. */
  function signUp(identityProvider) { authorize("/signup", identityProvider); }

  function handleCallback() {
    var params = new URLSearchParams(window.location.search);
    var code = params.get("code");
    if (!code || !configured()) return Promise.resolve(false);

    var verifier = sessionStorage.getItem(VERIFIER_KEY) || "";
    var body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CFG.clientId,
      code: code,
      redirect_uri: CFG.redirectUri,
      code_verifier: verifier
    });
    return fetch(CFG.cognitoDomain.replace(/\/$/, "") + "/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    }).then(function (r) { return r.json(); }).then(function (t) {
      if (!t.id_token) return false;
      setTokens(t);
      sessionStorage.removeItem(VERIFIER_KEY);
      var back = sessionStorage.getItem(RETURN_KEY) || "/";
      sessionStorage.removeItem(RETURN_KEY);
      window.history.replaceState({}, "", "/signin");
      window.location.href = back;
      return true;
    }).catch(function () { return false; });
  }

  function signOut() {
    clearTokens();
    if (configured()) {
      window.location.href = CFG.cognitoDomain.replace(/\/$/, "") + "/logout" +
        "?client_id=" + encodeURIComponent(CFG.clientId) +
        "&logout_uri=" + encodeURIComponent(window.location.origin + "/");
    } else {
      window.location.href = "/";
    }
  }

  /* ---------- nav widget ---------- */
  function initNavWidget() {
    var mount = document.getElementById("auth-slot");
    if (!mount) return;
    var user = currentUser();
    if (user) {
      mount.innerHTML =
        '<span class="auth-chip" title="' + user.email.replace(/"/g, "&quot;") + '">' +
          '<span class="auth-avatar">' + (user.name[0] || "?").toUpperCase() + "</span>" +
          '<span class="auth-name">' + user.name.replace(/</g, "&lt;") + "</span>" +
        "</span>" +
        '<button class="btn btn-sm btn-ghost" id="auth-signout">Sign out</button>';
      document.getElementById("auth-signout").addEventListener("click", signOut);
    } else {
      mount.innerHTML =
        '<a class="btn btn-sm btn-ghost auth-signin-link" href="/signin">Sign in</a>' +
        '<a class="btn btn-sm btn-primary" href="/signin?mode=signup">Start free</a>';
    }
  }

  window.LVAuth = {
    configured: configured,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    currentUser: currentUser,
    handleCallback: handleCallback,
    initNavWidget: initNavWidget
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavWidget);
  } else {
    initNavWidget();
  }
})();
