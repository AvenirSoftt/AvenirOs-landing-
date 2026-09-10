import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * «Bitta tizim. Butun biznes.» — опорная секция страницы.
 *
 * Схема нарисована ОДНИМ SVG (линии и подписи внутри одной системы координат):
 * иначе подписи-дивы и линии-SVG разъезжаются на каждом промежуточном размере
 * окна, и связи указывают мимо узлов. На телефоне схема заменяется списком —
 * девять подписей в 390 px нечитаемы в любом исполнении.
 */

const nodes = [
  { label: "CRM", x: 180, y: 96 },
  { label: "Moliya", x: 480, y: 62 },
  { label: "Loyihalar", x: 780, y: 96 },
  { label: "Jamoa", x: 120, y: 280 },
  { label: "Hisobotlar", x: 840, y: 280 },
  { label: "Sotuv", x: 180, y: 464 },
  { label: "Vazifalar", x: 480, y: 498 },
  { label: "Operatsiyalar", x: 780, y: 464 },
];

const CX = 480;
const CY = 280;

export function Ecosystem() {
  return (
    <Section
      id="mahsulot"
      tone="night"
      data-eco-section
      className="vignette md:flex md:min-h-[100svh] md:flex-col md:justify-center"
    >
      <div
        data-glow
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,0.16),transparent_70%)]"
      />
      <Shell className="relative">
        <SectionHead
          align="center"
          eyebrow="Yagona muhit"
          title={
            <>
              Bitta tizim. <span className="text-snow-3">Butun biznes.</span>
            </>
          }
          lead="Bo'limlar bir-biriga integratsiya qilinmagan — ular bitta tizimning qismlari. Shuning uchun bitim loyihaga, loyiha vazifa va hisob-fakturaga o'zi bog'lanadi."
        />

        <div data-eco className="mx-auto mt-10 hidden w-full max-w-[880px] md:block">
          <svg viewBox="0 0 960 560" className="w-full" role="img" aria-label="AvenirOS bo'limlari markazga bog'langan sxema">
            <defs>
              <radialGradient id="core" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.65" />
              </radialGradient>
            </defs>

            {/* Связи прочерчиваются от центра наружу: длина считается точно
                (это отрезок), поэтому линия доезжает ровно до узла, а не
                «примерно». Разбег по времени — чтобы схема собиралась, а не
                вспыхивала целиком. */}
            {nodes.map((n, i) => {
              const len = Math.hypot(n.x - CX, n.y - CY);
              return (
                <line
                  key={`l-${n.label}`}
                  data-eco-line
                  className="eco-line"
                  style={{ "--len": len, "--d": `${120 + i * 90}ms` } as React.CSSProperties}
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke="#2f4c74"
                  strokeWidth="1.25"
                />
              );
            })}

            {/* Точка данных, бегущая от раздела к центру: «ma'lumot bir marta
                kiritiladi» — здесь это видно, а не только написано. */}
            {nodes.map((n, i) => (
              <circle key={`d-${n.label}`} data-eco-dot className="flow-dot" r="2.6" fill="#38bdf8">
                <animateMotion
                  dur={`${3.4 + (i % 3) * 0.7}s`}
                  begin={`${i * 0.45}s`}
                  repeatCount="indefinite"
                  path={`M${n.x},${n.y} L${CX},${CY}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  dur={`${3.4 + (i % 3) * 0.7}s`}
                  begin={`${i * 0.45}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Центр */}
            <g data-eco-core>
              <circle className="breathe" cx={CX} cy={CY} r="86" fill="url(#core)" opacity="0.18" />
              <circle cx={CX} cy={CY} r="62" fill="#101826" stroke="#2563eb" strokeWidth="1.5" />
            </g>
            <text
              x={CX}
              y={CY - 4}
              textAnchor="middle"
              className="fill-snow"
              style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              AvenirOS
            </text>
            <text x={CX} y={CY + 16} textAnchor="middle" className="fill-snow-3" style={{ fontSize: 11 }}>
              yagona baza
            </text>

            {nodes.map((n) => (
              <g key={n.label} data-eco-node className="eco-node">
                <rect
                  x={n.x - 74}
                  y={n.y - 20}
                  width="148"
                  height="40"
                  rx="12"
                  fill="#111a26"
                  stroke="#223143"
                />
                <circle cx={n.x - 54} cy={n.y} r="3" fill="#38bdf8" />
                <text
                  x={n.x - 40}
                  y={n.y + 4}
                  className="fill-snow-2"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Мобильный вариант: та же мысль без схемы */}
        <Reveal className="mt-10 md:hidden">
          <div className="rounded-2xl border border-line bg-panel p-4 text-center">
            <p className="text-[15px] font-semibold text-snow">AvenirOS</p>
            <p className="mt-1 text-[12px] text-snow-3">yagona ma&apos;lumotlar bazasi</p>
          </div>
          <div data-stagger className="mt-3 grid grid-cols-2 gap-2">
            {nodes.map((n) => (
              <span
                key={n.label}
                className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2.5 text-[13px] text-snow-2"
              >
                <i className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {n.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal data-eco-tail className="mx-auto mt-10 max-w-[720px] text-center" delay={120}>
          <p className="text-[15px] leading-relaxed text-snow-2 sm:text-[17px]">
            Ma&apos;lumot bir marta kiritiladi — va ishlaydi hamma joyda: sotuvda, moliyada,
            loyihada va hisobotda.
          </p>
        </Reveal>
      </Shell>
    </Section>
  );
}
