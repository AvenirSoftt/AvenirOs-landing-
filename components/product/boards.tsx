import { Chrome } from "@/components/product/chrome";
import { projects, team } from "@/lib/demo";

/** Доска проектов: прогресс, срок, бюджет и ответственный — как в разделе «Loyihalar». */
export function ProjectsMockup() {
  return (
    <Chrome title="AvenirOS — Loyihalar" tabs={["Ro'yxat", "Kanban", "Gantt"]}>
      <div className="divide-y divide-line-soft">
        <div className="hidden grid-cols-[1.6fr_1fr_0.9fr_0.8fr_0.6fr] gap-3 px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-snow-3 sm:grid">
          <span>Loyiha</span>
          <span>Bajarilishi</span>
          <span>Byudjet</span>
          <span>Muddat</span>
          <span>Vazifalar</span>
        </div>

        {projects.map((p, i) => (
          <div
            key={p.name}
            className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[1.6fr_1fr_0.9fr_0.8fr_0.6fr]"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1e2a3a] text-[10px] font-semibold text-snow-2">
                {p.lead}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-semibold text-snow">{p.name}</p>
                <p className="truncate text-[10.5px] text-snow-3">{p.client}</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e2a3a]">
                <span
                  className={`grow-x block h-full rounded-full ${
                    p.tone === "success" ? "bg-success" : p.tone === "warning" ? "bg-warning" : "bg-danger"
                  }`}
                  style={{ width: `${p.progress}%`, "--d": `${150 + i * 110}ms` } as React.CSSProperties}
                />
              </span>
              <span className="w-9 text-right text-[11px] font-semibold text-snow-2 tabular">{p.progress}%</span>
            </div>

            <span className="hidden text-[11.5px] text-snow-2 tabular sm:block">{p.budget}</span>
            <span className="hidden text-[11.5px] text-snow-2 tabular sm:block">{p.deadline}</span>
            <span className="text-[11.5px] text-snow-3 tabular">{p.tasks}</span>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

/** Загрузка команды: кто чем занят прямо сейчас. */
export function TeamMockup() {
  return (
    <Chrome title="AvenirOS — Jamoa yuklamasi">
      <div className="space-y-3 p-4">
        {team.map((m, i) => (
          <div key={m.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-[12.5px] font-medium text-snow">
                {m.name}
                <span className="ml-2 text-[10.5px] font-normal text-snow-3">{m.role}</span>
              </span>
              <span
                className={`shrink-0 text-[12px] font-semibold tabular ${
                  m.load >= 90 ? "text-danger" : m.load >= 80 ? "text-warning" : "text-success"
                }`}
              >
                {m.load}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#1e2a3a]">
              <span
                className={`grow-x block h-full rounded-full ${
                  m.load >= 90 ? "bg-danger" : m.load >= 80 ? "bg-warning" : "bg-success"
                }`}
                style={{ width: `${m.load}%`, "--d": `${150 + i * 120}ms` } as React.CSSProperties}
              />
            </div>
            <p className="mt-1 text-[10.5px] text-snow-3">
              {m.tasks} ta vazifa · {m.projects} ta loyiha
            </p>
          </div>
        ))}
      </div>
    </Chrome>
  );
}
