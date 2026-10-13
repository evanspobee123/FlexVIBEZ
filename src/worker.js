// Opening Act: serves the static site from ./public and adds
// security and caching headers to every response.

const CSP = [
  "default-src 'self'",
  "script-src 'none'",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY = {
  "Content-Security-Policy": CSP,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const upstream = await env.ASSETS.fetch(request);
    const res = new Response(upstream.body, upstream);

    for (const [k, v] of Object.entries(SECURITY)) res.headers.set(k, v);

    const type = res.headers.get("Content-Type") || "";
    res.headers.set(
      "Cache-Control",
      type.includes("text/html") ? "public, max-age=0, must-revalidate" : "public, max-age=3600"
    );

    return res;
  },
};
