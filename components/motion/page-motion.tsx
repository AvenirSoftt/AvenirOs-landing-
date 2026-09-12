"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Хореография всей страницы в одном месте.
 *
 * Почему одним файлом, а не «немножко анимации в каждой секции»: движение
 * должно читаться как ОДИН замысел. Когда каждая секция анимирует себя сама,
 * тайминги и кривые расходятся, и страница начинает дёргаться по кускам.
 *
 * Разделение обязанностей:
 *   • здесь — крупное: вход первого экрана, заголовки по строкам, сборка схемы
 *     под прокрутку, параллакс подложек, выезд карточек пачками;
 *   • в CSS (`data-shown`, globals.css) — мелкое ВНУТРИ макетов интерфейса:
 *     полосы, графики, кольцо. Оно продолжает работать, даже если этот скрипт
 *     не загрузился, — поэтому CSS-появление остаётся запасным слоем, а при
 *     живом GSAP гасится классом `motion-on` (иначе две системы анимируют
 *     одно и то же и спорят за прозрачность).
 *
 * Кривые везде свои (`expo.out`, `power4.out`, `none` для scrub): браузерные
 * `ease`/`linear` читаются как «движение не настраивали».
 */
/**
 * Построчная разбивка заголовка с обрезкой — и снятием обрезки после приезда.
 *
 * `mask: "lines"` заворачивает каждую строку в обёртку с `overflow: clip`:
 * без неё строка выезжает «из ниоткуда», а не из-под предыдущей. Но та же
 * обрезка режет выносные элементы букв — у «g», «j», «y» отрезает хвосты, и на
 * заголовке в 100+ пикселей это первое, что бросается в глаза. Обрезка нужна
 * ровно на время движения, поэтому по окончании она снимается.
 */
function splitLines(el: HTMLElement) {
  const split = SplitText.create(el, { type: "lines", mask: "lines" });
  const masks =
    (split as unknown as { masks?: Element[] }).masks ??
    split.lines.map((l) => (l as HTMLElement).parentElement).filter(Boolean);
  return { lines: split.lines, unmask: () => gsap.set(masks as Element[], { overflow: "visible" }) };
}

export function PageMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      document.documentElement.classList.add("motion-on");

      // ── Первый экран ────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const heroTitle = document.querySelector<HTMLElement>("[data-hero-title]");

      if (heroTitle) {
        // Разбивка на СТРОКИ, а не на буквы: побуквенная россыпь на длинном
        // узбекском заголовке читается как аттракцион, а не как продукт.
        const { lines, unmask } = splitLines(heroTitle);
        tl.from(lines, { yPercent: 120, duration: 1.15, stagger: 0.09, onComplete: unmask });
      }

      // Плашки над заголовком больше нет — вход начинается с подзаголовка.
      tl.from("[data-hero-lead]", { y: 18, opacity: 0, duration: 0.9 }, 0.35)
        .from(
          "[data-hero-cta] > *",
          { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 },
          "-=0.6",
        )
        .from(
          "[data-hero-facts] > *",
          { y: 10, opacity: 0, duration: 0.6, stagger: 0.06 },
          "-=0.5",
        )
        .from(
          "[data-hero-screen]",
          { y: 64, scale: 0.955, opacity: 0, duration: 1.4, ease: "power4.out" },
          "-=0.8",
        );

      // Панель уезжает вглубь: наклон и затухание дают ощущение, что интерфейс
      // лежит в пространстве, а не приклеен к странице.
      gsap.to("[data-hero-screen]", {
        yPercent: 5,
        scale: 0.97,
        opacity: 0.5,
        rotateX: 5,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-screen]",
          start: "top 12%",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // ── Заголовки секций: построчный выезд из-под маски ──────────────────
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const { lines, unmask } = splitLines(el);
        gsap.from(lines, {
          yPercent: 115,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          onComplete: unmask,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // ── Пачки карточек, строк и плиток ──────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>(":scope > *", group);
        if (items.length < 2) return;
        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      // ── Простое появление блока (там, где дробить не на что) ────────────
      gsap.utils.toArray<HTMLElement>("[data-appear]").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // ── Параллакс: только декоративные подложки, никогда не текст ───────
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax || 20),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Схема «Bitta tizim»: подписной момент страницы ──────────────────
      // Секция закрепляется, и система СОБИРАЕТСЯ под прокрутку: центр, потом
      // связи, потом разделы. Человек буквально собирает её, пока крутит.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Закрепляем СЕКЦИЮ, а не рисунок внутри неё. Когда пинится середина
        // секции, её заголовок и вывод уезжают вверх, а на месте рисунка
        // остаётся пустая полоса высотой в прокрутку — так и было в первой
        // версии: между схемой и следующим блоком зияла дыра.
        const section = document.querySelector<HTMLElement>("[data-eco-section]");
        const eco = document.querySelector<HTMLElement>("[data-eco]");
        if (!section || !eco) return;

        const lines = gsap.utils.toArray<SVGLineElement>("[data-eco-line]", eco);
        const nodes = gsap.utils.toArray<SVGGElement>("[data-eco-node]", eco);
        const core = eco.querySelector("[data-eco-core]");
        const dots = gsap.utils.toArray<SVGCircleElement>("[data-eco-dot]", eco);

        // Длину каждой связи берём у самого элемента: рисование без
        // Club-плагина — это dasharray с dashoffset, и он обязан совпадать с
        // реальной длиной отрезка, иначе линия «доезжает» не до узла.
        lines.forEach((l) => {
          const len = l.getTotalLength();
          gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(dots, { opacity: 0 });

        const build = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1100",
            pin: section,
            scrub: 0.8,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });

        build
          .from(core, { scale: 0.6, opacity: 0, duration: 0.5, ease: "power2.out" })
          .to(lines, { strokeDashoffset: 0, duration: 1.1, stagger: 0.05 }, 0.25)
          .from(
            nodes,
            { scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" },
            0.55,
          )
          .to(dots, { opacity: 1, duration: 0.3 }, 1.4)
          // Вывод под схемой появляется последним — когда система уже собрана.
          .from("[data-eco-tail]", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, 1.5)
          .to({}, { duration: 0.5 });

        return () => {
          gsap.set([...lines, ...nodes, ...dots], { clearProps: "all" });
        };
      });

      // ── Свет за секциями расходится по мере прокрутки ───────────────────
      gsap.utils.toArray<HTMLElement>("[data-glow]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0.75 },
          {
            scale: 1.2,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return <div ref={scope} aria-hidden="true" className="hidden" />;
}
