/* Newsletter subscription endpoint (Vercel serverless function).
   Forwards to whichever provider is configured via environment variables:

   Mailgun:    MAILGUN_API_KEY + MAILGUN_LIST  (e.g. newsletter@letsvibeai.com)
   Beehiiv:    BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID
   Buttondown: BUTTONDOWN_API_KEY

   With none configured it returns { ok: false, reason: "not_configured" }
   and the frontend falls back gracefully. Set vars in Vercel → Project →
   Settings → Environment Variables, then redeploy. See GROWTH-SETUP.md. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, reason: "method_not_allowed" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const email = String((body && body.email) || "").trim().toLowerCase();
  const source = String((body && body.source) || "site").slice(0, 64);

  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, reason: "invalid_email" });

  try {
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_LIST) {
      const r = await fetch(
        `https://api.mailgun.net/v3/lists/${encodeURIComponent(process.env.MAILGUN_LIST)}/members`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + Buffer.from("api:" + process.env.MAILGUN_API_KEY).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            address: email,
            upsert: "yes",
            vars: JSON.stringify({ source, subscribed_at: new Date().toISOString() })
          }).toString()
        }
      );
      if (r.ok || r.status === 400 /* already a member */) {
        return res.status(200).json({ ok: true, provider: "mailgun" });
      }
      return res.status(502).json({ ok: false, reason: "provider_error" });
    }

    if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
      const r = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, utm_source: source, reactivate_existing: true })
        }
      );
      if (r.ok) return res.status(200).json({ ok: true, provider: "beehiiv" });
      return res.status(502).json({ ok: false, reason: "provider_error" });
    }

    if (process.env.BUTTONDOWN_API_KEY) {
      const r = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_address: email, tags: [source] })
      });
      if (r.ok || r.status === 400 /* already subscribed */) {
        return res.status(200).json({ ok: true, provider: "buttondown" });
      }
      return res.status(502).json({ ok: false, reason: "provider_error" });
    }

    return res.status(200).json({ ok: false, reason: "not_configured" });
  } catch (err) {
    return res.status(500).json({ ok: false, reason: "server_error" });
  }
};
