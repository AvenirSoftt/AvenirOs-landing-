import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * Проблема — светлая секция и первый перелом ритма после тёмного начала.
 *
 * Формулировки не выдуманы: это то, что компания сама описывает в разборе
 * AvenirOS (avenir.uz/portfolio/avenir-os) — задачи в трекере, бюджет в
 * таблице, договорённость в чате, контент-план в отдельном файле.
 */

const scattered = [
  { name: "Excel", note: "byudjet va hisob-kitob" },
  { name: "Telegram", note: "mijoz bilan kelishuv" },
  { name: "CRM", note: "lidlar alohida" },
  { name: "Buxgalteriya", note: "to'lovlar alohida" },
  { name: "Trekker", note: "vazifalar alohida" },
  { name: "Hisobotlar", note: "qo'lda yig'iladi" },
];

const pains = [
  "Ma'lumotlar turli joyda saqlanadi.",
  "Hisobotlar oy oxirida qo'lda yig'iladi.",
  "Sotuv va moliya bir-biridan uzilgan.",
  "Jamoa vazifalari nazoratsiz qoladi.",
  "Rahbar real holatni kech ko'radi.",
];

export function Problem() {
  return (
    <Section id="imkoniyatlar" tone="light">
      <div className="grid-lines-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(65%_60%_at_50%_50%,#000,transparent_100%)]" />
      <Shell className="relative">
        <SectionHead
          tone="light"
          eyebrow="Muammo"
          title={<>Biznes o&apos;sgani sari tizimlar ko&apos;payadi.</>}
          lead="Har biri o'z joyida ishlaydi, lekin bir-biri bilan gaplashmaydi. Natijada bir xil ma'lumot uch marta kiritiladi, hisobot qo'lda yig'iladi, rahbar esa holatni oy tugagach ko'radi."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Разрозненные инструменты: карточки намеренно «косые» и без связи */}
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {scattered.map((s, i) => (
                <div
                  key={s.name}
                  className="lift rounded-xl border border-hairline bg-card px-3.5 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-ink-3/40 hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.25)]"
                  style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
                >
                  <p className="text-[13px] font-semibold text-ink-1">{s.name}</p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink-3">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-hairline" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                bog&apos;lanmagan
              </span>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <div className="mt-8 rounded-2xl bg-ink p-5 text-center sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-snow-3">
                AvenirOS
              </p>
              <p className="mt-2 text-[17px] font-medium text-snow sm:text-[19px]">
                Bitta ma&apos;lumotlar muhiti
              </p>
              <p className="mt-1.5 text-[13px] text-snow-2">
                Har bir vazifa loyihaga, har bir loyiha mijoz va pulga bog&apos;langan.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} as="ul" className="space-y-0 self-center">
            {pains.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-4 border-b border-hairline py-4 first:border-t"
              >
                <span className="mt-0.5 text-[12px] font-semibold tabular text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-snug text-ink-1 sm:text-[16.5px]">{p}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
