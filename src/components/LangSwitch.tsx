"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function LangSwitch() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-1 py-1 text-xs text-white/80">
      <button
        className={`
          px-2.5 py-1 rounded-full font-medium transition-all duration-200 ease-out
          ${locale === "tr" 
            ? "bg-[#1DB954] text-black shadow-sm" 
            : "hover:bg-white/15 hover:text-white"
          }
        `}
        onClick={() => setLocale("tr")}
      >
        🇹🇷 TR
      </button>
      <button
        className={`
          px-2.5 py-1 rounded-full font-medium transition-all duration-200 ease-out
          ${locale === "en" 
            ? "bg-[#1DB954] text-black shadow-sm" 
            : "hover:bg-white/15 hover:text-white"
          }
        `}
        onClick={() => setLocale("en")}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
