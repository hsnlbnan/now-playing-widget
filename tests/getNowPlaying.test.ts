import { describe, expect, it } from "bun:test";
import { getNowPlaying } from "../src/application/getNowPlaying";
import type { SpotifyApi, SpotifyAuth, TokenStore } from "../src/domain/ports";

const tokens: TokenStore = {
  async getRefreshToken(user: string) {
    return user === "alice" ? "r1" : null;
  },
  async setRefreshToken() {},
};

const auth: SpotifyAuth = {
  async getAccessToken(refreshToken: string) {
    return refreshToken === "r1" ? "a1" : "";
  },
};

const apiCurrent: SpotifyApi = {
  async getCurrentlyPlaying() {
    return {
      title: "Fix You",
      artist: "Coldplay",
      album: "X&Y",
      coverUrl: null,
      spotifyUrl: null,
      isPlaying: true,
      progressMs: 10,
      durationMs: 100,
    };
  },
  async getRecentlyPlayed() {
    return null;
  },
};

const apiRecent: SpotifyApi = {
  async getCurrentlyPlaying() {
    return null;
  },
  async getRecentlyPlayed() {
    return {
      title: "Yellow",
      artist: "Coldplay",
      album: "Parachutes",
      coverUrl: null,
      spotifyUrl: null,
      isPlaying: false,
      durationMs: 100,
    };
  },
};

describe("getNowPlaying", () => {
  it("returns current when playing", async () => {
    const track = await getNowPlaying("alice", { tokens, auth, api: apiCurrent });
    expect(track?.title).toBe("Fix You");
    expect(track?.isPlaying).toBe(true);
  });
  it("falls back to recent when not playing", async () => {
    const track = await getNowPlaying("alice", { tokens, auth, api: apiRecent });
    expect(track?.title).toBe("Yellow");
    expect(track?.isPlaying).toBe(false);
  });
  it("returns null for unknown user", async () => {
    const track = await getNowPlaying("bob", { tokens, auth, api: apiCurrent });
    expect(track).toBeNull();
  });
});
