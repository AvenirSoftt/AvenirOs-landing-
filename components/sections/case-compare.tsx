import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Кейс.
 *
 * Всё, что здесь написано, компания говорит о себе сама в разборе проекта
 * (avenir.uz/portfolio/avenir-os): 16 разделов, 7 ролей, продукт сделан для
 * собственного агентства и используется каждый день. Никаких «-40% времени» и
 * прочих цифр эффекта: их никто не измерял, а придумывать нельзя.
 */
export function CaseStudy({ d }: { d: Dict }) {
  return (
    <Section>
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow={d.caseStudy.eyebrow}
              title={
                <>
                  {d.caseStudy.title} <span className="text-snow-3">{d.caseStudy.titleMuted}</span>
                </>
              }
              lead={d.caseStudy.lead}
            />
            <Reveal delay={90} className="mt-8">
              <Button href="https://avenir.uz/portfolio/avenir-os" variant="ghost" size="md">
                {d.caseStudy.cta}
                <span aria-hidden="true" className="relative">
                  ↗
                </span>
              </Button>
            </Reveal>
          </div>

          <div
            data-stagger
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line"
          >
            {d.caseStudy.stats.map(([v, l]) => (
              <div key={l} className="lift bg-panel px-5 py-6 hover:bg-panel-2">
                <p className="font-[family-name:var(--font-display)] text-[26px] font-bold tracking-[-0.02em] text-snow sm:text-[30px]">
                  {v}
                </p>
                <p className="mt-1 text-[12.5px] text-snow-3">{l}</p>
              </div>
            ))}
            <div className="col-span-2 bg-panel px-5 py-5">
              <p className="text-[12.5px] leading-relaxed text-snow-2">{d.caseStudy.tech}</p>
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/**
 * Сравнение «без системы / с системой».
 *
 * Смысл блока в РАЗНИЦЕ, и раньше её держал контраст светлой карточки с
 * тёмной. На единой тёмной странице разницу держит материал: слева — глухое
 * стекло без акцента, справа — та же карточка, но с синей кромкой и подсветкой.
 */
export function Comparison({ d }: { d: Dict }) {
  return (
    <Section>
      <Shell>
        <SectionHead align="center" eyebrow={d.compare.eyebrow} title={d.compare.title} />

        <div className="mx-auto mt-12 grid max-w-[900px] gap-4 sm:grid-cols-2 sm:gap-6">
          <Reveal className="glass-soft rounded-2xl p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
              {d.compare.withoutLabel}
            </p>
            <ul data-stagger className="mt-5 space-y-3">
              {d.compare.without.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[14.5px] text-snow-2">
                  <span className="mt-[7px] h-px w-3 shrink-0 bg-snow-3" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="glass-sheen rounded-2xl border border-primary/25 bg-primary/10 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-bright">
              {d.compare.withLabel}
            </p>
            <ul data-stagger className="mt-5 space-y-3">
              {d.compare.with.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[14.5px] text-snow">
                  <span className="mt-[3px] shrink-0 text-success" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.5 6.3 12 13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
