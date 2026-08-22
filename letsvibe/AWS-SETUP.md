# AWS Backend Setup — LetsVibe AI Academy

The site ships with a complete OAuth 2.0 (Authorization Code + PKCE) sign-in flow wired for **AWS Cognito**. It is dormant until you fill in two values in `auth/config.js`. This doc is the exact checklist — about 15 minutes in the AWS console, no code changes needed beyond the config file.

> **Why Cognito + PKCE?** The academy is a static site, so there is no server to hold a client secret. PKCE is the OAuth flow designed for exactly this: secure sign-in from the browser with a public client, no secrets shipped to users. Google OAuth plugs into Cognito as an identity provider, so "Continue with Google" and email sign-in both come from the same user pool.

## Part 1 — Cognito User Pool (email sign-in)

1. AWS Console → **Cognito** → **Create user pool**.
2. Application type: **Single-page application (SPA)**. Name it `letsvibeai-web`.
3. Sign-in options: **Email**. Required attributes: `email`, `name`.
4. Under **Domain**, note or customize the Cognito domain, e.g.
   `https://letsvibeai.auth.us-east-1.amazoncognito.com`
   (or set up a custom domain like `auth.letsvibeai.com` later).
5. App client settings:
   - **Allowed callback URLs:**
     - `https://letsvibeai.com/signin`
     - `https://letsvibe-academy.vercel.app/signin`
     - `http://localhost:8080/signin` (for local testing)
   - **Allowed sign-out URLs:**
     - `https://letsvibeai.com/`
     - `https://letsvibe-academy.vercel.app/`
     - `http://localhost:8080/`
   - **OAuth grant type:** Authorization code grant
   - **OpenID Connect scopes:** `openid`, `email`, `profile`
   - **Do NOT generate a client secret** (SPA client).
6. Copy the **App client ID**.

## Part 2 — Google OAuth (the "Continue with Google" button)

1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → **Create OAuth client ID** (Web application).
2. Authorized redirect URI: `https://<your-cognito-domain>/oauth2/idpresponse`
3. Copy the Google **Client ID** and **Client Secret**.
4. Back in Cognito: User pool → **Social and external providers** → Add **Google**, paste the ID/secret, map `email` → `email` and `name` → `name`.
5. In the app client's **Hosted UI** settings, enable **Google** as an identity provider alongside Cognito user pool.

## Part 3 — Connect the site

Edit `auth/config.js`:

```js
window.AUTH_CONFIG = {
  cognitoDomain: "https://letsvibeai.auth.us-east-1.amazoncognito.com", // from Part 1 step 4
  clientId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",                              // from Part 1 step 6
  redirectUri: window.location.origin + "/signin",
  scopes: "openid email profile"
};
```

Commit, push, deploy. Sign-in is now live: the nav shows **Sign in**, users authenticate via Cognito's hosted UI (email or Google), and return with a session chip in the nav.

## Part 4 (later) — Product workspace / synced progress

When you're ready to sync course progress and build member features, the natural next steps on AWS:

| Piece | Service | Purpose |
|---|---|---|
| API | API Gateway (HTTP API) + Cognito JWT authorizer | Authenticated endpoints |
| Compute | Lambda | Save/load progress, member features |
| Data | DynamoDB (`users`, `progress` tables, on-demand) | Serverless, pennies at this scale |

The frontend is already structured for this: `LVAuth.currentUser()` exposes the user, tokens are in `sessionStorage`, and TenDayAI progress is stored in localStorage under `tendayai-progress` — a single fetch call can sync it once an endpoint exists.

## What I need from you (bring from your computer)

Nothing needs to be shared in chat. Either:

- **Option A (you click):** follow Parts 1–3 yourself — they're all console clicks — and paste the two public values (Cognito domain + app client ID) into `auth/config.js`. These are not secrets; they ship to every browser by design.
- **Option B (I do it):** add AWS credentials as Cursor Cloud Agent secrets (Dashboard → Cloud Agents → Secrets): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` — scoped to an IAM user with Cognito permissions. Then ask me to provision the user pool; I'll script it with the AWS CLI and wire the config end to end.

> ⚠️ Never paste AWS keys (or any passwords) directly into chat. Use the Cursor secrets dashboard — values are injected as environment variables and stay out of the conversation.
