"use client";

import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/lib/i18n";

/**
 * Выбор языка — настоящий, с тремя рабочими версиями страницы.
 *
 * Раньше здесь стояли три подписи, где две были мёртвыми: человек жал «RU» и
 * ничего не происходило. Теперь это меню, и каждый пункт — ссылка на свой
 * адрес (`/uz`, `/ru`, `/en`): версией можно поделиться, а поиск видит три
 * страницы вместо одной.
 *
 * Выбор запоминается в куке — прокси на корне сайта учитывает её раньше, чем
 * язык браузера. Клавиатура работает как в любом меню: Esc закрывает, клик
 * мимо тоже. Закрытое меню скрыто по-настоящему (`invisible`), а не просто
 * прозрачно, иначе оно остаётся в дереве доступности.
 */

const names: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (code: Locale) => {
    // Год жизни: язык выбирают один раз, а не каждую сессию.
    document.cookie = `lang=${code}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-semibold uppercase text-snow-2 transition-colors duration-300 hover:border-line/70 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <GlobeIcon />
        {lang}
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="menu"
        aria-label={label}
        className={`absolute right-0 top-[calc(100%+8px)] w-[196px] origin-top-right rounded-xl border border-line bg-panel/95 p-1.5 shadow-[0_24px_60px_-24px_rgba(2,6,23,0.9)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-[0.97] opacity-0"
        }`}
      >
        {locales.map((code) => {
          const active = code === lang;
          return (
            <a
              key={code}
              href={`/${code}`}
              role="menuitemradio"
              aria-checked={active}
              onClick={() => pick(code)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] transition-colors ${
                active ? "bg-white/[0.07] text-snow" : "text-snow-2 hover:bg-white/[0.04] hover:text-snow"
              }`}
            >
              <span className="w-6 text-[11px] font-semibold uppercase tracking-wide">{code}</span>
              <span className="flex-1">{names[code]}</span>
              {active ? (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-accent">
                  <path d="M3 8.5 6.3 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.4 6.4h11.2M2.4 9.6h11.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 2c1.7 1.7 2.6 3.7 2.6 6S9.7 12.3 8 14C6.3 12.3 5.4 10.3 5.4 8S6.3 3.7 8 2Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
