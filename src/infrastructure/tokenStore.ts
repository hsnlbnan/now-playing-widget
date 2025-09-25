import type { TokenStore } from "../domain/ports";
import { kvGet, kvSet } from "./kv";

export class KvOrEnvTokenStore implements TokenStore {
  private map: Record<string, string>;
  private readonly useKv: boolean;
  constructor(source = process.env.TOKENS_JSON ?? "{}") {
    try {
      this.map = JSON.parse(source);
    } catch {
      this.map = {};
    }
    this.useKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  }
  async getRefreshToken(user: string): Promise<string | null> {
    const key = `nowplay:refresh:${user}`;
    if (this.useKv) {
      return (await kvGet(key));
    }
    return this.map[user] ?? null;
  }
  async setRefreshToken(user: string, refreshToken: string): Promise<void> {
    const key = `nowplay:refresh:${user}`;
    if (this.useKv) {
      await kvSet(key, refreshToken);
      return;
    }
    this.map[user] = refreshToken;
  }
}
