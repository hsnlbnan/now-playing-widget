import { useI18n } from "@/i18n/I18nProvider";

export default function ContactFooter() {
  const { t } = useI18n();
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/80 backdrop-blur-md text-xs text-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{t("contact.text")}</span>
            <a href="https://linkedin.com/in/husnu" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-white/90 underline-offset-4 hover:underline transition-colors">
              {t("legal.privacy.title")}
            </a>
            <a href="/terms" className="text-white/90 underline-offset-4 hover:underline transition-colors">
              {t("legal.terms.title")}
            </a>
            <a href="https://vercel.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors">
              <VercelIcon />
              <span>Vercel</span>
            </a>
            <a href="https://spotify.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors">
              <SpotifyIcon />
              <span>Spotify</span>
            </a>
            <a href="https://upstash.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors">
              <UpstashIcon />
              <span>Upstash</span>
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span>{t("contact.text")}</span>
            <a href="https://linkedin.com/in/husnu" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/privacy" className="text-white/90 underline-offset-4 hover:underline transition-colors">
              {t("legal.privacy.title")}
            </a>
            <a href="/terms" className="text-white/90 underline-offset-4 hover:underline transition-colors">
              {t("legal.terms.title")}
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <a href="https://vercel.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1 transition-colors">
              <VercelIcon />
              <span>Vercel</span>
            </a>
            <a href="https://spotify.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1 transition-colors">
              <SpotifyIcon />
              <span>Spotify</span>
            </a>
            <a href="https://upstash.com" target="_blank" className="text-white/90 underline-offset-4 hover:underline flex items-center gap-1 transition-colors">
              <UpstashIcon />
              <span>Upstash</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Icon Components
const LinkedInIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const VercelIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 22.525H0l12-21.05 12 21.05z" />
  </svg>
);

const SpotifyIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const UpstashIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 472 472" fill="currentColor">
    <path d="M0.421875 412.975C78.5269 491.079 205.16 491.079 283.265 412.975C361.369 334.87 361.369 208.237 283.265 130.132L247.909 165.487C306.488 224.066 306.488 319.041 247.909 377.619C189.331 436.198 94.3559 436.198 35.7769 377.619L0.421875 412.975Z"/>
    <path d="M71.1328 342.264C110.185 381.316 173.501 381.316 212.554 342.264C251.606 303.212 251.606 239.895 212.554 200.843L177.199 236.198C196.725 255.724 196.725 287.382 177.199 306.909C157.672 326.435 126.014 326.435 106.488 306.909L71.1328 342.264Z"/>
    <path d="M353.974 59.421C275.869 -18.6835 149.236 -18.6835 71.1315 59.421C-6.97352 137.526 -6.97352 264.159 71.1315 342.264L106.486 306.909C47.9085 248.33 47.9085 153.355 106.486 94.777C165.065 36.198 260.04 36.198 318.618 94.777L353.974 59.421Z"/>
    <path d="M283.264 130.132C244.212 91.08 180.894 91.08 141.842 130.132C102.789 169.185 102.789 232.501 141.842 271.553L177.197 236.198C157.671 216.672 157.671 185.014 177.197 165.487C196.723 145.961 228.381 145.961 247.908 165.487L283.264 130.132Z"/>
  </svg>
);
