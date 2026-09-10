import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageMotion } from "@/components/motion/page-motion";

/**
 * Две гарнитуры, у каждой своя работа. Inter — интерфейс и текст: он же стоит
 * в самом AvenirOS, поэтому макеты экранов выглядят как настоящие. Space
 * Grotesk — заголовки: у Inter в крупном кегле нет характера, и первый экран
 * начинает читаться как «шрифт по умолчанию».
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const title = "AvenirOS — Biznesingizning barcha jarayonlari bitta tizimda";
const description =
  "AvenirOS — CRM, moliya, loyihalar va jamoani yagona tizimda boshqarish uchun zamonaviy biznes platforma.";
const url = "https://avenir-erp.uz";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  applicationName: "AvenirOS",
  keywords: [
    "AvenirOS",
    "ERP",
    "CRM",
    "biznes operatsion tizim",
    "moliya boshqaruvi",
    "loyihalar boshqaruvi",
    "O'zbekiston ERP",
  ],
  authors: [{ name: "Avenir", url: "https://avenir.uz" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    url,
    siteName: "AvenirOS",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
};

/** Разметка для поиска. Только проверяемое: что это за продукт и кто его делает. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AvenirOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url,
  inLanguage: ["uz", "ru", "en"],
  author: { "@type": "Organization", name: "Avenir", url: "https://avenir.uz" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${inter.variable} ${space.variable} antialiased`}>
      <body className="grain bg-ink text-snow">
        <a
          href="#kontent"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Asosiy kontentga o&apos;tish
        </a>
        {/* Без JavaScript появления не сработают (их включает наблюдатель), и
            страница осталась бы наполовину пустой. Здесь всё видно сразу. */}
        <noscript>
          <style>{`.reveal,.rise,.rise-screen,.pop,.grow-x,.grow-y,.draw,.draw-arc,.fade-in-slow{opacity:1!important;transform:none!important;stroke-dashoffset:0!important}`}</style>
        </noscript>
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
