import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Ритм страницы держится здесь, а не в каждой секции по отдельности.
 *
 * У всех секций один каркас: маленький «глазок» (eyebrow) → крупный заголовок →
 * короткий подзаголовок → визуал. Из-за этого страница читается как один
 * документ, а не как склейка блоков от разных людей.
 *
 * **Светлых секций больше нет (12.09.2026, решение владельца).** Раньше
 * маркетинговые блоки шли по белому фону, и страница чередовала тёмное со
 * светлым. Теперь фон один на всю страницу, а блоки отличает СВЕТ: стекло,
 * блик по кромке и тень (`.glass` в globals.css). Проп `tone` оставлен — на
 * него опирается десяток секций, — но выбирает он только оттенок текста, не
 * цвет фона. Если снова захочется светлой секции, её нужно заводить осознанно,
 * а не возвращать это ветвление: смысл правки был именно в единой поверхности.
 */

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-snow-2">
      <span className="inline-block h-px w-6 bg-primary-bright" />
      {children}
    </p>
  );
}

export function Heading({
  children,
  size = "h2",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  size?: "h1" | "h2";
  className?: string;
}) {
  return (
    <h2
      data-split
      className={`text-balance font-[family-name:var(--font-display)] font-semibold leading-[1.04] tracking-[-0.035em] text-snow ${
        size === "h1" ? "text-[length:var(--text-h1)]" : "text-[length:var(--text-h2)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p className={`max-w-[62ch] text-pretty text-[17px] leading-[1.65] text-snow-2 sm:text-[19px] ${className}`}>
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
  bleed = false,
  ...rest
}: {
  id?: string;
  tone?: "dark" | "light" | "night";
  children: ReactNode;
  className?: string;
  bleed?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  // Один фон на все секции, и он полупрозрачный: под ним живёт общее сияние
  // страницы (components/motion/backdrop.tsx). Именно оно не даёт сплошной
  // темноте стать плоской — стекло карточек светится за счёт него.
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-ink/85 text-snow ${bleed ? "" : "py-20 sm:py-28 lg:py-32"} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Шапка секции: три уровня подряд, всегда в одном порядке. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[820px]"} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading>{title}</Heading>
      {lead ? <Lead className={`mt-6 ${align === "center" ? "mx-auto" : ""}`}>{lead}</Lead> : null}
    </Reveal>
  );
}
