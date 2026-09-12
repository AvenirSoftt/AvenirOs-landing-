import type { ReactNode } from "react";
import type { Dict } from "@/lib/i18n";

/**
 * Рамка окна продукта: то, во что «вставлены» все макеты интерфейса.
 *
 * Зачем отдельным компонентом. Макетов на странице семь, и если рамку рисовать
 * в каждом, они разъедутся по радиусу, толщине линии и высоте шапки — глаз это
 * ловит мгновенно, и вместо одного продукта получается коллаж из скриншотов.
 *
 * Рамка умеет два состояния: НЕЖИВОЕ (вкладки и меню — просто подписи) и
 * ЖИВОЕ, когда переданы обработчики. Второе используется на первом экране, где
 * по системе можно ходить; остальные макеты остаются картинками намеренно —
 * семь интерактивных окон на одной странице соревновались бы друг с другом.
 */
export function Chrome({
  title,
  children,
  className = "",
  tabs,
  activeTab = 0,
  onTab,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tabs?: readonly string[];
  activeTab?: number;
  onTab?: (index: number) => void;
}) {
  return (
    <div className={`panel overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="block h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="block h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="truncate text-[12px] font-medium text-snow-3">{title}</span>
        {tabs ? (
          <span className="ml-auto hidden items-center gap-1 sm:flex">
            {tabs.map((t, i) =>
              onTab ? (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTab(i)}
                  aria-pressed={i === activeTab}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 ${
                    i === activeTab
                      ? "bg-primary text-white"
                      : "text-snow-3 hover:bg-white/[0.06] hover:text-snow-2"
                  }`}
                >
                  {t}
                </button>
              ) : (
                <span
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                    i === activeTab ? "bg-primary text-white" : "text-snow-3"
                  }`}
                >
                  {t}
                </span>
              ),
            )}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/**
 * Боковое меню продукта.
 *
 * Без `onSelect` это фон — узнаваемая часть интерфейса и не более. С
 * `onSelect` пункты становятся настоящими кнопками, и по системе можно
 * ходить: именно так меню работает на первом экране.
 */
export function Rail({
  ui,
  active = 0,
  onSelect,
}: {
  ui: Dict["ui"];
  active?: number;
  onSelect?: (index: number) => void;
}) {
  // Порядок такой же, как в системе: работа сверху, аналитика ниже. Индекс —
  // это позиция в `ui.rail`, по нему же выбирается экран.
  const items: { g?: string; i?: string; idx?: number }[] = [
    { g: ui.railGroups[0] },
    { i: ui.rail[0], idx: 0 },
    { i: ui.rail[1], idx: 1 },
    { i: ui.rail[2], idx: 2 },
    { i: ui.rail[3], idx: 3 },
    { i: ui.rail[4], idx: 4 },
    { g: ui.railGroups[1] },
    { i: ui.rail[5], idx: 5 },
    { i: ui.rail[6], idx: 6 },
    { i: ui.rail[7], idx: 7 },
    { i: ui.rail[8], idx: 8 },
  ];

  return (
    <aside className="hidden w-[172px] shrink-0 border-r border-white/[0.07] px-3 py-4 lg:block">
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
              {onSelect ? (
                <button
                  type="button"
                  onClick={() => onSelect(it.idx as number)}
                  aria-current={it.idx === active ? "page" : undefined}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11.5px] transition-colors duration-200 ${
                    it.idx === active
                      ? "bg-primary/15 font-medium text-primary-bright"
                      : "text-snow-2/80 hover:bg-white/[0.05] hover:text-snow"
                  }`}
                >
                  <i
                    className={`h-1.5 w-1.5 shrink-0 rounded-[3px] ${
                      it.idx === active ? "bg-primary-bright" : "bg-snow-3/40"
                    }`}
                  />
                  <span className="truncate">{it.i}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] ${
                    it.idx === active ? "bg-primary/15 font-medium text-primary-bright" : "text-snow-2/80"
                  }`}
                >
                  <i
                    className={`h-1.5 w-1.5 rounded-[3px] ${
                      it.idx === active ? "bg-primary-bright" : "bg-snow-3/40"
                    }`}
                  />
                  {it.i}
                </span>
              )}
            </li>
          ),
        )}
      </ul>
    </aside>
  );
}
