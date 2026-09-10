"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Появление блока при прокрутке.
 *
 * На IntersectionObserver и CSS-переходе, а не на анимационной библиотеке:
 * это самый частый эффект страницы (десятки блоков), и тянуть ради него
 * JavaScript-анимацию в каждый узел — лишний вес там, где хватает трёх строк.
 * Уважение к prefers-reduced-motion живёт в globals.css, поэтому здесь его
 * повторять не нужно: класс просто не анимируется.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.shown = "true";
          if (once) io.unobserve(node);
        } else if (!once) {
          node.dataset.shown = "false";
        }
      },
      {
        threshold: 0,
        // Нижний край поднят: блок включается, когда уже заметно вошёл в экран,
        // а не краем в один пиксель.
        //
        // Верхний край РАСТЯНУТ вверх намеренно. Без этого блок, который
        // проскочил экран целиком между двумя кадрами, не получает ни одного
        // уведомления (было и остаётся «не пересекается») и навсегда остаётся
        // невидимым. А проскакивает он в двух обычных случаях: переход по
        // якорю из шапки и быстрый флик на телефоне — после них половина
        // страницы оказывалась пустой. С растянутым верхом всё, что ушло выше
        // экрана, считается показанным.
        rootMargin: "100000px 0px -8% 0px",
      },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
