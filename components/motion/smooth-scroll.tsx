"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Плавная прокрутка (Lenis) + синхронизация со ScrollTrigger.
 *
 * Зачем вообще: обычная прокрутка мгновенна и «механична» — сколько прокрутил,
 * туда и прыгнуло. У страницы с scroll-driven анимациями от этого рвётся связь
 * между движением руки и движением на экране. Lenis добавляет инерцию, и та же
 * анимация начинает читаться как единое движение.
 *
 * Два обязательных условия из документации, без которых всё ломается тихо:
 *   1. Lenis крутит время сам, поэтому его RAF ВЕДЁТ тикер GSAP, а не
 *      собственный цикл (`autoRaf` выключен) — иначе два цикла спорят и скролл
 *      дрожит.
 *   2. Ссылку на колбэк тикера надо сохранить и снять при размонтировании:
 *      без `gsap.ticker.remove` колбэки накапливаются на каждом переходе.
 *
 * `prefers-reduced-motion` выключает Lenis целиком: инерция — это ровно то
 * движение, от которого людям с вестибулярной чувствительностью плохо.
 */

/** Высота липкой шапки: на неё смещаются все переходы по якорям. */
const HEADER = 88;

type Ctl = { stop: () => void; start: () => void };

const SmoothCtx = createContext<Ctl>({ stop: () => {}, start: () => {} });

export const useSmooth = () => useContext(SmoothCtx);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Экспоненциальное затухание: быстро подхватывает и мягко останавливает.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Тач не трогаем: родная прокрутка на телефоне лучше любой имитации.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    // Доводка после перехода по якорю.
    //
    // Замер показал вот что: высота документа и абсолютное положение цели за
    // время прокрутки не меняются, но реальный `scrollY` останавливается на
    // ~96px раньше, чем считает Lenis. То есть расходятся не страница с целью,
    // а внутреннее состояние Lenis с настоящей прокруткой — и обычный повторный
    // `scrollTo(цель)` оказывается пустышкой: Lenis уверен, что уже приехал.
    //
    // Поэтому сначала внутреннее состояние принудительно приравнивается к
    // реальному положению (`immediate` заодно делает настоящий scrollTo), и
    // только потом доезжаем коротким движением. Проверка повторяется несколько
    // раз с паузой: сдвиг случается уже после остановки.
    const settle = (target: HTMLElement, tries = 0) => {
      const delta = Math.round(target.getBoundingClientRect().top - HEADER);
      if (Math.abs(delta) <= 2 || tries >= 4) return;
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      lenis.scrollTo(window.scrollY + delta, {
        duration: 0.35,
        force: true,
        onComplete: () => window.setTimeout(() => settle(target, tries + 1), 140),
      });
    };

    // Якоря ведёт Lenis: иначе браузер прыгает мгновенно и инерция теряется.
    // Отступ — под липкую шапку.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
        return;
      }
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -HEADER,
        duration: 1.3,
        onComplete: () => window.setTimeout(() => settle(target), 80),
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothCtx.Provider
      value={{
        stop: () => lenisRef.current?.stop(),
        start: () => lenisRef.current?.start(),
      }}
    >
      {children}
    </SmoothCtx.Provider>
  );
}
