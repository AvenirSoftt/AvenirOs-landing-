import { Chrome } from "@/components/product/chrome";
import { projects, tasks, team } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Доска задач — раздел «Задачи».
 *
 * Появилась вместе с живым дашбордом: меню на первом экране обещает девять
 * разделов, и «Задачи» не могли остаться единственным пунктом, который никуда
 * не ведёт.
 *
 * Три колонки, а не пять: у задачи в системе статусов больше, но на макете
 * важно показать ПРИНЦИП (работа идёт слева направо, приёмка — отдельный
 * этап), а не полный справочник. Поэтому колонки помещаются в ширину и доску
 * не нужно тянуть.
 */
export function TasksBody({ d }: { d: Dict }) {
  const ui = d.ui;

  return (
    <div className="grid gap-3 p-3.5 sm:grid-cols-3 sm:p-4">
      {ui.taskStatuses.map((status, si) => {
        const list = tasks.filter((t) => t.status === si);
        return (
          <div key={status} className="min-w-0">
            <div className="mb-2 flex items-center gap-2 px-0.5">
              <i
                className={`h-1.5 w-1.5 rounded-full ${
                  si === 0 ? "bg-primary-bright" : si === 1 ? "bg-warning" : "bg-success"
                }`}
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-snow-2">
                {status}
              </span>
              <span className="rounded bg-white/[0.07] px-1.5 py-0.5 text-[10px] font-medium text-snow-3 tabular">
                {list.length}
              </span>
            </div>

            <div className="space-y-2">
              {list.map((t, i) => (
                <article
                  key={ui.taskTitles[t.title]}
                  className="pop lift glass-soft rounded-lg p-2.5 hover:border-primary/40"
                  style={{ "--d": `${si * 90 + i * 60}ms` } as React.CSSProperties}
                >
                  <p className="text-[12px] font-semibold leading-snug text-snow">
                    {ui.taskTitles[t.title]}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-snow-3">{projects[t.project].name}</p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-white/[0.08] text-[9px] font-semibold text-snow-2">
                        {team[t.who].name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span className="truncate text-[10px] text-snow-3">{team[t.who].name}</span>
                    </span>
                    <span className="shrink-0 text-[10px] text-snow-3 tabular">{t.due}</span>
                  </div>

                  <p className="mt-1.5 text-[9.5px] text-snow-3">
                    {ui.taskHours}: <span className="tabular text-snow-2">{t.hours}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TasksMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.tasksTitle}>
      <TasksBody d={d} />
    </Chrome>
  );
}
