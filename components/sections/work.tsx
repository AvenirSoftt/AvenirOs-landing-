import { ProjectsMockup, TeamMockup } from "@/components/product/boards";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/**
 * Проекты, задачи и команда — «как работа доходит до результата».
 *
 * Светлая секция с двумя тёмными экранами продукта: слева то, что делается,
 * справа — кем. Порядок не случайный: сначала работа, потом люди.
 */
export function Work() {
  return (
    <Section tone="light">
      <Shell>
        <SectionHead
          tone="light"
          eyebrow="Loyihalar va jamoa"
          title={
            <>
              Rejadan natijagacha&nbsp;— <span className="text-ink-3">hammasi nazoratda.</span>
            </>
          }
          lead="Loyihada byudjet, muddat, jamoa va bajarilish foizi bir joyda. Vazifada — ijrochi, nazoratchi, muddat va sarflangan soat; shuning uchun loyiha foydasi taxmin emas, hisob."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
          <Reveal className="min-w-0">
            <ProjectsMockup />
          </Reveal>
          <Reveal delay={90} className="min-w-0">
            <TeamMockup />
          </Reveal>
        </div>

        <div data-stagger className="mt-10 grid gap-x-10 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3">
          {[
            {
              t: "Ijrochi va nazoratchi",
              d: "Vazifada ikki rol: kim bajaradi va kim ishni qabul qiladi. Ikkinchisi bo'lmasa, «tekshirildi» degan bosqich hech kimga tegishli bo'lmay qoladi.",
            },
            {
              t: "Mehnat sarfi",
              d: "Taymer vazifadan yuritiladi va soatlar loyihaga tushadi — foydalilik shu yerdan chiqadi.",
            },
            {
              t: "Yuklama",
              d: "Kim band, kim bo'sh — ro'yxat emas, foiz. Yangi ishni kimga berish shu yerdan ko'rinadi.",
            },
          ].map((c) => (
            <div key={c.t}>
              <h3 className="text-[15.5px] font-semibold text-ink-1">{c.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{c.d}</p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
