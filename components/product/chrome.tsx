import type { ReactNode } from "react";

/**
 * Рамка окна продукта: то, во что «вставлены» все макеты интерфейса.
 *
 * Зачем отдельным компонентом. Макетов на странице семь, и если рамку рисовать
 * в каждом, они разъедутся по радиусу, толщине линии и высоте шапки — глаз это
 * ловит мгновенно, и вместо одного продукта получается коллаж из скриншотов.
 */
export function Chrome({
  title,
  children,
  className = "",
  tabs,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tabs?: string[];
}) {
  return (
    <div className={`panel overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center gap-3 border-b border-line-soft bg-[#0f151e]/80 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2.5 w-2.5 rounded-full bg-[#2a3648]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#2a3648]" />
          <i className="block h-2.5 w-2.5 rounded-full bg-[#2a3648]" />
        </span>
        <span className="truncate text-[12px] font-medium text-snow-3">{title}</span>
        {tabs ? (
          <span className="ml-auto hidden items-center gap-1 sm:flex">
            {tabs.map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                  i === 0 ? "bg-primary text-white" : "text-snow-3"
                }`}
              >
                {t}
              </span>
            ))}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** Боковое меню продукта — узнаваемая часть интерфейса, но только как фон. */
export function Rail({ active = "Obzor" }: { active?: string }) {
  const items = [
    { g: "Ish" },
    { i: "Obzor" },
    { i: "Vazifalar" },
    { i: "Loyihalar" },
    { i: "CRM" },
    { i: "Kontent reja" },
    { g: "Analitika" },
    { i: "Moliya" },
    { i: "Hisobotlar" },
    { i: "Jamoa" },
    { i: "AI assistent" },
  ];

  return (
    <aside className="hidden w-[172px] shrink-0 border-r border-line-soft px-3 py-4 lg:block">
      <div className="mb-5 flex items-center gap-2 px-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-[11px] font-bold text-white">
          A
        </span>
        <span className="text-[12px] font-semibold tracking-tight text-snow">AvenirOS</span>
      </div>
      <ul className="space-y-0.5">
        {items.map((it, idx) =>
          it.g ? (
            <li
              key={`g-${it.g}`}
              className={`px-2 pb-1 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-snow-3/70 ${
                idx === 0 ? "pt-0" : ""
              }`}
            >
              {it.g}
            </li>
          ) : (
            <li key={it.i}>
              <span
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] ${
                  it.i === active
                    ? "bg-primary/15 font-medium text-primary-bright"
                    : "text-snow-2/80"
                }`}
              >
                <i
                  className={`h-1.5 w-1.5 rounded-[3px] ${
                    it.i === active ? "bg-primary-bright" : "bg-snow-3/40"
                  }`}
                />
                {it.i}
              </span>
            </li>
          ),
        )}
      </ul>
    </aside>
  );
}
