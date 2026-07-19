# Growth & Funnel Setup — LetsVibe AI Academy

The site ships with a complete user funnel. This doc covers what's live now and the two switches that turn everything fully on.

## The funnel

```
Visitor
  │  academy content, TenDayAI, Curriculum Architect (all free, no gate)
  ▼
Newsletter subscriber            ← works today via /api/subscribe
  │  homepage section, engagement slide-in (once/session),
  │  post-plan capture on /agents, Day-2 moment in TenDayAI
  ▼
Free account (Cognito OAuth)     ← turns on when auth/config.js is filled
  │  "Start free" nav CTA, /signin?mode=signup, soft gates
  ▼
Member (progress sync, workspace features on AWS)
```

Design rules baked in: gates are **soft** (always skippable), auth CTAs only appear once Cognito is configured, the slide-in shows at most once per session, and every capture moment is tied to real engagement (day completed, plan generated, 55% scroll).

## Switch 1 — Newsletter provider (5 minutes)

`/api/subscribe` (Vercel serverless) forwards to the first provider configured via environment variables. Add ONE of these in Vercel → `letsvibe-academy` → Settings → Environment Variables, then redeploy:

| Provider | Variables | Notes |
|---|---|---|
| **Mailgun** (you already have DNS set up) | `MAILGUN_API_KEY`, `MAILGUN_LIST` | Create a mailing list first (e.g. `briefing@letsvibeai.com`) in Mailgun → Sending → Mailing lists |
| **Beehiiv** (best for growing a real newsletter) | `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID` | Beehiiv → Settings → API |
| **Buttondown** (simplest) | `BUTTONDOWN_API_KEY` | Buttondown → Settings → API |

Until configured, subscribers see a graceful fallback (a prefilled email to `subscribe@letsvibeai.com`) so no lead is ever lost silently.

Every subscription includes a `source` tag (`homepage`, `slidein`, `curriculum-plan`, `tendayai-day3`, `gate`) so you can see which capture points convert.

## Switch 2 — Auth (see AWS-SETUP.md)

Fill `cognitoDomain` + `clientId` in `auth/config.js`. The moment that ships:

- Nav shows **Sign in** + **Start free** on every page
- `/signin?mode=signup` renders the account-creation flow (Google or email via Cognito hosted UI, OAuth 2.0 + PKCE)
- Soft gates upgrade from newsletter capture to account creation
- TenDayAI's "save your streak" moment offers accounts instead of email capture

## Capture points reference

| Where | Trigger | Source tag |
|---|---|---|
| Homepage newsletter section | always visible | `homepage` |
| Slide-in | 55% scroll or 45s dwell, once/session | `slidein` |
| Agent portal | under every generated curriculum | `curriculum-plan` |
| TenDayAI | after completing 2nd day, once ever | `tendayai-day{N}` |
| Soft gate fallback | any gate when auth not configured | `gate` |

## Testing

```bash
# local
python3 -m http.server 8080   # forms will 404 the API locally; use vercel dev for full test
vercel dev                    # runs the serverless function locally

# production check
curl -X POST https://letsvibe-academy.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"curl-test"}'
# -> {"ok":false,"reason":"not_configured"} until a provider is wired
```
