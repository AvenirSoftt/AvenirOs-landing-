"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#mahsulot", label: "Mahsulot" },
  { href: "#imkoniyatlar", label: "Imkoniyatlar" },
  { href: "#modullar", label: "Modullar" },
  { href: "#analitika", label: "Analitika" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Шапка: прозрачная на самом верху, тёмная со стеклом — после прокрутки.
 *
 * Порог в 24 пикселя, а не «больше нуля»: иначе шапка меняет вид от лёгкого
 * рывка страницы и мигает на каждом касании тачпада.
 */
export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Открытое мобильное меню не должно оставлять прокрутку под собой.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-line/80 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1200px] items-center gap-6 px-5 transition-[height] duration-300 sm:px-8 ${
          solid ? "h-14" : "h-[72px]"
        }`}
        aria-label="Asosiy navigatsiya"
      >
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight text-snow">
          <Logo />
          <span className="text-[15px]">
            Avenir<span className="text-primary-bright">OS</span>
          </span>
        </a>

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-[13.5px] text-snow-2 transition-colors hover:bg-white/5 hover:text-snow"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LangSwitch />
          <a
            href="#demo"
            className="hidden rounded-lg bg-primary px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-primary-bright sm:block"
          >
            Demo so&apos;rash
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-snow-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menyu"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          >
            <span className="relative block h-[9px] w-4">
              <i
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <i
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1 -rotate-45" : "top-2"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobil-menyu"
        hidden={!open}
        className="border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="space-y-1 px-5 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] text-snow-2"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-primary px-4 py-3 text-center text-[15px] font-medium text-white"
            >
              Demo so&apos;rash
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LangSwitch() {
  // Пока сделан только узбекский. Русский и английский не выдаём за готовые
  // ссылки — кнопка, которая ведёт в никуда, хуже честной пометки.
  return (
    <div className="flex items-center rounded-lg border border-line p-0.5" role="group" aria-label="Til">
      <span className="rounded-md bg-white/8 px-2 py-1 text-[11.5px] font-semibold text-snow">UZ</span>
      {["RU", "EN"].map((l) => (
        <span
          key={l}
          title="Tez orada"
          className="cursor-not-allowed px-2 py-1 text-[11.5px] font-medium text-snow-3/60"
        >
          {l}
        </span>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4 8 1.5Z" fill="white" />
      </svg>
    </span>
  );
}
