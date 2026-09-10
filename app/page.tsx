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

/**
 * Порядок секций = порядок разговора: что это → почему сейчас так нельзя →
 * как устроено → что внутри → что даёт → как начать → вопросы → заявка.
 *
 * Тема чередуется (тёмная как интерфейс продукта / светлая маркетинговая), но
 * не через одну: три тёмных подряд в начале держат «продуктовый» тон, дальше
 * ритм расходится.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="kontent">
        <Hero />
        <ProductPreview />
        <Problem />
        <Ecosystem />
        <Modules />
        <Finance />
        <Work />
        <Analytics />
        <Ai />
        <DataFlow />
        <Benefits />
        <HowItWorks />
        <CaseStudy />
        <Comparison />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
