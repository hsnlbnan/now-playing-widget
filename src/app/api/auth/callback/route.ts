import { KvOrEnvTokenStore } from "@/infrastructure/tokenStore";

export const runtime = "edge";

const TOKEN_URL = "https://accounts.spotify.com/api/token" as const;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") ?? "";
  const cookie = parseCookie(req.headers.get("cookie"));
  if (!code || !state) return new Response("Missing code/state", { status: 400 });
  const hasSeparator = state.includes(":");
  const userFromState = hasSeparator ? state.split(":")[0] : "";
  const nonce = hasSeparator ? state.split(":")[1] : state;
  if (!nonce || cookie.get("sp_state") !== nonce) return new Response("Invalid state", { status: 400 });

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
  const access = tokenJson.access_token;

  let user = userFromState;
  if (!user) {
    try {
      if (!access) throw new Error("Missing access token to resolve user");
      const me = await fetch("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${access}` } });
      if (me.ok) {
        const j = (await me.json()) as { id?: string };
        user = (j.id || "").toString();
      }
    } catch {}
  }
  if (!user) user = `u_${crypto.randomUUID().slice(0, 8)}`;

  const useKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (useKv) {
    const store = new KvOrEnvTokenStore();
    await store.setRefreshToken(user, refresh);
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = `${site}/?connected=1&user=${encodeURIComponent(user)}`;
  const res = new Response(null, { status: 302, headers: { Location: redirectTo } });
  res.headers.append("Set-Cookie", "sp_state=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax");
  res.headers.append("Set-Cookie", `sp_user=${encodeURIComponent(user)}; Path=/; Max-Age=31536000; SameSite=Lax`);
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
