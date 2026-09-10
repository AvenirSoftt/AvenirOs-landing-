"use client";

import { useRef, type ReactNode } from "react";

/**
 * Кнопки страницы.
 *
 * Три вещи, из-за которых кнопка выглядит сделанной, а не поставленной:
 *
 *   1. **Магнит.** Курсор рядом — кнопка чуть тянется к нему, стрелка тянется
 *      сильнее. Смещение маленькое (до 6 px): большое превращается в игрушку.
 *      Работает только на устройствах С МЫШЬЮ и только если человек не просил
 *      уменьшить движение — на тач-экране «магнит» ловить нечем.
 *   2. **Блик.** По заливке один раз проходит светлая полоса. Не бесконечная
 *      анимация, а реакция на наведение — иначе она мозолит глаза в покое.
 *   3. **Видимый фокус.** Кольцо на фирменном цвете, а не браузерная обводка,
 *      которую все прячут и оставляют клавиатуру без ориентира.
 */

type Variant = "primary" | "ghost" | "quiet";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium " +
  "transition-[background-color,border-color,color,box-shadow] duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_14px_34px_-14px_rgba(37,99,235,0.95)] hover:bg-primary-bright hover:shadow-[0_18px_44px_-14px_rgba(59,130,246,1)]",
  ghost:
    "border border-line bg-white/[0.03] text-snow hover:border-line/80 hover:bg-white/[0.07]",
  quiet: "text-snow-2 hover:text-snow",
};

const sizes = {
  md: "px-5 py-3 text-[14.5px]",
  lg: "px-6 py-3.5 text-[15px]",
} as const;

export function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  arrow = false,
  className = "",
  magnetic = true,
  onClick,
  type,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  magnetic?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !magnetic || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.setProperty("--mx", `${dx * 6}px`);
    el.style.setProperty("--my", `${dy * 4}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  const content = (
    <>
      {/* Блик: живёт под содержимым и проходит слева направо при наведении. */}
      {variant !== "quiet" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative">{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="relative inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  const cls = `${base} ${variants[variant]} ${sizes[size]} magnetic ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cls}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type ?? "button"}
      onClick={onClick}
      className={cls}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {content}
    </button>
  );
}
