export const runtime = "edge";

const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user");
  if (!user) return new Response("Missing ?user=", { status: 400 });
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  if (!clientId || !redirectUri) return new Response("Missing Spotify env", { status: 500 });

  const nonce = crypto.getRandomValues(new Uint8Array(12)).reduce((s, b) => s + b.toString(16).padStart(2, "0"), "");
  const state = `${user}:${nonce}`;

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("show_dialog", "true");

  const res = new Response(null, {
    status: 302,
    headers: { Location: authUrl.toString() },
  });
  res.headers.append(
    "Set-Cookie",
    `sp_state=${nonce}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return res;
}
