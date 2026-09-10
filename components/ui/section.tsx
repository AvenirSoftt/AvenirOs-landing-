import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Ритм страницы держится здесь, а не в каждой секции по отдельности.
 *
 * У всех секций один каркас: маленький «глазок» (eyebrow) → крупный заголовок →
 * короткий подзаголовок → визуал. Разной у секций остаётся ровно тема: тёмная
 * (как интерфейс продукта) или светлая (маркетинг). Из-за этого страница
 * читается как один документ, а не как склейка блоков от разных людей.
 */

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-snow-2" : "text-ink-2"
      }`}
    >
      <span className={`inline-block h-px w-6 ${tone === "dark" ? "bg-primary-bright" : "bg-primary"}`} />
      {children}
    </p>
  );
}

export function Heading({
  children,
  tone = "dark",
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
      className={`text-balance font-[family-name:var(--font-display)] font-semibold leading-[1.04] tracking-[-0.035em] ${
        size === "h1" ? "text-[length:var(--text-h1)]" : "text-[length:var(--text-h2)]"
      } ${tone === "dark" ? "text-snow" : "text-ink-1"} ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`max-w-[62ch] text-pretty text-[17px] leading-[1.65] sm:text-[19px] ${
        tone === "dark" ? "text-snow-2" : "text-ink-2"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function Section({
  id,
  tone = "dark",
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
  const bg =
    tone === "light"
      ? "bg-paper text-ink-1"
      : tone === "night"
        ? "bg-night text-snow"
        : "bg-ink text-snow";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bg} ${bleed ? "" : "py-20 sm:py-28 lg:py-32"} ${className}`}
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
  tone = "dark",
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
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Heading tone={tone}>{title}</Heading>
      {lead ? <Lead tone={tone} className={`mt-6 ${align === "center" ? "mx-auto" : ""}`}>{lead}</Lead> : null}
    </Reveal>
  );
}
