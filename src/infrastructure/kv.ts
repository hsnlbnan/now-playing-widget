const base = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

function ensureKv() {
  if (!base || !token) throw new Error("KV REST env not configured");
}

export async function kvGet(key: string): Promise<string | null> {
  ensureKv();
  const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string | null } | string | null;
  if (data && typeof data === "object" && "result" in data) return (data as any).result ?? null;
  return null;
}

export async function kvSet(key: string, value: string): Promise<void> {
  ensureKv();
  const res = await fetch(
    `${base}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`KV set failed: ${res.status}`);
}

export async function kvDel(key: string): Promise<void> {
  ensureKv();
  const res = await fetch(`${base}/del/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`KV del failed: ${res.status}`);
}
