"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Field } from "@/components/ui/field";
import { Heading, Shell } from "@/components/ui/section";

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

export function Cta() {
  const [state, setState] = useState<"idle" | "ready">("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Никакой имитации отправки: форма только проверяет поля и подсказывает,
    // куда написать прямо сейчас.
    setState("ready");
  };

  return (
    <section id="demo" className="relative isolate overflow-hidden bg-ink py-20 sm:py-28">
      {/* Раньше здесь стоял приглушённый макет дашборда «на фоне». В деле он
          читался не как продукт, а как грязное пятно за формой — размытый
          силуэт, который непонятно что делает. Убран: фон держат сетка и свет,
          а сам интерфейс на странице уже показан семь раз в полную силу. */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(55%_100%_at_50%_0%,rgba(37,99,235,0.16),transparent_70%)]" />

      <Shell>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-snow-2">
              <span className="inline-block h-px w-6 bg-primary-bright" />
              Demo
            </p>
            <Heading size="h1">
              Biznesingizni bitta tizimga yig&apos;ishga tayyormisiz?
            </Heading>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-snow-2">
              Sotuv, moliya, loyihalar va jamoani AvenirOS orqali yagona tizimdan boshqaring.
              Demo — jonli tizim ekranlari va sizning jarayoningiz bo&apos;yicha suhbat.
            </p>

            <ul className="mt-9 space-y-3">
              {[
                "Tizimni jonli ko'rsatamiz — slayd emas",
                "Jarayoningizni birga ko'rib chiqamiz",
                "Nima moslashtirish kerakligini aytamiz",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] text-snow-2">
                  <span className="mt-[3px] text-success" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5 6.3 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90}>
            <form
              onSubmit={submit}
              className="rounded-2xl border border-line bg-panel p-5 sm:p-6"
              noValidate={false}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="ism" label="Ism va familiya" required autoComplete="name" />
                <Field id="tel" label="Telefon raqam" required type="tel" autoComplete="tel" placeholder="+998 __ ___ __ __" />
                <Field id="tg" label="Telegram" placeholder="@username" />
                <Field id="kompaniya" label="Kompaniya" autoComplete="organization" />

                <div className="sm:col-span-2">
                  <span className="mb-1.5 block text-[12.5px] font-medium text-snow-2">
                    Xodimlar soni
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                      <label
                        key={s}
                        className="cursor-pointer rounded-lg border border-line px-3.5 py-2 text-[13px] text-snow-2 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/15 has-[:checked]:text-snow"
                      >
                        <input
                          type="radio"
                          name="xodimlar"
                          value={s}
                          defaultChecked={i === 0}
                          className="sr-only"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="xabar" className="mb-1.5 block text-[12.5px] font-medium text-snow-2">
                    Xabar
                  </label>
                  <textarea
                    id="xabar"
                    name="xabar"
                    rows={3}
                    className="w-full resize-y rounded-xl border border-line bg-[#0f151e] px-3.5 py-2.5 text-[14px] text-snow placeholder:text-snow-3/70 focus:border-primary focus:outline-none"
                    placeholder="Hozir qanday tizimlardan foydalanasiz?"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-primary px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-primary-bright"
              >
                Demo so&apos;rash
              </button>

              {state === "ready" ? (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3.5 text-[13.5px] leading-relaxed text-snow-2"
                >
                  <b className="font-semibold text-snow">Forma hali serverga ulanmagan.</b> Sizni
                  kutdirib qo&apos;ymaslik uchun ochiq aytamiz: hozircha so&apos;rovni Telegram
                  yoki telefon orqali qoldiring — javob o&apos;sha kuni bo&apos;ladi.
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
                  Yoki to&apos;g&apos;ridan-to&apos;g&apos;ri:{" "}
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
