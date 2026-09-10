import { Chrome } from "@/components/product/chrome";
import { finance, kanban } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * CRM-канбан AvenirOS: воронка от «Новый» до «Переговоры».
 *
 * Колонки прокручиваются ВНУТРИ рамки (класс `pan-x`), а не растягивают
 * страницу — на телефоне это единственный честный способ показать доску:
 * сжать пять колонок в 390 px и оставить их читаемыми нельзя.
 */
export function KanbanMockup({ d }: { d: Dict }) {
  const ui = d.ui;
  const sourceName = (key: keyof Dict["ui"]["sources"]) => ui.sources[key];

  return (
    <Chrome title={ui.crmTitle} tabs={ui.crmTabs}>
      <div className="grid grid-cols-2 gap-px bg-line-soft sm:grid-cols-4">
        <Stat label={ui.leadsTotal} value={String(finance.leads)} sub={ui.leadsTotalNote} />
        <Stat label={ui.funnelSum} value="596.000.000" sub={ui.funnelSumNote} tone="text-primary-bright" />
        <Stat label={ui.winRate} value="66,67%" sub={ui.winRateNote} tone="text-success" />
        <Stat label={ui.stalled} value="38" sub={ui.stalledNote} tone="text-warning" />
      </div>

      <div className="relative">
        {/* Правый край колонок гасится градиентом: обрезанная карточка так
            читается как «дальше есть ещё», а не как поломка вёрстки. */}
        <span
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0f151e] to-transparent"
          aria-hidden="true"
        />
        <div className="pan-x flex gap-3 p-3.5 sm:p-4">
          {kanban.map((col, ci) => (
            <div key={col.stage} className="w-[228px] shrink-0">
              <div className="mb-2 flex items-center gap-2 px-0.5">
                <i className={`h-1.5 w-1.5 rounded-full ${col.dot}`} aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-snow-2">
                  {ui.stages[ci]}
                </span>
                <span className="rounded bg-[#1c2634] px-1.5 py-0.5 text-[10px] font-medium text-snow-3 tabular">
                  {col.count}
                </span>
              </div>
              <p className="mb-2 px-0.5 text-[10.5px] text-snow-3 tabular">
                {col.total} {ui.currency}
              </p>

              <div className="space-y-2">
                {col.leads.map((lead, li) => (
                  <article
                    key={`${col.stage}-${lead.company}-${lead.note}`}
                    className="pop lift rounded-lg border border-line-soft bg-[#141d29] p-2.5 hover:border-primary/40"
                    style={{ "--d": `${ci * 90 + li * 60}ms` } as React.CSSProperties}
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#1e2a3a] text-[10px] font-semibold text-snow-2">
                        {lead.company.slice(0, 1)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-snow">{lead.company}</p>
                        <p className="truncate text-[10px] text-snow-3">{lead.note}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold text-snow tabular">
                      {lead.amount}{" "}
                      <span className="text-[10.5px] font-medium text-snow-2">{ui.currency}</span>
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-snow-3">
                      <span>{ui.probability}</span>
                      <span className="font-semibold text-snow-2 tabular">{lead.chance}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#1e2a3a]">
                      <span
                        className="grow-x block h-full rounded-full bg-primary-bright"
                        style={
                          {
                            width: `${lead.chance}%`,
                            "--d": `${300 + ci * 90 + li * 60}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="rounded bg-success/12 px-1.5 py-0.5 text-[9.5px] font-medium text-success">
                        {sourceName(lead.source)}
                      </span>
                      <span className="text-[9.5px] text-snow-3">{lead.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function Stat({
  label,
  value,
  sub,
  tone = "text-snow",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: string;
}) {
  return (
    <div className="bg-[#111a24] px-4 py-3">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.13em] text-snow-3">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold tabular sm:text-[17px] ${tone}`}>{value}</p>
      <p className="mt-0.5 text-[10px] text-snow-3">{sub}</p>
    </div>
  );
}
