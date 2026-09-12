import { Chrome } from "@/components/product/chrome";
import { monthly } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Финансы и отчёты.
 *
 * Как и у остальных макетов, содержимое (`…Body`) отделено от рамки: то же
 * самое показывает живой дашборд на первом экране, когда в меню выбирают
 * «Финансы» или «Отчёты».
 */
export function FinanceBody({ d }: { d: Dict }) {
  const ui = d.ui;
  const rows = [
    { label: ui.plRows[0], value: "3.480.000.000", tone: "text-success", w: 100, bar: "bg-primary-bright" },
    { label: ui.plRows[1], value: "1.902.000.000", tone: "text-snow-2", w: 55, bar: "bg-white/20" },
    { label: ui.plRows[2], value: "1.001.453.955", tone: "text-snow-2", w: 29, bar: "bg-white/20" },
    { label: ui.plRows[3], value: "576.546.045", tone: "text-success", w: 17, bar: "bg-success" },
  ];

  return (
    <div className="p-4">
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="text-[12px] text-snow-2">{r.label}</span>
              <span className={`text-[12.5px] font-semibold tabular ${r.tone}`}>{r.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <span
                className={`grow-x block h-full rounded-full ${r.bar}`}
                style={{ width: `${r.w}%`, "--d": `${120 + i * 110}ms` } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-semibold text-snow">{ui.cashflow}</p>
          <p className="text-[10.5px] text-snow-3">{ui.cashflowLegend}</p>
        </div>
        <div className="flex h-[112px] items-end gap-2.5">
          {monthly.slice(6).map((m, i) => (
            <div key={m.m} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="flex w-full items-end justify-center gap-[3px]" style={{ height: 88 }}>
                <i
                  className="grow-y w-[30%] rounded-t bg-primary-bright/85"
                  style={{ height: `${(m.revenue / 500) * 100}%`, "--d": `${i * 70}ms` } as React.CSSProperties}
                />
                <i
                  className="grow-y w-[30%] rounded-t bg-white/20"
                  style={
                    {
                      height: `${((m.revenue - m.profit) / 500) * 100}%`,
                      "--d": `${i * 70 + 40}ms`,
                    } as React.CSSProperties
                  }
                />
                <i
                  className="grow-y w-[30%] rounded-t bg-success/85"
                  style={{ height: `${(m.profit / 500) * 100}%`, "--d": `${i * 70 + 80}ms` } as React.CSSProperties}
                />
              </span>
              <span className="text-[9.5px] text-snow-3">{ui.months[m.m]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Финансы: P&L строками и кэш-флоу столбиками — раздел «Финансы». */
export function FinanceMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.financeTitle} tabs={d.ui.financeTabs}>
      <FinanceBody d={d} />
    </Chrome>
  );
}

export function AnalyticsBody({ d }: { d: Dict }) {
  const ui = d.ui;
  const values = ["+18,4%", "66,67%", "87 mln", "81%"];
  const tones = ["text-success", "text-primary-bright", "text-snow", "text-warning"];

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {ui.kpis.map(([label, sub], i) => (
          <div key={label} className="glass-soft rounded-lg px-3 py-2.5">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-snow-3">{label}</p>
            <p className={`mt-1 text-[16px] font-semibold tabular ${tones[i]}`}>{values[i]}</p>
            <p className="text-[10px] text-snow-3">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass-soft rounded-lg p-3.5">
          <p className="mb-3 text-[12px] font-semibold text-snow">{ui.revenueProfit}</p>
          <div className="flex h-[128px] items-end gap-1.5">
            {monthly.map((m, i) => (
              <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
                <span className="relative flex w-full justify-center" style={{ height: 108 }}>
                  <i
                    className="grow-y absolute bottom-0 w-full max-w-[16px] rounded-t bg-primary-bright/25"
                    style={{ height: `${(m.revenue / 500) * 100}%`, "--d": `${i * 55}ms` } as React.CSSProperties}
                  />
                  <i
                    className="grow-y absolute bottom-0 w-full max-w-[16px] rounded-t bg-success"
                    style={{ height: `${(m.profit / 500) * 100}%`, "--d": `${i * 55 + 90}ms` } as React.CSSProperties}
                  />
                </span>
                <span className="text-[8.5px] text-snow-3/80">{ui.months[m.m]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-soft rounded-lg p-3.5">
          <p className="mb-3 text-[12px] font-semibold text-snow">{ui.funnelStages}</p>
          <ul className="space-y-2.5">
            {[
              { n: 16, w: 100 },
              { n: 10, w: 62 },
              { n: 6, w: 38 },
              { n: 4, w: 25 },
              { n: 3, w: 19 },
            ].map((r, i) => (
              <li key={ui.stages[i]}>
                <div className="mb-1 flex items-baseline justify-between text-[11px]">
                  <span className="text-snow-2">{ui.stages[i]}</span>
                  <span className="font-semibold text-snow tabular">{r.n}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <span
                    className="grow-x block h-full rounded-full bg-accent/80"
                    style={{ width: `${r.w}%`, "--d": `${150 + i * 100}ms` } as React.CSSProperties}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Аналитика: витрина показателей руководителя. */
export function AnalyticsMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.reportsTitle} tabs={d.ui.reportsTabs}>
      <AnalyticsBody d={d} />
    </Chrome>
  );
}
