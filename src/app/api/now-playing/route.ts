import { getNowPlaying } from "@/application/getNowPlaying";
import { KvOrEnvTokenStore } from "@/infrastructure/tokenStore";
import { SpotifyApiClient, SpotifyAuthClient } from "@/infrastructure/spotify";
import { renderJson, renderSvg } from "@/infrastructure/render";

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

  let track = null;
  let diag: any = undefined;
  if (debug) {
    const hasKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    let refresh: string | null = null;
    let accessOk = false;
    let error: string | undefined;
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
      track = await getNowPlaying(user, deps);
    } catch (e: any) {
      error = error ?? (e?.message ?? String(e));
    }
    diag = {
      user,
      hasKv,
      hasRefreshToken: Boolean(refresh),
      refreshTokenLength: refresh?.length ?? 0,
      accessTokenOk: accessOk,
      error,
      track,
    };
  } else {
    track = await getNowPlaying(user, deps);
  }

  if (format === "json" || accept.includes("application/json")) {
    return debug ? Response.json(diag) : renderJson(track);
  }
  return renderSvg(track, { showCover, showLink, showTime, showProgress, theme, layout, variant });
}
