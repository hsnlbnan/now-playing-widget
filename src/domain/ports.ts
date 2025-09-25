import type { Track } from "./track";

export interface TokenStore {
  getRefreshToken(user: string): Promise<string | null>;
  setRefreshToken(user: string, refreshToken: string): Promise<void>;
}

export interface SpotifyAuth {
  getAccessToken(refreshToken: string): Promise<string>;
}

export interface SpotifyApi {
  getCurrentlyPlaying(accessToken: string): Promise<Track | null>;
  getRecentlyPlayed(accessToken: string): Promise<Track | null>;
}
