import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * Поток данных, выгоды и порядок запуска.
 *
 * Три коротких смысловых блока подряд, и ни один из них НЕ карточка с иконкой:
 * поток — линия с шагами, выгоды — типографика с номерами, запуск — три шага.
 * Одинаковые прямоугольники здесь читались бы как заполнитель.
 */

const flow = [
  { k: "CRM", v: "lid va bitim" },
  { k: "Sotuv", v: "yutilgan bitim" },
  { k: "Loyiha", v: "byudjet va jamoa" },
  { k: "Vazifalar", v: "ish va soatlar" },
  { k: "Moliya", v: "hisob-faktura va to'lov" },
  { k: "Analitika", v: "foyda va prognoz" },
];

export function DataFlow() {
  return (
    <Section tone="night">
      <Shell>
        <SectionHead
          align="center"
          eyebrow="Ma'lumot oqimi"
          title={
            <>
              Ma&apos;lumot bir marta kiritiladi.{" "}
              <span className="text-snow-3">Qarorlar hamma joyda ishlaydi.</span>
            </>
          }
        />

        <Reveal className="mt-14">
          <ol data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {flow.map((s, i) => (
              <li key={s.k} className="relative lg:px-3">
                {/* Соединительная линия рисуется только на широком экране: в
                    колонку она превращается в бессмысленный обрубок. */}
                {i < flow.length - 1 && (
                  <span
                    className="absolute right-0 top-[13px] hidden h-px w-6 translate-x-1/2 bg-gradient-to-r from-primary/70 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="flex items-center gap-2">
                  <i className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-[10px] font-semibold text-primary-bright tabular">
                    {i + 1}
                  </i>
                  <span className="text-[13.5px] font-semibold text-snow">{s.k}</span>
                </span>
                <p className="mt-1.5 pl-8 text-[12.5px] leading-snug text-snow-3 lg:pl-0">{s.v}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Shell>
    </Section>
  );
}

const benefits = [
  {
    n: "01",
    t: "Yagona tizim",
    d: "Barcha bo'limlar bitta ma'lumotlar muhiti bilan ishlaydi — integratsiya va eksport-import shart emas.",
  },
  {
    n: "02",
    t: "Real vaqtda nazorat",
    d: "Biznes holatini istalgan vaqtda ko'rasiz: oy yopilishini yoki hisobot yig'ilishini kutmasdan.",
  },
  {
    n: "03",
    t: "Shaffof jarayon",
    d: "Har bir vazifa va bitimning holati aniq: kim bajaradi, kim qabul qiladi, qachongacha.",
  },
  {
    n: "04",
    t: "Moslashuvchan boshqaruv",
    d: "Bo'limlar, rollar, voronka bosqichlari va vazifa statuslari sizning jarayoningizga sozlanadi.",
  },
];

export function Benefits() {
  return (
    <Section tone="light">
      <Shell>
        <SectionHead
          tone="light"
          eyebrow="Nima beradi"
          title={<>To&apos;rtta narsa o&apos;zgaradi</>}
        />

        <div data-stagger className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.n} delay={i * 70} className="border-t border-hairline pt-6">
              <p className="text-[12px] font-semibold tabular text-primary">{b.n}</p>
              <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.02em] text-ink-1 sm:text-[24px]">
                {b.t}
              </h3>
              <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

const steps = [
  { n: "01", t: "Audit", d: "Biznes jarayonlaringizni ko'rib chiqamiz: kim nima qiladi, ma'lumot qayerda yotadi, nima qo'lda yig'iladi." },
  { n: "02", t: "Moslashtirish", d: "Bo'limlar, rollar va huquqlarni sozlaymiz, voronka bosqichlari va statuslarni sizning jarayoningizga qo'yamiz." },
  { n: "03", t: "Ishga tushirish", d: "Ma'lumotni ko'chiramiz, jamoani o'rgatamiz va tizim kundalik ishga chiqadi." },
];

export function HowItWorks() {
  return (
    <Section tone="light" className="pt-0">
      <Shell>
        <div className="border-t border-hairline pt-16 sm:pt-20">
          <SectionHead tone="light" eyebrow="Qanday boshlanadi" title={<>Uch qadam</>} />
          <div data-stagger className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <span className="text-[13px] font-semibold tabular text-ink-3">{s.n}</span>
                <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.02em] text-ink-1">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  );
}
