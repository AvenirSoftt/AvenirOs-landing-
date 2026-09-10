import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * Кейс.
 *
 * Всё, что здесь написано, компания говорит о себе сама в разборе проекта
 * (avenir.uz/portfolio/avenir-os): 16 разделов, 7 ролей, продукт сделан для
 * собственного агентства и используется каждый день. Никаких «-40% времени» и
 * прочих цифр эффекта: их никто не измерял, а придумывать нельзя.
 */
export function CaseStudy() {
  return (
    <Section tone="dark">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Keys"
              title={
                <>
                  Avenir OS&nbsp;— <span className="text-snow-3">o&apos;zimiz uchun qilingan tizim</span>
                </>
              }
              lead="Bu mahsulot marketing agentligi uchun ishlab chiqilgan va o'sha yerda har kuni ishlatiladi. Shuning uchun u ko'rgazma uchun emas, haqiqiy jarayonga moslashgan."
            />
            <Reveal delay={90} className="mt-8">
              <a
                href="https://avenir.uz/portfolio/avenir-os"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[14.5px] font-medium text-primary-bright transition-colors hover:text-accent"
              >
                Keysni to&apos;liq o&apos;qish
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={60} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              { v: "16", l: "tizim bo'limi" },
              { v: "7", l: "foydalanuvchi roli" },
              { v: "2026", l: "ishga tushgan yil" },
              { v: "Har kuni", l: "ichki foydalanish" },
            ].map((s) => (
              <div key={s.l} className="bg-panel px-5 py-6">
                <p className="text-[26px] font-semibold tracking-[-0.02em] text-snow sm:text-[30px]">
                  {s.v}
                </p>
                <p className="mt-1 text-[12.5px] text-snow-3">{s.l}</p>
              </div>
            ))}
            <div className="col-span-2 bg-panel px-5 py-5">
              <p className="text-[12.5px] leading-relaxed text-snow-2">
                Texnologiyalar: Next.js, React, TypeScript, FastAPI, PostgreSQL, Redis, MinIO,
                Docker.
              </p>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

const without = [
  "Excel jadvallari",
  "Telegramdagi kelishuvlar",
  "Alohida CRM",
  "Alohida buxgalteriya",
  "Qo'lda yig'iladigan hisobot",
  "Tarqoq ma'lumot",
];

const withOs = [
  "Bitta tizim",
  "Bog'langan jarayonlar",
  "Real vaqtdagi analitika",
  "Markazlashgan ma'lumot",
  "Aniq mas'uliyat",
  "Yagona operatsion muhit",
];

export function Comparison() {
  return (
    <Section tone="light">
      <Shell>
        <SectionHead
          tone="light"
          align="center"
          eyebrow="Taqqoslash"
          title={<>Farq bitta narsada: ma&apos;lumot bog&apos;langanmi</>}
        />

        <div className="mx-auto mt-12 grid max-w-[900px] gap-4 sm:grid-cols-2 sm:gap-6">
          <Reveal className="rounded-2xl border border-hairline bg-paper-2/60 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
              AvenirOS&apos;siz
            </p>
            <ul className="mt-5 space-y-3">
              {without.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[14.5px] text-ink-2">
                  <span className="mt-[7px] h-px w-3 shrink-0 bg-ink-3" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="rounded-2xl border border-primary/25 bg-ink p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-bright">
              AvenirOS bilan
            </p>
            <ul className="mt-5 space-y-3">
              {withOs.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[14.5px] text-snow">
                  <span className="mt-[3px] shrink-0 text-success" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5 6.3 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
