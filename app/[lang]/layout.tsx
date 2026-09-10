import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageMotion } from "@/components/motion/page-motion";
import { Backdrop } from "@/components/motion/backdrop";
import { getDict, htmlLang, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n";

/**
 * Корневой макет живёт ВНУТРИ языкового сегмента: только так у `<html lang>`
 * оказывается настоящий язык страницы, а не один на всех. Адреса — `/uz`,
 * `/ru`, `/en`; корень перенаправляет прокси (proxy.ts).
 *
 * Две гарнитуры, у каждой своя работа. Inter — интерфейс и текст: он же стоит
 * в самом AvenirOS, поэтому макеты экранов выглядят как настоящие. Manrope —
 * заголовки: у Inter в крупном кегле нет характера, и первый экран читается
 * как «шрифт по умолчанию».
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const display = Manrope({
  variable: "--font-display-src",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const url = "https://avenir-erp.uz";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "uz";
  const d = getDict(lang);

  return {
    metadataBase: new URL(url),
    title: d.meta.title,
    description: d.meta.description,
    applicationName: "AvenirOS",
    authors: [{ name: "Avenir", url: "https://avenir.uz" }],
    alternates: {
      canonical: `/${lang}`,
      // Три версии одной страницы: поиск должен знать, что это переводы, а не
      // дубликаты.
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `${url}/${lang}`,
      siteName: "AvenirOS",
      title: d.meta.title,
      description: d.meta.description,
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "uz";
  const d = getDict(lang);

  /** Разметка для поиска. Только проверяемое: что за продукт и кто его делает. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AvenirOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: d.meta.description,
    url: `${url}/${lang}`,
    inLanguage: locales.map((l) => htmlLang[l]),
    author: { "@type": "Organization", name: "Avenir", url: "https://avenir.uz" },
  };

  return (
    <html lang={htmlLang[lang]} className={`${inter.variable} ${display.variable} antialiased`}>
      <body className="grain bg-ink text-snow">
        <a
          href="#kontent"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          {d.nav.skip}
        </a>
        {/* Без JavaScript появления не сработают (их включает наблюдатель), и
            страница осталась бы наполовину пустой. Здесь всё видно сразу. */}
        <noscript>
          <style>{`.reveal,.rise,.rise-screen,.pop,.grow-x,.grow-y,.draw,.draw-arc,.fade-in-slow{opacity:1!important;transform:none!important;stroke-dashoffset:0!important}`}</style>
        </noscript>
        <Backdrop />
        <SmoothScroll>{children}</SmoothScroll>
        <PageMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
