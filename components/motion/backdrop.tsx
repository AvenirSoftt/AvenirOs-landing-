"use client";

import { useEffect, useRef } from "react";

/**
 * Живой фон страницы.
 *
 * Три слоя, каждый со своей задачей — вместе они дают глубину, которой у
 * плоской заливки нет:
 *
 *   1. **Северное сияние.** Три больших размытых пятна фирменных цветов,
 *      которые медленно расходятся и сходятся. Движение почти незаметное
 *      (40-60 секунд на круг): фон должен ощущаться живым, а не отвлекать.
 *   2. **Сетка.** Техническая подложка, привязанная к прокрутке — вместе со
 *      страницей она едет чуть медленнее и создаёт параллакс.
 *   3. **Свет под курсором.** Мягкое пятно, которое следует за мышью с
 *      отставанием. Обновляется через CSS-переменные и rAF, поэтому на каждое
 *      движение мыши не случается перерисовки макета.
 *
 * Всё это — `position: fixed` под контентом (`z-index: -1`), только `transform`
 * и `opacity`, никаких перерисовок. На телефоне свет под курсором выключен:
 * там нет курсора, а лишний слушатель есть.
 */
export function Backdrop() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = spot.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      // Отставание в 8% за кадр: пятно догоняет курсор, а не приклеено к нему —
      // приклеенное читается как курсор, а не как свет.
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      node.style.setProperty("--x", `${x.toFixed(1)}px`);
      node.style.setProperty("--y", `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Сияние */}
      <span className="aurora aurora-a" />
      <span className="aurora aurora-b" />
      <span className="aurora aurora-c" />

      {/* Техническая сетка */}
      <span className="absolute inset-0 grid-lines opacity-[0.55] [mask-image:radial-gradient(85%_70%_at_50%_30%,#000_20%,transparent_100%)]" />

      {/* Свет под курсором */}
      <div
        ref={spot}
        className="absolute inset-0 opacity-70 mix-blend-screen [background:radial-gradient(320px_320px_at_var(--x,50%)_var(--y,30%),rgba(56,189,248,0.10),transparent_70%)]"
      />
    </div>
  );
}
