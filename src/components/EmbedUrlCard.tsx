"use client";
import { useState } from "react";
import { useEmbedUrl } from "@/state/AppState";
import { useI18n } from "@/i18n/I18nProvider";

type CopyState = {
  url: boolean;
  markdown: boolean;
};

export default function EmbedUrlCard() {
  const embedUrl = useEmbedUrl();
  const { t } = useI18n();
  const [copied, setCopied] = useState<CopyState>({ url: false, markdown: false });

  const handleCopy = async (type: 'url' | 'markdown', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [type]: true }));
      
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  if (!embedUrl) return null;

  return (
    <div className="mt-5 max-w-2xl rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/70 mb-2">{t("embed.title")}</div>
      <input readOnly value={embedUrl} className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs" />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <CopyButton
          onClick={() => handleCopy('url', embedUrl)}
          copied={copied.url}
          defaultText={t("embed.copyUrl")}
          copiedText={t("embed.copied")}
        />
        <CopyButton
          onClick={() => handleCopy('markdown', `![Spotify Now Playing](${embedUrl})`)}
          copied={copied.markdown}
          defaultText={t("embed.copyMd")}
          copiedText={t("embed.copied")}
        />
      </div>
    </div>
  );
}

function CopyButton({ 
  onClick, 
  copied, 
  defaultText, 
  copiedText 
}: { 
  onClick: () => void; 
  copied: boolean; 
  defaultText: string; 
  copiedText: string; 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg border px-3 py-2 text-xs font-medium
        cursor-pointer transition-all duration-200 ease-out
        hover:scale-105 active:scale-95
        ${copied
          ? 'border-[#1DB954]/30 bg-[#1DB954]/10 text-[#1DB954] shadow-lg shadow-[#1DB954]/20'
          : 'border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/25'
        }
      `}
    >
      <span className={`
        flex items-center gap-2 transition-all duration-300 ease-out
        ${copied ? 'transform translate-y-0 opacity-100' : 'transform translate-y-0 opacity-100'}
      `}>
        {copied ? (
          <>
            <CheckIcon />
            {copiedText}
          </>
        ) : (
          <>
            <CopyIcon />
            {defaultText}
          </>
        )}
      </span>

      {/* Success animation overlay */}
      {copied && (
        <div className="absolute inset-0 bg-[#1DB954]/5 animate-pulse" />
      )}
    </button>
  );
}

const CopyIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);
