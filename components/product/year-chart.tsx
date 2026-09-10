import { finance, monthly } from "@/lib/demo";
import { uzs } from "@/lib/format";
import type { Dict } from "@/lib/i18n";

/**
 * Годовая динамика: линия выручки и линия прибыли — экран «Обзор».
 *
 * Подписи месяцев лежат ОТДЕЛЬНОЙ строкой во всю ширину графика и раздаются
 * `justify-between`. Раньше они висели в одном ряду с легендой и сбивались в
 * правый угол: последние месяцы наезжали друг на друга, а «Дек» обрезался
 * краем карточки. Легенда теперь под ними, слева — там, где её и ищут.
 */
export function YearChart({ ui }: { ui: Dict["ui"] }) {
  const w = 700;
  const h = 150;
  const max = Math.max(...monthly.map((m) => m.revenue));
  const step = w / (monthly.length - 1);
  const line = (key: "revenue" | "profit") =>
    monthly
      .map(
        (m, i) =>
          `${i ? "L" : "M"}${(i * step).toFixed(1)},${(h - (m[key] / max) * (h - 24) - 12).toFixed(1)}`,
      )
      .join(" ");

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-[120px] w-full sm:h-[150px]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#1e2a3a" strokeWidth="1" />
        ))}
        <path
          className="fade-in-slow"
          style={{ "--d": "900ms" } as React.CSSProperties}
          d={`${line("revenue")} L${w},${h} L0,${h} Z`}
          fill="#3b82f6"
          fillOpacity="0.12"
        />
        {/* Обе линии рисуются: сначала выручка, следом прибыль. */}
        <path
          className="draw"
          style={{ "--len": 900, "--d": "450ms" } as React.CSSProperties}
          d={line("revenue")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          className="draw"
          style={{ "--len": 900, "--d": "750ms" } as React.CSSProperties}
          d={line("profit")}
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-2 flex justify-between text-[9px] text-snow-3/70 sm:text-[9.5px]">
        {ui.months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line-soft pt-2.5">
        <div className="flex gap-4 text-[10.5px] text-snow-3">
          <span className="flex items-center gap-1.5">
            <i className="h-0.5 w-4 rounded bg-primary-bright" /> {ui.plRows[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-0.5 w-4 rounded bg-success" /> {ui.plRows[3]}
          </span>
        </div>
        <span className="text-[10.5px] text-snow-3">
          {ui.peak}: {uzs(finance.peakMonth)} {ui.currency}
        </span>
      </div>
    </div>
  );
}
