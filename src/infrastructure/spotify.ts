import type { SpotifyApi, SpotifyAuth } from "../domain/ports";
import type { Track } from "../domain/track";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token" as const;

export class SpotifyAuthClient implements SpotifyAuth {
  async getAccessToken(refreshToken: string): Promise<string> {
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!id || !secret) throw new Error("Missing Spotify client credentials");
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    const basic = (typeof Buffer !== "undefined"
      ? Buffer.from(`${id}:${secret}`).toString("base64")
      : btoa(`${id}:${secret}`));
    const res = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) {
      let msg = String(res.status);
      try {
        const t = await res.text();
        msg = `${res.status} ${t.slice(0, 200)}`;
      } catch {}
      throw new Error(`Token refresh failed: ${msg}`);
    }
    const json = (await res.json()) as { access_token?: string };
    if (!json.access_token) throw new Error("No access token in response");
    return json.access_token;
  }
}

export class SpotifyApiClient implements SpotifyApi {
  private async get<T>(url: string, token: string): Promise<T> {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 204) throw new Error("No content");
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  }

  async getCurrentlyPlaying(accessToken: string): Promise<Track | null> {
    try {
      type R = {
        item?: {
          name: string;
          artists: { name: string }[];
          album?: { name?: string; images?: { url: string }[] };
          external_urls?: { spotify?: string };
          duration_ms?: number;
        } | null;
        is_playing?: boolean;
        progress_ms?: number;
      };
      const data = await this.get<R>("https://api.spotify.com/v1/me/player/currently-playing", accessToken);
      if (!data?.item) return null;
      return {
        title: data.item.name,
        artist: data.item.artists?.map((a) => a.name).join(", ") ?? "",
        album: data.item.album?.name ?? "",
        coverUrl: data.item.album?.images?.[0]?.url ?? null,
        spotifyUrl: data.item.external_urls?.spotify ?? null,
        isPlaying: Boolean(data.is_playing),
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
      };
    } catch {
      return null;
    }
  }

  async getRecentlyPlayed(accessToken: string): Promise<Track | null> {
    try {
      type R = {
        items?: Array<{
          track?: {
            name: string;
            artists: { name: string }[];
            album?: { name?: string; images?: { url: string }[] };
            external_urls?: { spotify?: string };
            duration_ms?: number;
          };
        }>;
      };
      const data = await this.get<R>("https://api.spotify.com/v1/me/player/recently-played?limit=1", accessToken);
      const first = data.items?.[0]?.track;
      if (!first) return null;
      return {
        title: first.name,
        artist: first.artists?.map((a) => a.name).join(", ") ?? "",
        album: first.album?.name ?? "",
        coverUrl: first.album?.images?.[0]?.url ?? null,
        spotifyUrl: first.external_urls?.spotify ?? null,
        isPlaying: false,
        durationMs: first.duration_ms,
      };
    } catch {
      return null;
    }
  }
}
