import type { SpotifyApi, SpotifyAuth, TokenStore } from "../domain/ports";
import type { Track } from "../domain/track";

export type GetNowPlayingDeps = {
  tokens: TokenStore;
  auth: SpotifyAuth;
  api: SpotifyApi;
};

export async function getNowPlaying(user: string, deps: GetNowPlayingDeps): Promise<Track | null> {
  if (!user) return null;
  const refresh = await deps.tokens.getRefreshToken(user);
  if (!refresh) return null;
  const access = await deps.auth.getAccessToken(refresh);
  const current = await deps.api.getCurrentlyPlaying(access);
  if (current) return current;
  return deps.api.getRecentlyPlayed(access);
}

