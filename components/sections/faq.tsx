"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import { faq } from "@/lib/demo";

/**
 * Вопросы и ответы.
 *
 * Обычные <button> + aria-expanded и настоящее скрытие содержимого, а не
 * «высота 0 с прозрачностью»: скрытый ответ не должен попадать в поиск по
 * странице и в озвучку скринридером, пока он закрыт.
 *
 * Ответы намеренно осторожные там, где ответ зависит от проекта (сроки, цена,
 * интеграции): обещать конкретику, которой нет, — худшее, что может сделать
 * страница продукта.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="light">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            tone="light"
            eyebrow="Savol-javob"
            title={<>Ko&apos;p so&apos;raladigan savollar</>}
            lead="Javob topilmadimi — demo suhbatida so'rang, aniq holatingizga qarab javob beramiz."
          />

          <Reveal as="dl" className="divide-y divide-hairline border-y border-hairline">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[15.5px] font-medium leading-snug text-ink-1 sm:text-[17px]">
                        {item.q}
                      </span>
                      <span
                        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-hairline text-ink-2 transition-transform duration-300 ${
                          isOpen ? "rotate-45 border-primary/40 text-primary" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd id={`faq-${i}`} hidden={!isOpen} className="pb-6 pr-10">
                    <p className="max-w-[68ch] text-[14.5px] leading-relaxed text-ink-2">{item.a}</p>
                  </dd>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
