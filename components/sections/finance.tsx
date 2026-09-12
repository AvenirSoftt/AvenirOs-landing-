import { FinanceMockup } from "@/components/product/analytics";
import { HealthRing, PlanBar } from "@/components/product/parts";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import { finance, health, planFact } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Финансы + план/факт + здоровье компании.
 *
 * Три темы, но одна секция: по отдельности они дали бы три подряд идущие
 * «стены карточек». Здесь у каждой своя роль — крупные числа сверху, разбор
 * плана слева, интегральная оценка справа.
 *
 * Плашки «демо-данные» под блоком больше нет (12.09.2026, решение владельца):
 * оговорка осталась в подвале, где она относится ко всей странице сразу.
 */
export function Finance({ d }: { d: Dict }) {
  return (
    <Section>
      <Shell>
        <SectionHead
          eyebrow={d.finance.eyebrow}
          title={
            <>
              {d.finance.title} <span className="text-snow-3">{d.finance.titleMuted}</span>
            </>
          }
          lead={d.finance.lead}
        />

        <div
          data-stagger
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          <Big label={d.finance.revenue} value={finance.revenue} tone="text-snow" note={d.finance.revenueNote} unit={d.ui.currency} />
          <Big label={d.finance.expenses} value={finance.expenses} tone="text-snow" note={d.finance.expensesNote} unit={d.ui.currency} />
          <Big label={d.finance.profit} value={finance.profit} tone="text-success" note={d.finance.profitNote} unit={d.ui.currency} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <Reveal className="min-w-0">
            <FinanceMockup d={d} />
          </Reveal>

          <Reveal delay={90} className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <p className="mb-4 text-[12.5px] font-semibold text-snow">{d.finance.planFact}</p>
              <div className="space-y-4">
                {planFact.slice(0, 3).map((p, i) => (
                  <PlanBar
                    key={p.label}
                    label={d.ui.planLabels[i]}
                    value={p.value}
                    fact={p.fact}
                    target={p.target}
                    forecast={p.forecast}
                    t={p.tone}
                    delay={150 + i * 110}
                    ui={d.ui}
                  />
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-5">
                <HealthRing score={health.score} size={104} />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-snow">{d.finance.healthTitle}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-snow-3">{d.finance.healthLead}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {health.parts.map((p, i) => (
                  <li key={p.label}>
                    <div className="mb-1 flex items-baseline justify-between text-[11.5px]">
                      <span className="text-snow-2">{d.ui.healthParts[i]}</span>
                      <span
                        className={`font-semibold tabular ${p.score >= 60 ? "text-success" : "text-danger"}`}
                      >
                        {p.score}/100
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                      <span
                        className={`grow-x block h-full rounded-full ${p.score >= 60 ? "bg-success" : "bg-danger"}`}
                        style={{ width: Math.max(4, p.score) + "%", "--d": 300 + i * 90 + "ms" } as React.CSSProperties}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

function Big({
  label,
  value,
  tone,
  note,
  unit,
}: {
  label: string;
  value: number;
  tone: string;
  note: string;
  unit: string;
}) {
  return (
    <div className="bg-ink px-6 py-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-snow-3">{label}</p>
      <p
        className={`mt-3 font-[family-name:var(--font-display)] text-[26px] font-bold leading-none tracking-[-0.02em] sm:text-[32px] ${tone}`}
      >
        <CountUp to={value} />
      </p>
      <p className="mt-2 text-[12px] text-snow-3">
        {unit} · {note}
      </p>
    </div>
  );
}
