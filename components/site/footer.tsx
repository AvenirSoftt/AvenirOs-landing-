import { Shell } from "@/components/ui/section";

/**
 * Подвал. Ссылки только те, что реально существуют: разделы этой страницы и
 * проверенные каналы компании (Telegram, телефон, почта, Instagram — всё взято
 * с avenir.uz). Пустых «соцсетей ради иконок» здесь нет.
 */

const nav = [
  { href: "#mahsulot", label: "Mahsulot" },
  { href: "#imkoniyatlar", label: "Imkoniyatlar" },
  { href: "#modullar", label: "Modullar" },
  { href: "#analitika", label: "Analitika" },
  { href: "#faq", label: "FAQ" },
  { href: "#demo", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-night py-14">
      <Shell>
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 text-[16px] font-semibold tracking-tight text-snow">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4 8 1.5Z" fill="white" />
                </svg>
              </span>
              Avenir<span className="text-primary-bright">OS</span>
            </p>
            <p className="mt-3 max-w-[38ch] text-[13.5px] leading-relaxed text-snow-3">
              Business operating system: CRM, moliya, loyihalar, vazifalar va jamoa — bitta
              tizimda.
            </p>
          </div>

          <nav aria-label="Sahifa bo'limlari">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
              Sahifa
            </p>
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13.5px] text-snow-2 transition-colors hover:text-snow">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-snow-3">
              Bog&apos;lanish
            </p>
            <ul className="space-y-2 text-[13.5px]">
              <li>
                <a href="https://t.me/avenir_uz" target="_blank" rel="noreferrer" className="text-snow-2 transition-colors hover:text-snow">
                  Telegram: @avenir_uz
                </a>
              </li>
              <li>
                <a href="tel:+998935298807" className="text-snow-2 transition-colors hover:text-snow">
                  +998 93 529 88 07
                </a>
              </li>
              <li>
                <a href="mailto:info@avenir.uz" className="text-snow-2 transition-colors hover:text-snow">
                  info@avenir.uz
                </a>
              </li>
              <li>
                <a href="https://avenir.uz" target="_blank" rel="noreferrer" className="text-snow-2 transition-colors hover:text-snow">
                  avenir.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-snow-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Avenir. Barcha huquqlar himoyalangan.</p>
          <p>Sahifadagi raqamlar va kompaniya nomlari — demo hisobdan olingan misollar.</p>
        </div>
      </Shell>
    </footer>
  );
}
