import type { Track } from "../domain/track";

export function renderJson(track: Track | null) {
  return Response.json(track ?? { track: null }, {
    headers: {
      "Cache-Control": "s-maxage=12, stale-while-revalidate=60",
    },
  });
}

export type RenderOptions = {
  showCover?: boolean;
  showLink?: boolean;
  showTime?: boolean;
  showProgress?: boolean;
  theme?: "dark" | "light";
  layout?: "horizontal" | "vertical";
  variant?: "default" | "compact";
};

export function renderSvg(track: Track | null, opts: RenderOptions = {}) {
  const title = track?.title ?? "Nothing playing";
  const artist = track?.artist ?? "";
  const isPlaying = Boolean(track?.isPlaying);
  const progress = Number(track?.progressMs ?? 0);
  const duration = Number(track?.durationMs ?? 0);
  const showCover = opts.showCover !== false;
  const showLink = opts.showLink !== false;
  const showTime = opts.showTime !== false;
  const showProgress = opts.showProgress !== false;
  const theme = opts.theme ?? "dark";
  const layout = opts.layout ?? "horizontal";
  const variant = opts.variant ?? "default";
  const cover = showCover ? (track?.coverUrl ?? null) : null;
  const spotifyHref = track?.spotifyUrl ?? null;

  const palette = theme === "light"
    ? {
        bg: "#ffffff",
        fg: "#111827",
        muted: "#6b7280",
        barBg: "#e5e7eb",
        accent: "#1DB954",
      }
    : {
        bg: "#0f0f0f",
        fg: "#ffffff",
        muted: "#9ca3af",
        barBg: "#222",
        accent: "#1DB954",
      };

  const isVertical = layout === "vertical";
  const isCompact = variant === "compact";
  const W = isVertical ? (isCompact ? 380 : 420) : (isCompact ? 520 : 600);
  const baseH = isVertical ? (isCompact ? 140 : 220) : (isCompact ? 64 : 110);
  const P = isCompact ? 12 : 16;
  const coverSize = isVertical ? (isCompact ? 72 : 96) : (isCompact ? 0 : 78);
  const textX = isVertical ? P : (cover ? P + coverSize + 14 : P);
  let barY = isVertical ? (isCompact ? 110 : 170) : (isCompact ? 44 : 80);
  const barW = isVertical ? W - P * 2 : W - textX - P;
  const pct = duration > 0 ? Math.max(0, Math.min(1, progress / duration)) : 0;

  const tTitle = escapeXml(truncate(title, 44));
  const tArtist = escapeXml(truncate(artist, 60));
  const status = isPlaying ? "Now Playing" : "Last Played";
  const aria = `${status}: ${title}${artist ? " — " + artist : ""}`;

  const coverX = isVertical ? (W - coverSize) / 2 : P;
  const coverH = isVertical ? (cover ? coverSize : 0) : 0;
  const statusY = isVertical ? P + coverH + (isCompact ? 6 : 10) : P + (isCompact ? 4 : 6);
  const titleY = isVertical ? P + coverH + (isCompact ? 26 : 34) : P + (isCompact ? 22 : 30);
  const artistY = isVertical ? P + coverH + (isCompact ? 42 : 54) : P + (isCompact ? 38 : 52);
  if (isVertical && (showProgress && !isCompact)) {
    barY = (artist ? artistY : titleY) + 16;
  }
  const linkY = isCompact ? statusY : (barY + 20);
  let bottom = artist ? artistY : titleY;
  if (showProgress && !isCompact) bottom = Math.max(bottom, barY + 6);
  if (showTime && !isCompact && duration > 0) bottom = Math.max(bottom, barY + 20);
  if (showLink && spotifyHref) bottom = Math.max(bottom, linkY);
  const minH = isVertical ? (isCompact ? 96 : 120) : baseH;
  const finalH = isVertical ? Math.max(minH, bottom + P + 8) : baseH;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${finalH}" role="img" aria-label="${escapeXml(aria)}">
  <defs>
    ${cover ? `<clipPath id="coverClip"><rect x="${coverX}" y="${P}" width="${coverSize}" height="${coverSize}" rx="8"/></clipPath>` : ``}
  </defs>
  <rect width="100%" height="${finalH}" rx="12" fill="${palette.bg}"/>
  <a href="https://linkedin.com/in/husnu" target="_blank" rel="noopener noreferrer">
    <text x="${W - P}" y="${P + 14}" font-size="12" fill="${palette.muted}" text-anchor="end" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">hsnlbnan</text>
  </a>
  ${cover ? `<image href="${escapeXml(cover!)}" x="${coverX}" y="${P}" width="${coverSize}" height="${coverSize}" clip-path="url(#coverClip)"/>` : ``}
  <g font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" fill="${palette.fg}">
    <text x="${isVertical ? P : textX}" y="${statusY}" font-size="${isCompact ? 11 : 12}" fill="${palette.muted}">${isPlaying ? "▶" : "⏸"} ${status}</text>
    <text x="${isVertical ? P : textX}" y="${titleY}" font-size="${isCompact ? 16 : 20}" font-weight="600">${tTitle}</text>
    ${artist ? `<text x="${isVertical ? P : textX}" y="${artistY}" font-size="${isCompact ? 12 : 14}" fill="${palette.muted}">${tArtist}</text>` : ``}
  </g>
  <g>
    ${showProgress && !isCompact ? `<rect x="${isVertical ? P : textX}" y="${barY}" width="${barW}" height="6" rx="3" fill="${palette.barBg}"/>` : ``}
    ${showProgress && !isCompact ? `<rect x="${isVertical ? P : textX}" y="${barY}" width="${Math.round(barW * pct)}" height="6" rx="3" fill="${palette.accent}"/>` : ``}
    ${showTime && !isCompact && duration > 0 ? `<text x="${isVertical ? P : textX}" y="${barY + 20}" font-size="11" fill="${palette.muted}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">${msToClock(progress)} / ${msToClock(duration)}</text>` : ``}
    ${showLink && spotifyHref ? `<a href="${escapeXml(spotifyHref)}" target="_blank" rel="noopener noreferrer"><text x="${W - P}" y="${isCompact ? statusY : barY + 20}" font-size="12" fill="${palette.accent}" text-anchor="end" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">Open in Spotify</text></a>` : ``}
  </g>
</svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "s-maxage=12, stale-while-revalidate=60",
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
