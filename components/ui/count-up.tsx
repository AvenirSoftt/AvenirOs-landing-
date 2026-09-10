"use client";

import { useEffect, useRef, useState } from "react";

import { uzs } from "@/lib/format";

/**
 * Счётчик, который оживает, когда число попало на экран.
 *
 * Считает по requestAnimationFrame и по РЕАЛЬНОМУ времени, а не по кадрам:
 * на 60 и на 144 Гц анимация обязана длиться одинаково.
 *
 * Место под итоговое число резервируется сразу (`tabular` + минимальная
 * ширина по финальной строке), иначе во время счёта строка меняет длину и
 * соседние блоки прыгают — то самое, что даёт CLS.
 */
/**
 * Формат задаётся ИМЕНЕМ, а не функцией: счётчик — клиентский компонент, а
 * зовут его в том числе серверные секции, и передать туда функцию нельзя
 * («Functions cannot be passed directly to Client Components»). Имя переживает
 * границу спокойно, а разбор имени живёт здесь.
 */
const formats = {
  uzs: (v: number) => uzs(v),
  plain: (v: number) => String(Math.round(v)),
} as const;

export function CountUp({
  to,
  duration = 1400,
  format = "uzs",
  className = "",
}: {
  to: number;
  duration?: number;
  format?: keyof typeof formats;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const fmt = formats[format];
  const final = fmt(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      // Плавное торможение: в конце числа «доезжают», а не обрываются.
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.unobserve(node);
        // При «уменьшить движение» число просто появляется целиком. Ставится
        // оно ЗДЕСЬ, в колбэке наблюдателя, а не в теле эффекта: setState
        // прямо в эффекте — лишний прогон рендера (и правило react-hooks).
        if (reduced) {
          setValue(to);
          return;
        }
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  // Обе строки лежат в ОДНОЙ ячейке грида: невидимая держит ширину по
  // итоговому числу, видимая считает. Без этого блок дёргается на каждом кадре.
  return (
    <span ref={ref} className={`tabular inline-grid ${className}`}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {final}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {fmt(value)}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
