import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { ProductPreview } from "@/components/sections/product-preview";
import { Problem } from "@/components/sections/problem";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Modules } from "@/components/sections/modules";
import { Finance } from "@/components/sections/finance";
import { Work } from "@/components/sections/work";
import { Analytics, Ai } from "@/components/sections/analytics-ai";
import { Benefits, DataFlow, HowItWorks } from "@/components/sections/value";
import { CaseStudy, Comparison } from "@/components/sections/case-compare";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { getDict, isLocale } from "@/lib/i18n";

/**
 * Порядок секций = порядок разговора: что это → почему сейчас так нельзя →
 * как устроено → что внутри → что даёт → как начать → вопросы → заявка.
 *
 * Тексты приходят словарём (`lib/i18n`) и раздаются секциям пропом. Языковой
 * контекст тут не годится: секции — серверные компоненты, а контекст живёт
 * только на клиенте.
 */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <Navbar d={d} lang={lang} />
      <main id="kontent">
        <Hero d={d} />
        <ProductPreview d={d} />
        <Problem d={d} />
        <Ecosystem d={d} />
        <Modules d={d} />
        <Finance d={d} />
        <Work d={d} />
        <Analytics d={d} />
        <Ai d={d} />
        <DataFlow d={d} />
        <Benefits d={d} />
        <HowItWorks d={d} />
        <CaseStudy d={d} />
        <Comparison d={d} />
        <Faq d={d} />
        <Cta d={d} />
      </main>
      <Footer d={d} />
    </>
  );
}
