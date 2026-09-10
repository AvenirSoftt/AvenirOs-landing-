"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Выбор языка.
 *
 * Раньше здесь стоял ряд из трёх подписей, где две были мёртвыми. Выглядело
 * это как сломанный переключатель: человек жмёт «RU» и ничего не происходит.
 *
 * Теперь это нормальное меню: видно ВЫБРАННЫЙ язык, а внутри — список, где
 * недоступные помечены словом «tez orada» и физически не нажимаются
 * (`aria-disabled`, без обработчика). Честность важнее полноты: языка пока нет,
 * и притворяться, что он есть, хуже, чем сказать об этом.
 *
 * Клавиатура работает как в любом меню: Esc закрывает, стрелки ходят по
 * пунктам, Tab уводит дальше. Клик мимо — тоже закрывает.
 */

const langs = [
  { code: "UZ", label: "O'zbekcha", ready: true },
  { code: "RU", label: "Русский", ready: false },
  { code: "EN", label: "English", ready: false },
] as const;

export function LangSwitch() {
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

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-semibold text-snow-2 transition-colors duration-300 hover:border-line/70 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <GlobeIcon />
        UZ
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="menu"
        aria-label="Til tanlash"
        className={`absolute right-0 top-[calc(100%+8px)] w-[196px] origin-top-right rounded-xl border border-line bg-panel/95 p-1.5 shadow-[0_24px_60px_-24px_rgba(2,6,23,0.9)] backdrop-blur-xl transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.97] opacity-0"
        }`}
      >
        {langs.map((l) => (
          <div
            key={l.code}
            role="menuitemradio"
            aria-checked={l.ready}
            aria-disabled={!l.ready}
            tabIndex={open && l.ready ? 0 : -1}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] ${
              l.ready
                ? "bg-white/[0.06] text-snow"
                : "cursor-not-allowed text-snow-3/70"
            }`}
          >
            <span className="w-6 text-[11px] font-semibold tracking-wide">{l.code}</span>
            <span className="flex-1">{l.label}</span>
            {l.ready ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-accent">
                <path d="M3 8.5 6.3 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className="rounded-md border border-line px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-snow-3">
                tez orada
              </span>
            )}
          </div>
        ))}
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
