import { ProjectsMockup, TeamMockup } from "@/components/product/boards";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Проекты, задачи и команда — «как работа доходит до результата».
 *
 * Светлая секция с двумя тёмными экранами продукта: слева то, что делается,
 * справа — кем. Порядок не случайный: сначала работа, потом люди.
 */
export function Work({ d }: { d: Dict }) {
  return (
    <Section tone="light">
      <Shell>
        <SectionHead
          tone="light"
          eyebrow={d.work.eyebrow}
          title={
            <>
              {d.work.title} <span className="text-ink-3">{d.work.titleMuted}</span>
            </>
          }
          lead={d.work.lead}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          <Reveal className="min-w-0">
            <ProjectsMockup d={d} />
          </Reveal>
          <Reveal delay={90} className="min-w-0">
            <TeamMockup d={d} />
          </Reveal>
        </div>

        <div
          data-stagger
          className="mt-10 grid gap-x-10 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3"
        >
          {d.work.cards.map(([t, text]) => (
            <div key={t}>
              <h3 className="font-[family-name:var(--font-display)] text-[15.5px] font-bold text-ink-1">
                {t}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{text}</p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
