import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
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
    <html lang="uz" className={`${inter.variable} antialiased`}>
      <body className="bg-ink text-snow">
        <a
          href="#kontent"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Asosiy kontentga o&apos;tish
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
