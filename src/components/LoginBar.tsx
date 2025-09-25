"use client";

import { useAppState } from "@/state/AppState";
import { useI18n } from "@/i18n/I18nProvider";

export default function LoginBar() {
  const { login } = useAppState();
  const { t } = useI18n();
  return (
    <div className="mt-5">
      <button onClick={login} className="rounded-xl bg-[#1DB954] px-5 py-3 text-sm font-semibold text-black hover:brightness-95 transition-all">
        {t("login.button")}
      </button>
    </div>
  );
}
