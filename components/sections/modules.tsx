"use client";

import { useState } from "react";
import { AiMockup } from "@/components/product/ai-panel";
import { AnalyticsMockup, FinanceMockup } from "@/components/product/analytics";
import { ProjectsMockup, TeamMockup } from "@/components/product/boards";
import { KanbanMockup } from "@/components/product/kanban";
import { Chrome } from "@/components/product/chrome";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import { modules } from "@/lib/demo";

/**
 * Обозреватель разделов: слева список, справа настоящий экран этого раздела.
 *
 * Список — это радиогруппа (`role="radiogroup"` + стрелки клавиатуры), а не
 * набор кнопок: выбран всегда ровно один раздел, и клавиатура должна вести
 * себя так же, как в любом другом переключателе.
 */

const withScreen: Record<string, () => React.ReactElement> = {
  crm: KanbanMockup,
  finance: FinanceMockup,
  projects: ProjectsMockup,
  analytics: AnalyticsMockup,
  team: TeamMockup,
  ai: AiMockup,
};

export function Modules() {
  type ModuleKey = (typeof modules)[number]["key"];
  const [active, setActive] = useState<ModuleKey>("finance");
  const current = modules.find((m) => m.key === active) ?? modules[0];
  const Screen = withScreen[current.key];

  const move = (dir: 1 | -1) => {
    const i = modules.findIndex((m) => m.key === active);
    const next = modules[(i + dir + modules.length) % modules.length];
    setActive(next.key);
    document.getElementById(`mod-${next.key}`)?.focus();
  };

  return (
    <Section id="modullar" tone="light">
      <Shell>
        <SectionHead
          tone="light"
          eyebrow="Modullar"
          title={<>Tizim ichida nima bor</>}
          lead="16 ta bo'lim, va ular bir-birini davom ettiradi. Bo'limni tanlang — uning haqiqiy ekrani ko'rinadi."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
          <Reveal>
            <div
              role="radiogroup"
              aria-label="Tizim bo'limlari"
              className="rounded-2xl border border-hairline bg-card p-1.5"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  move(1);
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  move(-1);
                }
              }}
            >
              {modules.map((m) => {
                const on = m.key === active;
                return (
                  <button
                    key={m.key}
                    id={`mod-${m.key}`}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(m.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                      on ? "bg-ink text-snow" : "text-ink-1 hover:bg-paper-2"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        on ? "bg-accent" : "bg-ink-3/50"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{m.name}</span>
                    <span
                      className={`shrink-0 text-[10px] uppercase tracking-[0.12em] ${
                        on ? "text-snow-3" : "text-ink-3"
                      }`}
                    >
                      {m.group}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={80} className="min-w-0">
            <div className="mb-4">
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink-1">{current.name}</h3>
              <p className="mt-1 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-2">{current.desc}</p>
            </div>

            {Screen ? (
              <Screen key={current.key} />
            ) : (
              <Chrome key={current.key} title={`AvenirOS — ${current.name}`}>
                <div className="p-6">
                  <p className="text-[13px] text-snow-2">
                    Bu bo&apos;lim tizimda ishlaydi va demo ko&apos;rsatuvida to&apos;liq
                    ko&apos;rsatiladi.
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {modules
                      .filter((m) => m.group === current.group && m.key !== current.key)
                      .slice(0, 6)
                      .map((m) => (
                        <li
                          key={m.key}
                          className="rounded-lg border border-line-soft bg-[#141d29] px-3 py-2 text-[12px] text-snow-3"
                        >
                          {m.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </Chrome>
            )}
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
