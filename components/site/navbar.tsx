"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/site/mark";
import { LangSwitch } from "@/components/site/lang-switch";
import { Button } from "@/components/ui/button";
import { useSmooth } from "@/components/motion/smooth-scroll";
import type { Dict, Locale } from "@/lib/i18n";

/**
 * Шапка: прозрачная на самом верху, тёмная со стеклом — после прокрутки.
 *
 * Порог в 24 пикселя, а не «больше нуля»: иначе шапка меняет вид от лёгкого
 * рывка страницы и мигает на каждом касании тачпада.
 */
export function Navbar({ d, lang }: { d: Dict; lang: Locale }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#mahsulot", label: d.nav.product },
    { href: "#imkoniyatlar", label: d.nav.features },
    { href: "#modullar", label: d.nav.modules },
    { href: "#analitika", label: d.nav.analytics },
    { href: "#faq", label: d.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Под открытым меню страница не должна ехать. При плавной прокрутке это
  // делает сам Lenis (`stop`), а `overflow: hidden` остаётся для случая, когда
  // скрипт не загрузился.
  const smooth = useSmooth();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) smooth.stop();
    else smooth.start();
    return () => {
      document.body.style.overflow = "";
      smooth.start();
    };
  }, [open, smooth]);

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
        aria-label={d.nav.product}
      >
        <a href={`/${lang}`} aria-label={d.nav.home} className="shrink-0">
          <Logo size={34} />
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
          <LangSwitch lang={lang} label={d.nav.langLabel} />
          {/* Оборачиваем, а не гасим классом: у кнопки в базе свой display,
              и `hidden` с ним спорит — на телефоне она всё равно вылезала. */}
          <span className="hidden sm:block">
            <Button href="#demo" size="md" className="!py-2">
              {d.nav.demo}
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-snow-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menyu"
            aria-label={open ? d.nav.menuClose : d.nav.menuOpen}
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
              {d.nav.demo}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
