import { KanbanMockup } from "@/components/product/kanban";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * «Bu shunchaki ERP emas» — второй взгляд на продукт, уже с другого угла:
 * в первом экране была цифра руководителя, здесь — ежедневная работа отдела
 * продаж. Подписи слева говорят, ЧТО именно связано, а не просто перечисляют
 * модули.
 */

const links = [
  { k: "CRM", v: "Lid, bitim va mijoz tarixi" },
  { k: "Moliya", v: "Bitim → hisob-faktura → to'lov" },
  { k: "Loyihalar", v: "Yutilgan bitim loyihaga aylanadi" },
  { k: "Jamoa", v: "Mas'ul, yuklama va muddat" },
  { k: "Analitika", v: "Konversiya va voronka summasi" },
];

export function ProductPreview() {
  return (
    <Section tone="dark" id="crm">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <SectionHead
              eyebrow="Sotuv"
              title={
                <>
                  Bu shunchaki ERP emas&nbsp;—{" "}
                  <span className="text-snow-3">yagona boshqaruv markazi.</span>
                </>
              }
              lead="Birinchi liddan yopilgan bitimgacha: har bir karta o'z bosqichida, summasi va ehtimolligi bilan turadi. Bitim yutilganda u loyihaga va hisob-fakturaga o'zi ulanadi."
            />

            <ul data-stagger className="mt-9 space-y-0">
              {links.map((l) => (
                <li
                  key={l.k}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line py-3 first:border-t"
                >
                  <span className="w-[92px] shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-bright">
                    {l.k}
                  </span>
                  <span className="text-[14.5px] text-snow-2">{l.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={80} className="min-w-0">
            <KanbanMockup />
            <p className="mt-3 text-center text-[11.5px] text-snow-3 lg:text-left">
              Ekrandagi kompaniyalar va summalar — demo hisobdan olingan misollar.
            </p>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
