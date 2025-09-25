import { getNowPlaying } from "@/application/getNowPlaying";
import { KvOrEnvTokenStore } from "@/infrastructure/tokenStore";
import { SpotifyApiClient, SpotifyAuthClient } from "@/infrastructure/spotify";
import { renderJson, renderSvg } from "@/infrastructure/render";
import { kvGet, kvSet } from "@/infrastructure/kv";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user") ?? "";
  const format = url.searchParams.get("format");
  const accept = req.headers.get("accept") ?? "";
  const debug = url.searchParams.get("debug") === "1";
  const showCover = !["0", "false"].includes((url.searchParams.get("cover") ?? "").toLowerCase());
  const showLink = !["0", "false"].includes((url.searchParams.get("link") ?? "").toLowerCase());
  const showTime = !["0", "false"].includes((url.searchParams.get("time") ?? "").toLowerCase());
  const showProgress = !["0", "false"].includes((url.searchParams.get("progress") ?? "").toLowerCase());
  const theme = ((url.searchParams.get("theme") ?? "dark").toLowerCase() === "light") ? "light" : "dark";
  const layout = ((url.searchParams.get("layout") ?? "horizontal").toLowerCase() === "vertical") ? "vertical" : "horizontal";
  const variant = ((url.searchParams.get("variant") ?? "default").toLowerCase() === "compact") ? "compact" : "default";

  const deps = {
    tokens: new KvOrEnvTokenStore(),
    auth: new SpotifyAuthClient(),
    api: new SpotifyApiClient(),
  } as const;

  const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const CACHE_TTL_S = 12;
  const RL_WINDOW_S = 300;
  const RL_LIMIT_USER = 300; // generous per 5 minutes

  async function cacheRead(u: string) {
    if (!hasKv || !u) return null;
    try {
      const raw = await kvGet(`nowplay:cache:${u}`);
      if (!raw) return null;
      const obj = JSON.parse(raw) as { ts: number; track: any };
      if (typeof obj?.ts !== "number") return null;
      const age = Math.floor((Date.now() - obj.ts) / 1000);
      if (age <= CACHE_TTL_S) return obj.track ?? null;
      return null;
    } catch {
      return null;
    }
  }
  async function cacheWrite(u: string, value: any) {
    if (!hasKv || !u) return;
    try {
      await kvSet(`nowplay:cache:${u}`, JSON.stringify({ ts: Date.now(), track: value }));
    } catch {}
  }
  async function isThrottled(u: string) {
    if (!hasKv || !u) return false;
    try {
      const key = `nowplay:rl:u:${u}`;
      let raw = await kvGet(key);
      const now = Math.floor(Date.now() / 1000);
      let winStart = now;
      let count = 0;
      if (raw) {
        try {
          const obj = JSON.parse(raw) as { s: number; c: number };
          if (obj && typeof obj.s === "number" && typeof obj.c === "number") {
            if (now - obj.s <= RL_WINDOW_S) {
              winStart = obj.s;
              count = obj.c;
            }
          }
        } catch {}
      }
      count += 1;
      await kvSet(key, JSON.stringify({ s: winStart, c: count }));
      return count > RL_LIMIT_USER;
    } catch {
      return false;
    }
  }

  let track = null;
  let diag: any = undefined;
  if (debug) {
    let refresh: string | null = null;
    let accessOk = false;
    let error: string | undefined;
    let throttled = false;
    let cacheHit = false;
    try {
      refresh = await deps.tokens.getRefreshToken(user);
      if (refresh) {
        await deps.auth.getAccessToken(refresh);
        accessOk = true;
      }
    } catch (e: any) {
      error = e?.message ?? String(e);
    }
    try {
      throttled = await isThrottled(user);
      if (throttled) {
        track = await cacheRead(user);
        cacheHit = Boolean(track !== null);
      }
      if (!throttled) {
        const cached = await cacheRead(user);
        if (cached !== null) {
          track = cached;
          cacheHit = true;
        } else {
          track = await getNowPlaying(user, deps);
          await cacheWrite(user, track);
        }
      }
    } catch (e: any) {
      error = error ?? (e?.message ?? String(e));
    }
    diag = {
      user,
      hasKv,
      hasRefreshToken: Boolean(refresh),
      refreshTokenLength: refresh?.length ?? 0,
      accessTokenOk: accessOk,
      throttled,
      cacheHit,
      error,
      track,
    };
  } else {
    const throttled = await isThrottled(user);
    if (throttled) {
      const cached = await cacheRead(user);
      track = cached;
    } else {
      const cached = await cacheRead(user);
      if (cached !== null) {
        track = cached;
      } else {
        track = await getNowPlaying(user, deps);
        await cacheWrite(user, track);
      }
    }
  }

  if (format === "json" || accept.includes("application/json")) {
    return debug ? Response.json(diag) : renderJson(track);
  }
  return renderSvg(track, { showCover, showLink, showTime, showProgress, theme, layout, variant });
}
