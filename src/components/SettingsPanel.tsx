"use client";

import { useAppState } from "@/state/AppState";
import FeatureToggle from "@/components/ui/FeatureToggle";
import StyleOption from "@/components/ui/StyleOption";
import { ThemeIcon, LayoutIcon, VariantIcon } from "@/components/icons/SettingsIcons";
import { useI18n } from "@/i18n/I18nProvider";

export default function SettingsPanel() {
  const { t } = useI18n();
  const {
    showCover,
    setShowCover,
    showLink,
    setShowLink,
    showTime,
    setShowTime,
    showProgress,
    setShowProgress,
    theme,
    setTheme,
    layout,
    setLayout,
    variant,
    setVariant,
  } = useAppState();

  return (
    <div className="mt-5 space-y-4 max-w-3xl">
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white/95">Widget Özellikleri</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <FeatureToggle
              label={t("settings.labels.cover")}
              checked={showCover}
              onChange={setShowCover}
            />
            <FeatureToggle
              label={t("settings.labels.link")}
              checked={showLink}
              onChange={setShowLink}
            />
            <FeatureToggle
              label={t("settings.labels.time")}
              checked={showTime}
              onChange={setShowTime}
            />
            <FeatureToggle
              label={t("settings.labels.progress")}
              checked={showProgress}
              onChange={setShowProgress}
            />
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white/95">Görünüm Ayarları</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StyleOption
              icon={<ThemeIcon />}
              label={t("settings.labels.theme")}
              value={theme}
              onChange={(value) => setTheme(value as "dark" | "light")}
              options={[
                { value: "dark", label: t("settings.labels.dark") },
                { value: "light", label: t("settings.labels.light") }
              ]}
            />
            <StyleOption
              icon={<LayoutIcon />}
              label={t("settings.labels.layout")}
              value={layout}
              onChange={(value) => setLayout(value as "horizontal" | "vertical")}
              options={[
                { value: "horizontal", label: t("settings.labels.horizontal") },
                { value: "vertical", label: t("settings.labels.vertical") }
              ]}
            />
            <StyleOption
              icon={<VariantIcon />}
              label={t("settings.labels.variant")}
              value={variant}
              onChange={(value) => setVariant(value as "default" | "compact")}
              options={[
                { value: "default", label: t("settings.labels.default") },
                { value: "compact", label: t("settings.labels.compact") }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
