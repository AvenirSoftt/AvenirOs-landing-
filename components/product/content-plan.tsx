import { Chrome } from "@/components/product/chrome";
import { content } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Контент-план — раздел «Контент-план».
 *
 * Список, а не календарь: на макете шириной в половину экрана месячная сетка
 * превращается в 30 нечитаемых ячеек, а смысл раздела (у каждого поста есть
 * канал, дата и статус согласования) держится и списком.
 */
export function ContentBody({ d }: { d: Dict }) {
  const ui = d.ui;
  const statusTone = ["text-snow-3", "text-warning", "text-success"];
  const statusBg = ["bg-white/[0.07]", "bg-warning/12", "bg-success/12"];

  return (
    <div className="divide-y divide-white/[0.06]">
      <div className="hidden grid-cols-[2fr_0.9fr_0.7fr_0.9fr] gap-3 px-4 py-2.5 text-[9.5px] font-semibold uppercase tracking-[0.13em] text-snow-3 sm:grid">
        {ui.contentCols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      {content.map((p, i) => (
        <div
          key={ui.contentTitles[p.title]}
          className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-white/[0.03] sm:grid-cols-[2fr_0.9fr_0.7fr_0.9fr]"
          style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
        >
          <p className="min-w-0 truncate text-[12.5px] font-medium text-snow">
            {ui.contentTitles[p.title]}
          </p>
          <span className="hidden text-[11.5px] text-snow-2 sm:block">{ui.channels[p.channel]}</span>
          <span className="hidden text-[11.5px] text-snow-3 tabular sm:block">{p.date}</span>
          <span
            className={`justify-self-end rounded px-2 py-0.5 text-[10px] font-medium ${statusBg[p.status]} ${statusTone[p.status]}`}
          >
            {ui.contentStatuses[p.status]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ContentMockup({ d }: { d: Dict }) {
  return (
    <Chrome title={d.ui.contentTitle}>
      <ContentBody d={d} />
    </Chrome>
  );
}
