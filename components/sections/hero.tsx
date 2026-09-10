import { DashboardMockup } from "@/components/product/dashboard";
import { DemoBadge } from "@/components/product/parts";
import { Shell } from "@/components/ui/section";

/**
 * Первый экран.
 *
 * Ровно три вещи, в этом порядке: что это, для кого и как выглядит. Макет
 * интерфейса стоит СРАЗУ под заголовком, а не «где-то ниже»: продукт продаёт
 * себя сам, и чем раньше человек видит настоящий экран, тем меньше ему нужно
 * верить словам.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* Подложка: техническая сетка + мягкий свет за макетом */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_55%_at_50%_0%,#000_35%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(37,99,235,0.22),transparent_70%)]" />

      <Shell>
        <div className="mx-auto max-w-[880px] text-center">
          <p
            className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-snow-2"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            <i className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            Business operating system
          </p>

          <h1
            className="rise text-balance text-[length:var(--text-display)] font-semibold leading-[1.02] tracking-[-0.035em] text-snow"
            style={{ "--d": "90ms" } as React.CSSProperties}
          >
            {/* Тире приклеено к слову неразрывным пробелом: иначе при переносе
                оно уезжает в начало строки и читается как маркер списка. */}
            Biznesingizning barcha jarayonlari&nbsp;—{" "}
            <span className="bg-gradient-to-r from-primary-bright via-accent to-primary-bright bg-clip-text text-transparent">
              bitta tizimda
            </span>
          </h1>

          <p
            className="rise mx-auto mt-7 max-w-[64ch] text-pretty text-[17px] leading-[1.6] text-snow-2 sm:text-[19px]"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            AvenirOS — CRM, moliya, loyihalar va jamoani yagona tizimdan boshqarish uchun zamonaviy
            business operating system.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
            style={{ "--d": "260ms" } as React.CSSProperties}
          >
            <a
              href="#demo"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_30px_-12px_rgba(37,99,235,0.9)] transition-colors hover:bg-primary-bright"
            >
              Demo so&apos;rash
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#mahsulot"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-snow transition-colors hover:bg-white/[0.07]"
            >
              Tizimni ko&apos;rish
            </a>
          </div>

          <p
            className="rise mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-snow-3"
            style={{ "--d": "340ms" } as React.CSSProperties}
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

      <div className="relative mt-14 sm:mt-20">
        <Shell>
          <div
            className="rise-screen product-glow relative"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <DashboardMockup />
          </div>
          <div className="mt-4 flex justify-center">
            <DemoBadge />
          </div>
        </Shell>
      </div>
    </section>
  );
}
