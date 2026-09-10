import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Поток данных, выгоды и порядок запуска.
 *
 * Три коротких смысловых блока подряд, и ни один из них НЕ карточка с иконкой:
 * поток — линия с шагами, выгоды — типографика с номерами, запуск — три шага.
 * Одинаковые прямоугольники здесь читались бы как заполнитель.
 */
export function DataFlow({ d }: { d: Dict }) {
  return (
    <Section tone="night">
      <Shell>
        <SectionHead
          align="center"
          eyebrow={d.flow.eyebrow}
          title={
            <>
              {d.flow.title} <span className="text-snow-3">{d.flow.titleMuted}</span>
            </>
          }
        />

        <Reveal className="mt-14">
          <ol data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {d.flow.steps.map(([k, v], i) => (
              <li key={k} className="relative lg:px-3">
                {/* Соединительная линия рисуется только на широком экране: в
                    колонку она превращается в бессмысленный обрубок. */}
                {i < d.flow.steps.length - 1 && (
                  <span
                    className="absolute right-0 top-[13px] hidden h-px w-6 translate-x-1/2 bg-gradient-to-r from-primary/70 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="flex items-center gap-2">
                  <i className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-[10px] font-semibold text-primary-bright tabular">
                    {i + 1}
                  </i>
                  <span className="text-[13.5px] font-semibold text-snow">{k}</span>
                </span>
                <p className="mt-1.5 pl-8 text-[12.5px] leading-snug text-snow-3 lg:pl-0">{v}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Shell>
    </Section>
  );
}

export function Benefits({ d }: { d: Dict }) {
  return (
    <Section tone="light">
      <Shell>
        <SectionHead tone="light" eyebrow={d.benefits.eyebrow} title={d.benefits.title} />

        <div data-stagger className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {d.benefits.items.map(([t, text], i) => (
            <div key={t} className="border-t border-hairline pt-6">
              <p className="text-[12px] font-semibold tabular text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[21px] font-bold tracking-[-0.02em] text-ink-1 sm:text-[24px]">
                {t}
              </h3>
              <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{text}</p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

export function HowItWorks({ d }: { d: Dict }) {
  return (
    <Section tone="light" className="pt-0">
      <Shell>
        <div className="border-t border-hairline pt-16 sm:pt-20">
          <SectionHead tone="light" eyebrow={d.how.eyebrow} title={d.how.title} />
          <div data-stagger className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {d.how.steps.map(([t, text], i) => (
              <div key={t}>
                <span className="text-[13px] font-semibold tabular text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-ink-1">
                  {t}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  );
}
