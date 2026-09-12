import type { ReactNode } from "react";
import type { Dict } from "@/lib/i18n";

/**
 * Мелкие детали интерфейса AvenirOS: карточка показателя, спарклайн, кольцо
 * здоровья, полоса план/факта. Их переиспользуют все макеты, поэтому цвета и
 * пропорции живут в одном месте.
 *
 * Цвета — смысловые, ровно как в продукте: зелёный «лучше плана», янтарный
 * «внимание», красный «хуже». Украшением цвет здесь не бывает.
 */

export const tone = {
  success: { text: "text-success", bg: "bg-success", soft: "bg-success/12", ring: "#34d399" },
  warning: { text: "text-warning", bg: "bg-warning", soft: "bg-warning/12", ring: "#fbbf24" },
  danger: { text: "text-danger", bg: "bg-danger", soft: "bg-danger/12", ring: "#f87171" },
  primary: { text: "text-primary-bright", bg: "bg-primary-bright", soft: "bg-primary/12", ring: "#3b82f6" },
  violet: { text: "text-violet", bg: "bg-violet", soft: "bg-violet/12", ring: "#a78bfa" },
} as const;

export type Tone = keyof typeof tone;

/**
 * Карточка внутри макета — тонкое стекло, а не заливка: под ней лежит стекло
 * рамки, и вторая сплошная плоскость поверх первой выглядела бы наклейкой.
 */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-soft rounded-xl p-3.5 sm:p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardLabel({ children, icon }: { children: ReactNode; icon?: Tone }) {
  return (
    <div className="mb-2.5 flex items-start justify-between gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-snow-3">
        {children}
      </span>
      {icon ? (
        <span className={`h-6 w-6 shrink-0 rounded-lg ${tone[icon].soft}`} aria-hidden="true" />
      ) : null}
    </div>
  );
}

/** Спарклайн под числом — как в карточках «Выручка / Расходы / Прибыль». */
export function Spark({
  points,
  color,
  fill = true,
  delay = 0,
}: {
  points: number[];
  color: string;
  fill?: boolean;
  delay?: number;
}) {
  const w = 220;
  const h = 46;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / span) * (h - 6) - 3] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
      {fill ? (
        <path
          className="fade-in-slow"
          style={{ "--d": "700ms" } as React.CSSProperties}
          d={`${line} L${w},${h} L0,${h} Z`}
          fill={color}
          fillOpacity="0.1"
        />
      ) : null}
      {/* Линия рисуется сама: длина пути с запасом — ширина плюс подъёмы. */}
      <path
        className="draw"
        style={{ "--len": 300, "--d": `${delay}ms` } as React.CSSProperties}
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Кольцо «Здоровье компании»: 45/100 — ровно как на дашборде продукта. */
export function HealthRing({ score, size = 132 }: { score: number; size?: number }) {
  const r = size / 2 - 9;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#223143" strokeWidth="9" />
        {/* Дуга дорисовывается до значения: 45/100 читается как движение, а не
            как статичная картинка. Дасharray держит длину дуги, поэтому
            анимируется только смещение. */}
        <circle
          className="draw-arc"
          style={{ "--len": filled, "--d": "260ms" } as React.CSSProperties}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
        />
      </svg>
      <span className="absolute text-center">
        <span className="block text-[26px] font-semibold leading-none text-snow tabular">{score}</span>
        <span className="block text-[10px] text-snow-3">/ 100</span>
      </span>
    </div>
  );
}

/** Полоса «План/факт»: факт, цель и засечка прогноза. */
export function PlanBar({
  label,
  value,
  fact,
  target,
  forecast,
  t,
  delay = 0,
  ui,
}: {
  label: string;
  value: number;
  fact: string;
  target: string;
  forecast: string;
  t: Tone;
  delay?: number;
  ui: Dict["ui"];
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] font-medium text-snow">{label}</span>
        <span className={`text-[12.5px] font-semibold tabular ${tone[t].text}`}>
          {value.toFixed(1).replace(".", ",")}%
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <span
          className={`grow-x absolute inset-y-0 left-0 rounded-full ${tone[t].bg}`}
          style={{ width: `${Math.min(100, value)}%`, "--d": `${delay}ms` } as React.CSSProperties}
        />
        <span className="absolute inset-y-0 w-px bg-snow-3/50" style={{ left: "72%" }} aria-hidden="true" />
      </div>
      <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-snow-3">
        <span>
          {ui.fact} <b className="font-semibold text-snow-2">{fact}</b>
        </span>
        <span>
          {ui.target} <b className="font-semibold text-snow-2">{target}</b>
        </span>
        <span className="hidden sm:inline">
          {ui.forecast} <b className="font-semibold text-snow-2">{forecast}</b>
        </span>
      </p>
    </div>
  );
}
