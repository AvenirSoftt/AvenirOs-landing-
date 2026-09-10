"use client";

import { CountUp } from "@/components/ui/count-up";
import { Chrome, Rail } from "@/components/product/chrome";
import { YearChart } from "@/components/product/year-chart";
import { Card, CardLabel, HealthRing, PlanBar, Spark, tone } from "@/components/product/parts";
import { finance, health, planFact } from "@/lib/demo";

/**
 * Главный экран AvenirOS — «Дашборд агентства», собранный заново.
 *
 * Это не скриншот в рамке: разметка повторяет реальный экран (кольцо здоровья,
 * шесть карточек, реja/факт, годовая динамика), но живёт как обычная вёрстка —
 * поэтому текст остаётся текстом, числа считаются на глазах, а на телефоне
 * блок перестраивается, а не мылится.
 */
export function DashboardMockup({ compact = false }: { compact?: boolean }) {
  return (
    <Chrome title="AvenirOS — Agentlik paneli" tabs={["Oy", "Chorak", "Yil"]}>
      <div className="flex">
        <Rail active="Obzor" />
        <div className="min-w-0 flex-1 p-3.5 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold text-snow sm:text-[17px]">Agentlik paneli</p>
              <p className="text-[11px] text-snow-3">2026-09-01 — 2026-09-30</p>
            </div>
            <span className="hidden rounded-lg border border-line px-2.5 py-1 text-[11px] text-snow-3 sm:block">
              Taqqoslashsiz
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {/* Здоровье компании — единственная карточка на две строки, как в продукте */}
            <Card className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:row-span-2 lg:flex-col lg:justify-center lg:gap-3">
              <HealthRing score={health.score} size={112} />
              <div className="min-w-0 flex-1 lg:w-full lg:flex-none">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-snow-3 lg:text-center">
                  Kompaniya salomatligi
                </p>
                <ul className="space-y-1">
                  {health.parts.map((p) => (
                    <li key={p.label} className="flex items-center justify-between gap-2 text-[10.5px]">
                      <span className="text-snow-3">
                        {p.label} · {p.weight}%
                      </span>
                      <span
                        className={`font-semibold tabular ${p.score >= 60 ? "text-success" : "text-danger"}`}
                      >
                        {p.score}
                        <span className="text-snow-3">/100</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Kpi
              label="Oylik tushum"
              value={finance.revenue}
              hint="+8,7% o'tgan oyga"
              hintTone="success"
              t="success"
              points={[42, 46, 44, 52, 58, 55, 64, 70]}
              delay={120}
            />
            <Kpi
              label="Oylik xarajat"
              value={finance.expenses}
              hint="Reja doirasida"
              hintTone="success"
              t="danger"
              points={[38, 41, 40, 44, 43, 47, 45, 49]}
              delay={240}
            />
            <Kpi
              label="Oylik foyda"
              value={finance.profit}
              hint="Marja 16,6%"
              hintTone="warning"
              t="violet"
              points={[12, 14, 13, 18, 21, 19, 24, 27]}
              delay={360}
            />

            <Card>
              <CardLabel icon="primary">Sotuv voronkasi</CardLabel>
              <p className="text-[17px] font-semibold text-snow sm:text-[19px]">
                <CountUp to={finance.funnel}  /> <span className="text-[13px] font-medium text-snow-2">so&apos;m</span>
              </p>
              <p className="mt-1 text-[10.5px] text-snow-3">
                {finance.leads} lid · {String(finance.conversion).replace(".", ",")}% bitimgacha yetadi
              </p>
            </Card>

            <Card>
              <CardLabel icon="warning">Bizga qarz</CardLabel>
              <p className="text-[17px] font-semibold text-snow sm:text-[19px]">
                <CountUp to={finance.receivables}  /> <span className="text-[13px] font-medium text-snow-2">so&apos;m</span>
              </p>
              <p className="mt-1 text-[10.5px] text-danger">
                {finance.overdueInvoices} ta muddati o&apos;tgan hisob-faktura
              </p>
            </Card>

            <Card>
              <CardLabel icon="success">Zaxira</CardLabel>
              <p className="text-[17px] font-semibold text-snow sm:text-[19px]">Cheklanmagan</p>
              <p className="mt-1 text-[10.5px] text-snow-3">Daromad xarajatni qoplaydi</p>
            </Card>
          </div>

          {!compact && (
            <>
              <Card className="mt-3">
                <p className="mb-3 text-[12.5px] font-semibold text-snow">Reja/fakt · 2026</p>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
                  {planFact.map((p, i) => (
                    <PlanBar
                      key={p.label}
                      label={p.label}
                      value={p.value}
                      fact={p.fact}
                      target={p.target}
                      forecast={p.forecast}
                      t={p.tone}
                      delay={200 + i * 90}
                    />
                  ))}
                </div>
              </Card>

              <Card className="mt-3">
                <p className="mb-3 text-[12.5px] font-semibold text-snow">12 oylik dinamika</p>
                <YearChart />
              </Card>
            </>
          )}
        </div>
      </div>
    </Chrome>
  );
}

function Kpi({
  label,
  value,
  hint,
  hintTone,
  t,
  points,
  delay = 0,
}: {
  label: string;
  value: number;
  hint: string;
  hintTone: "success" | "warning";
  t: keyof typeof tone;
  points: number[];
  delay?: number;
}) {
  return (
    <Card>
      <CardLabel icon={t}>{label}</CardLabel>
      <p className="text-[17px] font-semibold leading-none text-snow sm:text-[19px]">
        <CountUp to={value}  />
      </p>
      <p className={`mt-1 text-[10.5px] ${hintTone === "success" ? "text-success" : "text-warning"}`}>{hint}</p>
      <div className="-mx-1 mt-2">
        <Spark points={points} color={tone[t].ring} delay={delay} />
      </div>
    </Card>
  );
}
