import { FinanceMockup } from "@/components/product/analytics";
import { DemoBadge, HealthRing, PlanBar } from "@/components/product/parts";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import { finance, health, planFact } from "@/lib/demo";


/**
 * Финансы + план/факт + здоровье компании.
 *
 * Три темы, но одна секция: по отдельности они дали бы три подряд идущие
 * «стены карточек». Здесь у каждой своя роль — крупные числа сверху, разбор
 * плана слева, интегральная оценка справа.
 */
export function Finance() {
  return (
    <Section tone="dark">
      <Shell>
        <SectionHead
          eyebrow="Moliya"
          title={
            <>
              Biznes raqamlarda emas&nbsp;— <span className="text-snow-3">qarorlarda ko&apos;rinadi.</span>
            </>
          }
          lead="Tushum, xarajat va foyda oy oxirini kutmaydi: har bir hisob-faktura va to'lov o'z loyihasiga bog'langan, shuning uchun foydalilik real vaqtda hisoblanadi."
        />

        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          <Big label="Tushum" value={finance.revenue} tone="text-snow" note="2026 · fakt" />
          <Big label="Xarajat" value={finance.expenses} tone="text-snow" note="operatsion + tannarx" />
          <Big label="Foyda" value={finance.profit} tone="text-success" note={`marja ${String(finance.margin).replace(".", ",")}%`} />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <Reveal className="min-w-0">
            <FinanceMockup />
          </Reveal>

          <Reveal delay={90} className="space-y-6">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <p className="mb-4 text-[12.5px] font-semibold text-snow">Reja/fakt · 2026</p>
              <div className="space-y-4">
                {planFact.slice(0, 3).map((p) => (
                  <PlanBar
                    key={p.label}
                    label={p.label}
                    value={p.value}
                    fact={p.fact}
                    target={p.target}
                    forecast={p.forecast}
                    t={p.tone}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-5">
              <div className="flex items-center gap-5">
                <HealthRing score={health.score} size={104} />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-snow">Kompaniya salomatligi</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-snow-3">
                    To&apos;rt yo&apos;nalish bitta ko&apos;rsatkichga yig&apos;iladi — qayerda
                    cho&apos;kayotgani darrov ko&apos;rinadi.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {health.parts.map((p) => (
                  <li key={p.label}>
                    <div className="mb-1 flex items-baseline justify-between text-[11.5px]">
                      <span className="text-snow-2">{p.label}</span>
                      <span className={`font-semibold tabular ${p.score >= 60 ? "text-success" : "text-danger"}`}>
                        {p.score}/100
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-[#1e2a3a]">
                      <span
                        className={`block h-full rounded-full ${p.score >= 60 ? "bg-success" : "bg-danger"}`}
                        style={{ width: `${Math.max(4, p.score)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 flex justify-center">
          <DemoBadge />
        </div>
      </Shell>
    </Section>
  );
}

function Big({ label, value, tone, note }: { label: string; value: number; tone: string; note: string }) {
  return (
    <div className="bg-ink px-6 py-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-snow-3">{label}</p>
      <p className={`mt-3 text-[26px] font-semibold leading-none tracking-[-0.02em] sm:text-[32px] ${tone}`}>
        <CountUp to={value}  />
      </p>
      <p className="mt-2 text-[12px] text-snow-3">
        so&apos;m · {note}
      </p>
    </div>
  );
}
