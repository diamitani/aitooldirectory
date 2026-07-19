/* LetsVibeAI auth configuration - AWS Cognito
   ────────────────────────────────────────────
   Fill these three values in after creating your Cognito User Pool
   (see AWS-SETUP.md in the repo root for the exact steps).
   Until configured, the sign-in page shows setup instructions and
   the rest of the site works normally without auth. */
window.AUTH_CONFIG = {
  /* e.g. "https://auth.letsvibeai.com" or
     "https://letsvibeai.auth.us-east-1.amazoncognito.com" */
  cognitoDomain: "",

  /* App client ID from Cognito (public client, no secret) */
  clientId: "",

  /* Where Cognito redirects back to after sign-in.
     Must be listed in the app client's Allowed callback URLs. */
  redirectUri: window.location.origin + "/signin",

  /* OAuth scopes */
  scopes: "openid email profile"
};
