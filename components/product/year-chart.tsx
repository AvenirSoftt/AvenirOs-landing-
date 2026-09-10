import { finance, monthly } from "@/lib/demo";
import { short } from "@/lib/format";

/** Годовая динамика: линия выручки и линия прибыли, как на экране «Обзор». */
export function YearChart() {
  const w = 700;
  const h = 150;
  const max = Math.max(...monthly.map((m) => m.revenue));
  const step = w / (monthly.length - 1);
  const line = (key: "revenue" | "profit") =>
    monthly
      .map((m, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${(h - (m[key] / max) * (h - 24) - 12).toFixed(1)}`)
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[120px] w-full sm:h-[150px]" preserveAspectRatio="none" aria-hidden="true">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#1e2a3a" strokeWidth="1" />
        ))}
        <path d={`${line("revenue")} L${w},${h} L0,${h} Z`} fill="#3b82f6" fillOpacity="0.12" />
        <path d={line("revenue")} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
        <path d={line("profit")} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 4" />
      </svg>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-4 text-[10.5px] text-snow-3">
          <span className="flex items-center gap-1.5">
            <i className="h-0.5 w-4 rounded bg-primary-bright" /> Tushum
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-0.5 w-4 rounded bg-success" /> Foyda
          </span>
        </div>
        <div className="hidden gap-[3.2%] text-[9.5px] text-snow-3/70 sm:flex">
          {monthly.map((m) => (
            <span key={m.m}>{m.m}</span>
          ))}
        </div>
        <span className="text-[9.5px] text-snow-3/70 sm:hidden">{short(finance.peakMonth)}</span>
      </div>
    </div>
  );
}
