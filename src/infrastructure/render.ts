import type { Track } from "../domain/track";

export function renderJson(track: Track | null) {
  return Response.json(track ?? { track: null });
}

export function renderSvg(track: Track | null) {
  const title = track?.title ?? "Nothing playing";
  const artist = track?.artist ?? "";
  const isPlaying = Boolean(track?.isPlaying);
  const progress = Number(track?.progressMs ?? 0);
  const duration = Number(track?.durationMs ?? 0);
  const cover = track?.coverUrl ?? null;
  const spotifyHref = track?.spotifyUrl ?? null;

  const W = 600;
  const H = 110;
  const P = 16;
  const coverSize = 78;
  const textX = cover ? P + coverSize + 14 : P;
  const barY = 80;
  const barW = W - textX - P;
  const pct = duration > 0 ? Math.max(0, Math.min(1, progress / duration)) : 0;

  const tTitle = escapeXml(truncate(title, 44));
  const tArtist = escapeXml(truncate(artist, 60));
  const status = isPlaying ? "Now Playing" : "Last Played";
  const aria = `${status}: ${title}${artist ? " — " + artist : ""}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" role="img" aria-label="${escapeXml(aria)}">
  <defs>
    <clipPath id="coverClip"><rect x="${P}" y="${P}" width="${coverSize}" height="${coverSize}" rx="8"/></clipPath>
  </defs>
  <rect width="100%" height="100%" rx="12" fill="#0f0f0f"/>
  <a href="https://linkedin.com/hsnlbnan" target="_blank" rel="noopener noreferrer">
    <text x="${W - P}" y="${P + 14}" font-size="12" fill="#cbd5e1" text-anchor="end" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">hsnlbnan</text>
  </a>
  ${cover ? `<image href="${escapeXml(cover)}" x="${P}" y="${P}" width="${coverSize}" height="${coverSize}" clip-path="url(#coverClip)"/>` : ""}
  <g font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" fill="#fff">
    <text x="${textX}" y="${P + 6}" font-size="12" fill="#9ca3af">${isPlaying ? "▶" : "⏸"} ${status}</text>
    <text x="${textX}" y="${P + 30}" font-size="20" font-weight="600">${tTitle}</text>
    ${artist ? `<text x="${textX}" y="${P + 52}" font-size="14" fill="#cbd5e1">${tArtist}</text>` : ""}
  </g>
  <g>
    <rect x="${textX}" y="${barY}" width="${barW}" height="6" rx="3" fill="#222"/>
    <rect x="${textX}" y="${barY}" width="${Math.round(barW * pct)}" height="6" rx="3" fill="#1DB954"/>
    ${duration > 0 ? `<text x="${textX}" y="${barY + 20}" font-size="11" fill="#9ca3af" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">${msToClock(progress)} / ${msToClock(duration)}</text>` : ""}
    ${spotifyHref ? `<a href="${escapeXml(spotifyHref)}" target="_blank" rel="noopener noreferrer"><text x="${W - P}" y="${barY + 20}" font-size="12" fill="#1DB954" text-anchor="end" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">Open in Spotify</text></a>` : ""}
  </g>
</svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "s-maxage=5, stale-while-revalidate=55",
    },
  });
}

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function msToClock(ms: number) {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
