import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Проблема — первый блок после вступления.
 *
 * Формулировки не выдуманы: это то, что компания сама описывает в разборе
 * AvenirOS (avenir.uz/portfolio/avenir-os) — задачи в трекере, бюджет в
 * таблице, договорённость в чате, контент-план в отдельном файле.
 *
 * Раньше секция была светлой и держала перелом ритма цветом фона. Теперь фон
 * один на всю страницу, и перелом держит СТРУКТУРА: слева разрозненные
 * стеклянные карточки под разными углами, справа — ровный список. Собранная
 * система внизу подсвечена синим: это единственное место в блоке, где есть
 * цвет, и взгляд идёт к нему сам.
 */
export function Problem({ d }: { d: Dict }) {
  return (
    <Section id="imkoniyatlar">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(65%_60%_at_50%_50%,#000,transparent_100%)]" />
      <Shell className="relative">
        <SectionHead eyebrow={d.problem.eyebrow} title={d.problem.title} lead={d.problem.lead} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Разрозненные инструменты: карточки намеренно «косые» и без связи */}
          <Reveal className="relative">
            <div data-stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {d.problem.tools.map(([name, note], i) => (
                <div
                  key={name}
                  className="lift glass-soft rounded-xl px-3.5 py-3 hover:border-snow-3/30"
                  style={{ transform: "rotate(" + ((i % 3) - 1) + "deg)" }}
                >
                  <p className="text-[13px] font-semibold text-snow">{name}</p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-snow-3">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
                {d.problem.divider}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="glass-sheen mt-8 rounded-2xl border border-primary/25 bg-primary/10 p-5 text-center sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-bright">
                AvenirOS
              </p>
              <p className="mt-2 text-[17px] font-medium text-snow sm:text-[19px]">
                {d.problem.unifiedTitle}
              </p>
              <p className="mt-1.5 text-[13px] text-snow-2">{d.problem.unifiedLead}</p>
            </div>
          </Reveal>

          <ul data-stagger className="space-y-0 self-center">
            {d.problem.pains.map((p, i) => (
              <li key={p} className="flex items-start gap-4 border-b border-line py-4 first:border-t">
                <span className="mt-0.5 text-[12px] font-semibold tabular text-snow-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-snug text-snow sm:text-[16.5px]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </Section>
  );
}
