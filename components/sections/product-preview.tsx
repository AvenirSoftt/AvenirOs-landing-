import { KanbanMockup } from "@/components/product/kanban";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * «Это не просто ERP» — второй взгляд на продукт, уже с другого угла: в первом
 * экране была цифра руководителя, здесь — ежедневная работа отдела продаж.
 * Подписи слева говорят, ЧТО именно связано, а не просто перечисляют модули.
 */
export function ProductPreview({ d }: { d: Dict }) {
  return (
    <Section tone="dark" id="crm">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <SectionHead
              eyebrow={d.crm.eyebrow}
              title={
                <>
                  {d.crm.title} <span className="text-snow-3">{d.crm.titleMuted}</span>
                </>
              }
              lead={d.crm.lead}
            />

            <ul data-stagger className="mt-9 space-y-0">
              {d.crm.links.map(([k, v]) => (
                <li
                  key={k}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line py-3 first:border-t"
                >
                  <span className="w-[104px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-bright">
                    {k}
                  </span>
                  <span className="text-[14.5px] text-snow-2">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={80} className="min-w-0">
            <KanbanMockup d={d} />
            <p className="mt-3 text-center text-[11.5px] text-snow-3 lg:text-left">{d.crm.note}</p>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
