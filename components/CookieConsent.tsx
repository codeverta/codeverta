import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const STORAGE_KEY = "codeverta_cookie_consent";

type ConsentState = "accepted" | "rejected";

export default function CookieConsent() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  const saveConsent = (value: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent("codeverta-cookie-consent", { detail: value })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] print:hidden">
      <div className="mx-auto max-w-5xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur md:mb-4 md:rounded-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-slate-900">
              {t("cookieConsent.title")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {t("cookieConsent.description")}{" "}
              <Link href="/privacy-policy" className="font-medium underline">
                {t("cookieConsent.learnMore")}
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => saveConsent("rejected")}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t("cookieConsent.reject")}
            </button>
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {t("cookieConsent.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
