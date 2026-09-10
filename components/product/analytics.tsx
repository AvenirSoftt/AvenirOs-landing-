import { Chrome } from "@/components/product/chrome";
import { monthly } from "@/lib/demo";

/** Финансы: P&L строками и кэш-флоу столбиками — раздел «Moliya». */
export function FinanceMockup() {
  const rows = [
    { label: "Tushum", value: "3.480.000.000", tone: "text-success", w: 100 },
    { label: "Xizmat tannarxi", value: "1.902.000.000", tone: "text-snow-2", w: 55 },
    { label: "Operatsion xarajat", value: "1.001.453.955", tone: "text-snow-2", w: 29 },
    { label: "Foyda", value: "576.546.045", tone: "text-success", w: 17 },
  ];

  return (
    <Chrome title="AvenirOS — Moliya · P&L" tabs={["P&L", "Kesh-flou", "Hisob-fakturalar"]}>
      <div className="p-4">
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="text-[12px] text-snow-2">{r.label}</span>
                <span className={`text-[12.5px] font-semibold tabular ${r.tone}`}>{r.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#1e2a3a]">
                <span
                  className={`block h-full rounded-full ${
                    r.label === "Foyda" ? "bg-success" : r.label === "Tushum" ? "bg-primary-bright" : "bg-[#2f4258]"
                  }`}
                  style={{ width: `${r.w}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-line-soft pt-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-snow">6 oylik kesh-flou</p>
            <p className="text-[10.5px] text-snow-3">Tushum · Xarajat · Foyda</p>
          </div>
          <div className="flex h-[112px] items-end gap-2.5">
            {monthly.slice(6).map((m) => (
              <div key={m.m} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="flex w-full items-end justify-center gap-[3px]" style={{ height: 88 }}>
                  <i className="w-[30%] rounded-t bg-primary-bright/85" style={{ height: `${(m.revenue / 500) * 100}%` }} />
                  <i className="w-[30%] rounded-t bg-[#2f4258]" style={{ height: `${((m.revenue - m.profit) / 500) * 100}%` }} />
                  <i className="w-[30%] rounded-t bg-success/85" style={{ height: `${(m.profit / 500) * 100}%` }} />
                </span>
                <span className="text-[9.5px] text-snow-3">{m.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/** Аналитика: витрина показателей руководителя. */
export function AnalyticsMockup() {
  const kpis = [
    { label: "Tushum trendi", value: "+18,4%", tone: "text-success", sub: "12 oy" },
    { label: "Konversiya", value: "66,67%", tone: "text-primary-bright", sub: "lid → bitim" },
    { label: "O'rtacha chek", value: "87 mln", tone: "text-snow", sub: "so'm" },
    { label: "Jamoa yuklamasi", value: "81%", tone: "text-warning", sub: "o'rtacha" },
  ];

  return (
    <Chrome title="AvenirOS — Hisobotlar" tabs={["Umumiy", "Sotuv", "Moliya"]}>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-lg border border-line-soft bg-[#141d29] px-3 py-2.5">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-snow-3">{k.label}</p>
              <p className={`mt-1 text-[16px] font-semibold tabular ${k.tone}`}>{k.value}</p>
              <p className="text-[10px] text-snow-3">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-lg border border-line-soft bg-[#141d29] p-3.5">
            <p className="mb-3 text-[12px] font-semibold text-snow">Tushum va foyda · 12 oy</p>
            <div className="flex h-[128px] items-end gap-1.5">
              {monthly.map((m) => (
                <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
                  <span className="relative flex w-full justify-center" style={{ height: 108 }}>
                    <i
                      className="absolute bottom-0 w-full max-w-[16px] rounded-t bg-primary-bright/25"
                      style={{ height: `${(m.revenue / 500) * 100}%` }}
                    />
                    <i
                      className="absolute bottom-0 w-full max-w-[16px] rounded-t bg-success"
                      style={{ height: `${(m.profit / 500) * 100}%` }}
                    />
                  </span>
                  <span className="text-[8.5px] text-snow-3/80">{m.m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line-soft bg-[#141d29] p-3.5">
            <p className="mb-3 text-[12px] font-semibold text-snow">Voronka bosqichlari</p>
            <ul className="space-y-2.5">
              {[
                { s: "Yangi", n: 16, w: 100 },
                { s: "Kvalifikatsiya", n: 10, w: 62 },
                { s: "Diagnostika", n: 6, w: 38 },
                { s: "Taklif", n: 4, w: 25 },
                { s: "Muzokara", n: 3, w: 19 },
              ].map((r) => (
                <li key={r.s}>
                  <div className="mb-1 flex items-baseline justify-between text-[11px]">
                    <span className="text-snow-2">{r.s}</span>
                    <span className="font-semibold text-snow tabular">{r.n}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#1e2a3a]">
                    <span className="block h-full rounded-full bg-accent/80" style={{ width: `${r.w}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chrome>
  );
}
