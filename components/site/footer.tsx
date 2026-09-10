import { Logo } from "@/components/site/mark";
import { Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Подвал. Ссылки только те, что реально существуют: разделы этой страницы и
 * проверенные каналы компании (Telegram, телефон, почта, сайт — всё взято с
 * avenir.uz). Пустых «соцсетей ради иконок» здесь нет.
 */
export function Footer({ d }: { d: Dict }) {
  const nav = [
    { href: "#mahsulot", label: d.nav.product },
    { href: "#imkoniyatlar", label: d.nav.features },
    { href: "#modullar", label: d.nav.modules },
    { href: "#analitika", label: d.nav.analytics },
    { href: "#faq", label: d.nav.faq },
    { href: "#demo", label: d.footer.contact },
  ];

  return (
    <footer className="relative border-t border-line bg-night/90 py-14">
      <Shell>
        <div data-stagger className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={34} caption />
            <p className="mt-4 max-w-[38ch] text-[13.5px] leading-relaxed text-snow-3">
              {d.footer.tagline}
            </p>
          </div>

          <nav aria-label={d.footer.pageLabel}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
              {d.footer.pageLabel}
            </p>
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13.5px] text-snow-2 transition-colors duration-300 hover:text-snow"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
              {d.footer.contactLabel}
            </p>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <a
                  href="https://t.me/avenir_uz"
                  target="_blank"
                  rel="noreferrer"
                  className="text-snow-2 transition-colors duration-300 hover:text-snow"
                >
                  Telegram: @avenir_uz
                </a>
              </li>
              <li>
                <a href="tel:+998935298807" className="text-snow-2 transition-colors duration-300 hover:text-snow">
                  +998 93 529 88 07
                </a>
              </li>
              <li>
                <a href="mailto:info@avenir.uz" className="text-snow-2 transition-colors duration-300 hover:text-snow">
                  info@avenir.uz
                </a>
              </li>
              <li>
                <a
                  href="https://avenir.uz"
                  target="_blank"
                  rel="noreferrer"
                  className="text-snow-2 transition-colors duration-300 hover:text-snow"
                >
                  avenir.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-snow-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Avenir. {d.footer.rights}</p>
          <p>{d.footer.demoNote}</p>
        </div>
      </Shell>
    </footer>
  );
}
