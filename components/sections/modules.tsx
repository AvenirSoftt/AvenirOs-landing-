"use client";

import { useState } from "react";
import { AiMockup } from "@/components/product/ai-panel";
import { AnalyticsMockup, FinanceMockup } from "@/components/product/analytics";
import { ProjectsMockup, TeamMockup } from "@/components/product/boards";
import { KanbanMockup } from "@/components/product/kanban";
import { Chrome } from "@/components/product/chrome";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Обозреватель разделов: слева список, справа настоящий экран этого раздела.
 *
 * Список — это радиогруппа (`role="radiogroup"` + стрелки клавиатуры), а не
 * набор кнопок: выбран всегда ровно один раздел, и клавиатура должна вести
 * себя так же, как в любом другом переключателе.
 */

type Key = keyof Dict["modules"]["items"];

/** Порядок разделов в списке. Группа — из словаря, чтобы переводилась. */
const order: { key: Key; group: "work" | "analytics" | "service" }[] = [
  { key: "crm", group: "work" },
  { key: "finance", group: "analytics" },
  { key: "projects", group: "work" },
  { key: "tasks", group: "work" },
  { key: "analytics", group: "analytics" },
  { key: "ai", group: "analytics" },
  { key: "content", group: "work" },
  { key: "time", group: "work" },
  { key: "knowledge", group: "work" },
  { key: "brainstorm", group: "work" },
  { key: "notes", group: "work" },
  { key: "calendar", group: "work" },
  { key: "team", group: "analytics" },
  { key: "settings", group: "service" },
];

export function Modules({ d }: { d: Dict }) {
  const [active, setActive] = useState<Key>("finance");
  const current = order.find((m) => m.key === active) ?? order[0];
  const [name, desc] = d.modules.items[current.key];

  const screens: Partial<Record<Key, () => React.ReactElement>> = {
    crm: () => <KanbanMockup d={d} />,
    finance: () => <FinanceMockup d={d} />,
    projects: () => <ProjectsMockup d={d} />,
    analytics: () => <AnalyticsMockup d={d} />,
    team: () => <TeamMockup d={d} />,
    ai: () => <AiMockup d={d} />,
  };
  const Screen = screens[current.key];

  const move = (dir: 1 | -1) => {
    const i = order.findIndex((m) => m.key === active);
    const next = order[(i + dir + order.length) % order.length];
    setActive(next.key);
    document.getElementById("mod-" + next.key)?.focus();
  };

  return (
    <Section id="modullar">
      <Shell>
        <SectionHead eyebrow={d.modules.eyebrow} title={d.modules.title} lead={d.modules.lead} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
          <Reveal>
            <div
              role="radiogroup"
              aria-label={d.modules.aria}
              className="glass-soft rounded-2xl p-1.5"
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
              {order.map((m) => {
                const on = m.key === active;
                return (
                  <button
                    key={m.key}
                    id={"mod-" + m.key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(m.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors duration-300 ${
                      on ? "bg-primary/15 text-snow" : "text-snow-2 hover:bg-white/[0.05] hover:text-snow"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "bg-accent" : "bg-snow-3/40"}`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">
                      {d.modules.items[m.key][0]}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] uppercase tracking-[0.12em] ${
                        on ? "text-primary-bright/80" : "text-snow-3"
                      }`}
                    >
                      {d.modules.groups[m.group]}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={80} className="min-w-0">
            <div className="mb-4">
              <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-snow">
                {name}
              </h3>
              <p className="mt-1 max-w-[62ch] text-[14.5px] leading-relaxed text-snow-2">{desc}</p>
            </div>

            {/* Ключ плюс класс появления: при выборе другого раздела экран
                пересобирается и въезжает заново. Без этого переключение
                выглядит как мгновенная подмена картинки. */}
            {Screen ? (
              <div key={current.key} className="rise">
                <Screen />
              </div>
            ) : (
              <Chrome key={current.key} title={"AvenirOS — " + name}>
                <div className="p-6">
                  <p className="text-[13px] text-snow-2">{d.modules.fallback}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {order
                      .filter((m) => m.group === current.group && m.key !== current.key)
                      .slice(0, 6)
                      .map((m) => (
                        <li
                          key={m.key}
                          className="glass-soft rounded-lg px-3 py-2 text-[12px] text-snow-3"
                        >
                          {d.modules.items[m.key][0]}
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
