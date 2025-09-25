import { KvOrEnvTokenStore } from "@/infrastructure/tokenStore";

export const runtime = "edge";

const TOKEN_URL = "https://accounts.spotify.com/api/token" as const;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") ?? "";
  const cookie = parseCookie(req.headers.get("cookie"));
  if (!code || !state) return new Response("Missing code/state", { status: 400 });
  const [user, nonce] = state.split(":");
  if (!user || !nonce || cookie.get("sp_state") !== nonce) {
    return new Response("Invalid state", { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return new Response("Missing Spotify env", { status: 500 });

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  const basic = (typeof btoa !== "undefined" ? btoa(`${clientId}:${clientSecret}`) : Buffer.from(`${clientId}:${clientSecret}`).toString("base64"));
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!tokenRes.ok) return new Response(`Token exchange failed: ${tokenRes.status}`, { status: 500 });
  const tokenJson = (await tokenRes.json()) as { refresh_token?: string; access_token?: string };
  const refresh = tokenJson.refresh_token;
  if (!refresh) return new Response("No refresh token returned", { status: 500 });

  const useKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (useKv) {
    const store = new KvOrEnvTokenStore();
    await store.setRefreshToken(user, refresh);
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const embed = `${site}/api/now-playing?user=${encodeURIComponent(user)}`;
  const savedMsg = useKv
    ? `Token saved to KV as nowplay:refresh:${escapeHtml(user)}`
    : `KV not configured. Copy this refresh token and add to .env:\nTOKENS_JSON={"${escapeHtml(user)}":"${escapeHtml(refresh)}"}`;
  const html = `<!doctype html><meta charset="utf-8"><title>Connected</title><style>body{font-family:system-ui;padding:32px;white-space:pre-wrap}</style><h1>Spotify connected ✓</h1><p>${savedMsg}</p><p>Embed in GitHub README:</p><pre>![Spotify Now Playing](${embed})</pre><p>JSON: <code>${embed}&format=json</code></p>`;
  const res = new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  res.headers.append("Set-Cookie", "sp_state=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax");
  return res;
}

function parseCookie(cookie: string | null): Map<string, string> {
  const map = new Map<string, string>();
  if (!cookie) return map;
  cookie.split(/;\s*/).forEach((part) => {
    const idx = part.indexOf("=");
    if (idx > -1) map.set(part.slice(0, idx), decodeURIComponent(part.slice(idx + 1)));
  });
  return map;
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
