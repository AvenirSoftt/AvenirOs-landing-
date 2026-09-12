"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

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
export function Faq({ d }: { d: Dict }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} lead={d.faq.lead} />

          <Reveal as="dl" className="divide-y divide-line border-y border-line">
            {d.faq.items.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q}>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={"faq-" + i}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[15.5px] font-medium leading-snug text-snow sm:text-[17px]">
                        {q}
                      </span>
                      <span
                        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-snow-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "rotate-45 border-primary/40 text-primary-bright" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd id={"faq-" + i} hidden={!isOpen} className="pb-6 pr-10">
                    <p className="max-w-[68ch] text-[14.5px] leading-relaxed text-snow-2">{a}</p>
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
