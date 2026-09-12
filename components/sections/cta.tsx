"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Heading, Shell } from "@/components/ui/section";
import type { Dict } from "@/lib/i18n";

/**
 * Закрывающий экран и форма демо.
 *
 * ВАЖНО: приёмника у формы пока нет. Поэтому она не показывает «спасибо,
 * заявка отправлена» — это была бы ложь, и человек остался бы ждать звонка,
 * которого никто не сделает. Данные проверяются, и дальше страница честно
 * говорит, что отправка ещё не подключена, и даёт живые каналы: Telegram и
 * телефон (оба взяты с avenir.uz, а не выдуманы).
 *
 * Когда появится ручка приёма — меняется ровно одно место: `submit`.
 */

const sizes = ["1–10", "11–30", "31–100", "100+"];

export function Cta({ d }: { d: Dict }) {
  const [state, setState] = useState<"idle" | "ready">("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Никакой имитации отправки: форма только проверяет поля и подсказывает,
    // куда написать прямо сейчас.
    setState("ready");
  };

  return (
    <section id="demo" className="vignette relative isolate overflow-hidden bg-ink/80 py-20 sm:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
      <div
        data-glow
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(55%_100%_at_50%_0%,rgba(37,99,235,0.16),transparent_70%)]"
      />

      <Shell>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-snow-2">
              <span className="inline-block h-px w-6 bg-primary-bright" />
              {d.cta.eyebrow}
            </p>
            <Heading size="h1">{d.cta.title}</Heading>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-snow-2">{d.cta.lead}</p>

            <ul data-stagger className="mt-9 space-y-3">
              {d.cta.bullets.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] text-snow-2">
                  <span className="mt-[3px] text-success" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.5 6.3 12 13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <form onSubmit={submit} className="rounded-2xl border border-line bg-panel/90 p-5 backdrop-blur-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="ism" label={d.cta.form.name} required autoComplete="name" />
                <Field
                  id="tel"
                  label={d.cta.form.phone}
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="+998 __ ___ __ __"
                />
                <Field id="tg" label={d.cta.form.telegram} placeholder="@username" />
                <Field id="kompaniya" label={d.cta.form.company} autoComplete="organization" />

                <div className="sm:col-span-2">
                  <span className="mb-1.5 block text-[12.5px] font-medium text-snow-2">
                    {d.cta.form.size}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                      <label
                        key={s}
                        className="cursor-pointer rounded-lg border border-line px-3.5 py-2 text-[13px] text-snow-2 transition-colors duration-300 has-[:checked]:border-primary has-[:checked]:bg-primary/15 has-[:checked]:text-snow"
                      >
                        <input type="radio" name="xodimlar" value={s} defaultChecked={i === 0} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="xabar" className="mb-1.5 block text-[12.5px] font-medium text-snow-2">
                    {d.cta.form.message}
                  </label>
                  <textarea
                    id="xabar"
                    name="xabar"
                    rows={3}
                    className="w-full resize-y rounded-xl border border-line bg-[#0f151e] px-3.5 py-2.5 text-[14px] text-snow placeholder:text-snow-3/70 focus:border-primary focus:outline-none"
                    placeholder={d.cta.form.messagePlaceholder}
                  />
                </div>
              </div>

              {/* Магнит у кнопки во всю ширину выключен: тянуться некуда, а
                  дрожание широкого блока под курсором выглядит браком. */}
              <Button type="submit" magnetic={false} className="mt-5 w-full" arrow>
                {d.cta.form.submit}
              </Button>

              {state === "ready" ? (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3.5 text-[13.5px] leading-relaxed text-snow-2"
                >
                  <b className="font-semibold text-snow">{d.cta.form.noticeTitle}</b>{" "}
                  {d.cta.form.noticeText}
                  <span className="mt-3 flex flex-wrap gap-2">
                    <a
                      href="https://t.me/avenir_uz"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium text-white"
                    >
                      Telegram: @avenir_uz
                    </a>
                    <a
                      href="tel:+998935298807"
                      className="rounded-lg border border-line px-3.5 py-2 text-[13px] font-medium text-snow"
                    >
                      +998 93 529 88 07
                    </a>
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-center text-[12px] text-snow-3">
                  {d.cta.form.direct}{" "}
                  <a href="https://t.me/avenir_uz" target="_blank" rel="noreferrer" className="text-primary-bright">
                    @avenir_uz
                  </a>
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
