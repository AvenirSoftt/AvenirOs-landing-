import { DashboardMockup } from "@/components/product/dashboard";
import { DemoBadge } from "@/components/product/parts";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/ui/section";

/**
 * Первый экран.
 *
 * Ровно три вещи, в этом порядке: что это, для кого и как выглядит. Макет
 * интерфейса стоит СРАЗУ под заголовком, а не «где-то ниже»: продукт продаёт
 * себя сам, и чем раньше человек видит настоящий экран, тем меньше ему нужно
 * верить словам.
 *
 * Движением занимается components/motion/page-motion.tsx — сюда приходят
 * только точки привязки (`data-hero-*`). Так вся хореография страницы лежит в
 * одном месте и не расползается по секциям.
 */
export function Hero() {
  return (
    <section className="vignette relative isolate overflow-hidden bg-ink pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* Подложка: техническая сетка + мягкий свет за макетом */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_55%_at_50%_0%,#000_35%,transparent_100%)]" />
      <div
        data-glow
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(58%_100%_at_50%_0%,rgba(37,99,235,0.26),transparent_72%)]"
      />
      <div
        data-parallax="18"
        className="pointer-events-none absolute -right-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_70%)] blur-2xl"
      />

      <Shell>
        <div className="mx-auto max-w-[900px] text-center">
          <p
            data-hero-eyebrow
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-snow-2"
          >
            <i className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            Business operating system
          </p>

          <h1
            data-hero-title
            className="text-balance font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold leading-[0.98] tracking-[-0.042em] text-snow"
          >
            {/* Тире убрано намеренно. В таком кегле оно всё равно оказывалось
                в начале строки и читалось как маркер списка (неразрывный
                пробел не спасает: разбивка на строки идёт по словам). Смысловой
                перелом теперь держит цвет и собственная строка — так чище. */}
            Biznesingizning barcha jarayonlari
            <span className="block bg-gradient-to-r from-primary-bright via-accent to-primary-bright bg-clip-text text-transparent">
              bitta tizimda
            </span>
          </h1>

          <p
            data-hero-lead
            className="mx-auto mt-8 max-w-[62ch] text-pretty text-[17px] leading-[1.62] text-snow-2 sm:text-[19px]"
          >
            AvenirOS — CRM, moliya, loyihalar va jamoani yagona tizimdan boshqarish uchun zamonaviy
            business operating system.
          </p>

          <div data-hero-cta className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#demo" arrow>
              Demo so&apos;rash
            </Button>
            <Button href="#mahsulot" variant="ghost">
              Tizimni ko&apos;rish
            </Button>
          </div>

          <p
            data-hero-facts
            className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[12.5px] text-snow-3"
          >
            {["16 ta tizim bo'limi", "7 foydalanuvchi roli", "Agentlik amaliyotidan"].map((f) => (
              <span key={f} className="inline-flex items-center gap-2">
                <i className="h-1 w-1 rounded-full bg-snow-3/70" aria-hidden="true" />
                {f}
              </span>
            ))}
          </p>
        </div>
      </Shell>

      <div className="relative mt-16 sm:mt-20">
        <Shell>
          <div data-hero-screen className="product-glow relative [perspective:1600px]">
            <DashboardMockup />
          </div>
          <div className="mt-5 flex justify-center">
            <DemoBadge />
          </div>
        </Shell>
      </div>
    </section>
  );
}
