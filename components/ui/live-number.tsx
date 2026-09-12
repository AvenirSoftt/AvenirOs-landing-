"use client";

import { useEffect, useRef, useState } from "react";

import { uzs } from "@/lib/format";

/**
 * Число, которое ПЕРЕЕЗЖАЕТ к новому значению, а не подменяется.
 *
 * Отличие от `CountUp` принципиальное, и держать оба — не дублирование:
 * `CountUp` считает ОДИН раз, от нуля, когда попал на экран, — это вход.
 * Здесь значение меняется снова и снова (живой дашборд, смена периода), и
 * считать каждый раз от нуля значило бы обнулять выручку на глазах у человека.
 * Поэтому переезд всегда от ПРЕДЫДУЩЕГО значения к новому.
 *
 * При «уменьшить движение» число просто встаёт на место: смысл живого
 * дашборда — что цифры меняются, а не что они красиво едут.
 */
export function LiveNumber({
  value,
  duration = 700,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }

    const a = from.current;
    const b = value;
    if (a === b) return;

    let raf = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(a + (b - a) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = b;
    };

    raf = requestAnimationFrame(step);
    return () => {
      // Прервали на полпути (значение сменилось снова) — следующий переезд
      // обязан начаться оттуда, где остановились, иначе число дёрнется назад.
      from.current = shown;
      cancelAnimationFrame(raf);
    };
    // `shown` намеренно не в зависимостях: он меняется каждый кадр, и эффект
    // перезапускался бы бесконечно. Читается он только в уборке.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span className={`tabular ${className}`}>{uzs(shown)}</span>;
}
