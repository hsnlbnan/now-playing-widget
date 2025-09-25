"use client";
import { useAppState, useEmbedUrl } from "@/state/AppState";
import { useI18n } from "@/i18n/I18nProvider";

export default function EmbedPreview() {
  const { connected, hasCookieUser, username } = useAppState();
  const embedUrl = useEmbedUrl();
  const showOverlay = !connected && !hasCookieUser && Boolean(username);
  const { t } = useI18n();
  return (
    <div className="relative rounded-xl border border-white/10 bg-black/30 p-3">
      {embedUrl ? (
        <>
          <img src={embedUrl} alt="Now Playing preview" className="w-full rounded-lg" />
          {showOverlay && (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-black/60 backdrop-blur-sm text-white/80 text-sm">{t("preview.overlayLogin")}</div>
          )}
        </>
      ) : (
        <div className="grid h-28 place-items-center text-white/50 text-sm">{t("preview.empty")}</div>
      )}
    </div>
  );
}
