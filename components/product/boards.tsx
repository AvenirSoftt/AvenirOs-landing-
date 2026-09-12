import { Chrome } from "@/components/product/chrome";
import { projects, team } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Доска проектов и загрузка команды.
 *
 * У каждого макета две формы: `…Body` — содержимое без рамки (его вставляет
 * живой дашборд первого экрана) и `…Mockup` — то же самое в своей рамке, как
 * отдельный экран в секции. Дублировать разметку ради этого не нужно.
 */
export function ProjectsBody({ d }: { d: Dict }) {
  const ui = d.ui;

  return (
    <div className="divide-y divide-white/[0.06]">
      <div className="hidden grid-cols-[1.6fr_1fr_0.9fr_0.8fr_0.6fr] gap-3 px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-snow-3 sm:grid">
        {ui.projectCols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      {projects.map((p, i) => (
        <div
          key={p.name}
          className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-white/[0.03] sm:grid-cols-[1.6fr_1fr_0.9fr_0.8fr_0.6fr]"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.08] text-[10px] font-semibold text-snow-2">
              {p.lead}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-snow">{p.name}</p>
              <p className="truncate text-[10.5px] text-snow-3">{ui.projectKinds[p.kind]}</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
              <span
                className={`grow-x block h-full rounded-full ${
                  p.tone === "success" ? "bg-success" : p.tone === "warning" ? "bg-warning" : "bg-danger"
                }`}
                style={{ width: `${p.progress}%`, "--d": `${150 + i * 110}ms` } as React.CSSProperties}
              />
            </span>
            <span className="w-9 text-right text-[11px] font-semibold text-snow-2 tabular">
              {p.progress}%
            </span>
          </div>

          <span className="hidden text-[11.5px] text-snow-2 tabular sm:block">{p.budget}</span>
          <span className="hidden text-[11.5px] text-snow-2 tabular sm:block">{p.deadline}</span>
          <span className="text-[11.5px] text-snow-3 tabular">{p.tasks}</span>
        </div>
      ))}
    </div>
  );
}

/** Доска проектов: прогресс, срок, бюджет и ответственный — раздел «Проекты». */
export function ProjectsMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.projectsTitle} tabs={d.ui.projectsTabs}>
      <ProjectsBody d={d} />
    </Chrome>
  );
}

export function TeamBody({ d }: { d: Dict }) {
  const ui = d.ui;

  return (
    <div className="space-y-3 p-4">
      {team.map((m, i) => (
        <div key={m.name}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-[12.5px] font-medium text-snow">
              {m.name}
              <span className="ml-2 text-[10.5px] font-normal text-snow-3">{ui.roles[m.role]}</span>
            </span>
            <span
              className={`shrink-0 text-[12px] font-semibold tabular ${
                m.load >= 90 ? "text-danger" : m.load >= 80 ? "text-warning" : "text-success"
              }`}
            >
              {m.load}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <span
              className={`grow-x block h-full rounded-full ${
                m.load >= 90 ? "bg-danger" : m.load >= 80 ? "bg-warning" : "bg-success"
              }`}
              style={{ width: `${m.load}%`, "--d": `${150 + i * 120}ms` } as React.CSSProperties}
            />
          </div>
          <p className="mt-1 text-[10.5px] text-snow-3">
            {ui.teamNote.replace("{tasks}", String(m.tasks)).replace("{projects}", String(m.projects))}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Загрузка команды: кто чем занят прямо сейчас. */
export function TeamMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.teamTitle}>
      <TeamBody d={d} />
    </Chrome>
  );
}
