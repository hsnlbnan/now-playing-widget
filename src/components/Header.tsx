"use client";
import { useI18n } from "@/i18n/I18nProvider";
import Link from "next/link";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-[#1DB954]" />
        <span className="text-sm font-semibold tracking-wide text-white/80">{t("header.productName")}</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <a
          href="https://open.spotify.com"
          target="_blank"
          className="text-xs text-white/60 hover:text-white/80 transition-colors"
          rel="noopener noreferrer"
        >
          Spotify
        </a>
        
        <LangSwitch />
      </div>
    </header>
  );
}
