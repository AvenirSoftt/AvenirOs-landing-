import { ProjectsMockup, TeamMockup } from "@/components/product/boards";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Проекты, задачи и команда — «как работа доходит до результата».
 *
 * Два экрана продукта рядом: слева то, что делается, справа — кем. Порядок не
 * случайный: сначала работа, потом люди.
 */
export function Work({ d }: { d: Dict }) {
  return (
    <Section>
      <Shell>
        <SectionHead
          eyebrow={d.work.eyebrow}
          title={
            <>
              {d.work.title} <span className="text-snow-3">{d.work.titleMuted}</span>
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
          className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-3"
        >
          {d.work.cards.map(([t, text]) => (
            <div key={t}>
              <h3 className="font-[family-name:var(--font-display)] text-[15.5px] font-bold text-snow">
                {t}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-snow-2">{text}</p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
