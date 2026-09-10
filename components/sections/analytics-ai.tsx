import { AnalyticsMockup } from "@/components/product/analytics";
import { AiMockup } from "@/components/product/ai-panel";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";

/** Аналитика: то, ради чего руководитель вообще открывает систему. */
export function Analytics() {
  return (
    <Section id="analitika" tone="dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_80%_10%,rgba(56,189,248,0.10),transparent_70%)]" />
      <Shell className="relative">
        <SectionHead
          eyebrow="Analitika"
          title={
            <>
              Rahbar uchun kerakli raqamlar&nbsp;— <span className="text-snow-3">bitta ekranda.</span>
            </>
          }
          lead="Tushum va foyda dinamikasi, konversiya, o'rtacha chek, jamoa yuklamasi. Hisobot yig'ish shart emas: raqamlar tizimdagi ishdan o'zi hosil bo'ladi."
        />
        <Reveal className="mt-12 min-w-0">
          <AnalyticsMockup />
        </Reveal>
      </Shell>
    </Section>
  );
}

/**
 * AI-ассистент.
 *
 * Честно про статус: раздел в системе есть и отвечает по данным организации, а
 * прогнозы и детект рисков компания сама объявляет как «в разработке». Так и
 * написано — обещать неготовое на странице продукта нельзя.
 */
export function Ai() {
  return (
    <Section tone="light">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div>
            <SectionHead
              tone="light"
              eyebrow="AI assistent"
              title={<>Tizimdan oddiy til bilan so&apos;rang</>}
              lead="Assistent tashkilotning o'z ma'lumotlariga tayanadi: xarajat, qarzdorlik, vazifalar. Javob — sizning huquqlaringiz doirasida, ya'ni u begona bo'limni ko'rsatmaydi."
            />

            <Reveal delay={100} className="mt-8 rounded-2xl border border-hairline bg-card p-5">
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-warning">
                <i className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
                Ishlab chiqilmoqda
              </p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">
                Keyingi bosqich — xavf detektsiyasi (muddati o&apos;tayotgan ish va to&apos;lov),
                tushum va kesh-flou prognozi, hamda qaror izohi: AI qaysi raqamga tayanganini
                ko&apos;rsatadi. Bu qism hali tayyor emas va shunday deb yozilgan.
              </p>
            </Reveal>
          </div>

          <Reveal delay={60} className="min-w-0">
            <AiMockup />
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
