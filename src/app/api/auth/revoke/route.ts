import { kvDel } from "@/infrastructure/kv";

export const runtime = "edge";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user");
  if (!user) return new Response("Missing ?user=", { status: 400 });
  const key = `nowplay:refresh:${user}`;
  try {
    await kvDel(key);
    return Response.json({ ok: true, deleted: key });
  } catch (e: any) {
    return new Response(String(e?.message ?? e), { status: 500 });
  }
}

export async function GET(req: Request) {
  return new Response("Use POST /api/auth/revoke?user=...", { status: 405 });
}

