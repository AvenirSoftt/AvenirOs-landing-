"use client";

import { CountUp } from "@/components/ui/count-up";
import { LiveNumber } from "@/components/ui/live-number";
import { Chrome, Rail } from "@/components/product/chrome";
import { YearChart } from "@/components/product/year-chart";
import { Card, CardLabel, HealthRing, PlanBar, Spark, tone } from "@/components/product/parts";
import { finance, health, planFact } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Главный экран AvenirOS — «Дашборд агентства», собранный заново.
 *
 * Это не скриншот в рамке: разметка повторяет реальный экран (кольцо здоровья,
 * шесть карточек, план/факт, годовая динамика), но живёт как обычная вёрстка —
 * поэтому текст остаётся текстом, числа считаются на глазах, а на телефоне
 * блок перестраивается, а не мылится.
 *
 * Разделено на `DashboardPanel` (содержимое) и `DashboardMockup` (рамка с
 * меню): содержимое переиспользует живой дашборд с первого экрана, у которого
 * своя рамка — с рабочими вкладками и рабочим меню.
 */

/** Числа панели. Значения по умолчанию — те же, что на стенде. */
export type PanelData = {
  revenue: number;
  expenses: number;
  profit: number;
  funnel: number;
  receivables: number;
  score: number;
  period: string;
};

export const staticData = (ui: Dict["ui"]): PanelData => ({
  revenue: finance.revenue,
  expenses: finance.expenses,
  profit: finance.profit,
  funnel: finance.funnel,
  receivables: finance.receivables,
  score: health.score,
  period: ui.period,
});

export function DashboardPanel({
  d,
  compact = false,
  data,
  live = false,
}: {
  d: Dict;
  compact?: boolean;
  data?: PanelData;
  live?: boolean;
}) {
  const ui = d.ui;
  const v = data ?? staticData(ui);

  return (
    <div className="min-w-0 flex-1 p-3.5 sm:p-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[15px] font-semibold text-snow sm:text-[17px]">{ui.dashboard}</p>
          <p className="text-[11px] text-snow-3 tabular">{v.period}</p>
        </div>
        <span className="hidden rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-snow-3 sm:block">
          {ui.noCompare}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Здоровье компании — единственная карточка на две строки, как в продукте */}
        <Card className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:row-span-2 lg:flex-col lg:justify-center lg:gap-3">
          <HealthRing score={v.score} size={112} />
          <div className="min-w-0 flex-1 lg:w-full lg:flex-none">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-snow-3 lg:text-center">
              {ui.health}
            </p>
            <ul className="space-y-1">
              {health.parts.map((p, i) => (
                <li key={p.label} className="flex items-center justify-between gap-2 text-[10.5px]">
                  <span className="text-snow-3">
                    {ui.healthParts[i]} · {p.weight}%
                  </span>
                  <span className={`font-semibold tabular ${p.score >= 60 ? "text-success" : "text-danger"}`}>
                    {p.score}
                    <span className="text-snow-3">/100</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Kpi
          label={ui.monthRevenue}
          value={v.revenue}
          hint={ui.revenueHint}
          hintTone="success"
          t="success"
          points={[42, 46, 44, 52, 58, 55, 64, 70]}
          delay={120}
          live={live}
        />
        <Kpi
          label={ui.monthExpenses}
          value={v.expenses}
          hint={ui.expensesHint}
          hintTone="success"
          t="danger"
          points={[38, 41, 40, 44, 43, 47, 45, 49]}
          delay={240}
          live={live}
        />
        <Kpi
          label={ui.monthProfit}
          value={v.profit}
          hint={ui.profitHint}
          hintTone="warning"
          t="violet"
          points={[12, 14, 13, 18, 21, 19, 24, 27]}
          delay={360}
          live={live}
        />

        <Card>
          <CardLabel icon="primary">{ui.funnel}</CardLabel>
          <p className="text-[17px] font-semibold text-snow sm:text-[19px]">
            {live ? <LiveNumber value={v.funnel} /> : <CountUp to={v.funnel} />}{" "}
            <span className="text-[13px] font-medium text-snow-2">{ui.currency}</span>
          </p>
          <p className="mt-1 text-[10.5px] text-snow-3">{ui.funnelNote}</p>
        </Card>

        <Card>
          <CardLabel icon="warning">{ui.debt}</CardLabel>
          <p className="text-[17px] font-semibold text-snow sm:text-[19px]">
            {live ? <LiveNumber value={v.receivables} /> : <CountUp to={v.receivables} />}{" "}
            <span className="text-[13px] font-medium text-snow-2">{ui.currency}</span>
          </p>
          <p className="mt-1 text-[10.5px] text-danger">{ui.debtNote}</p>
        </Card>

        <Card>
          <CardLabel icon="success">{ui.runway}</CardLabel>
          <p className="text-[17px] font-semibold text-snow sm:text-[19px]">{ui.runwayValue}</p>
          <p className="mt-1 text-[10.5px] text-snow-3">{ui.runwayNote}</p>
        </Card>
      </div>

      {!compact && (
        <>
          <Card className="mt-3">
            <p className="mb-3 text-[12.5px] font-semibold text-snow">{ui.planFact}</p>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
              {planFact.map((p, i) => (
                <PlanBar
                  key={p.label}
                  label={ui.planLabels[i]}
                  value={p.value}
                  fact={p.fact}
                  target={p.target}
                  forecast={p.forecast}
                  t={p.tone}
                  delay={200 + i * 90}
                  ui={ui}
                />
              ))}
            </div>
          </Card>

          <Card className="mt-3">
            <p className="mb-3 text-[12.5px] font-semibold text-snow">{ui.dynamics}</p>
            <YearChart ui={ui} />
          </Card>
        </>
      )}
    </div>
  );
}

export function DashboardMockup({ d, compact = false }: { d: Dict; compact?: boolean }) {
  const ui = d.ui;

  return (
    <Chrome title={ui.dashboardTitle} tabs={[ui.tabs.month, ui.tabs.quarter, ui.tabs.year]}>
      <div className="flex">
        <Rail ui={ui} />
        <DashboardPanel d={d} compact={compact} />
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
  live = false,
}: {
  label: string;
  value: number;
  hint: string;
  hintTone: "success" | "warning";
  t: keyof typeof tone;
  points: number[];
  delay?: number;
  live?: boolean;
}) {
  return (
    <Card>
      <CardLabel icon={t}>{label}</CardLabel>
      <p className="text-[17px] font-semibold leading-none text-snow sm:text-[19px]">
        {live ? <LiveNumber value={value} /> : <CountUp to={value} />}
      </p>
      <p className={`mt-1 text-[10.5px] ${hintTone === "success" ? "text-success" : "text-warning"}`}>
        {hint}
      </p>
      <div className="-mx-1 mt-2">
        <Spark points={points} color={tone[t].ring} delay={delay} />
      </div>
    </Card>
  );
}
