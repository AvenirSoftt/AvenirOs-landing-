import { uz, type Dict } from "./uz";
import { ru } from "./ru";
import { en } from "./en";

/**
 * Языки страницы. Узбекский — исходный и по умолчанию: сайт делается для
 * узбекского рынка, а русская и английская версии идут следом.
 *
 * Маршруты: `/uz`, `/ru`, `/en`. Разные адреса, а не переключатель в состоянии,
 * — чтобы ссылкой можно было поделиться на нужном языке и чтобы поиск видел
 * три страницы, а не одну.
 */
export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

const dicts: Record<Locale, Dict> = { uz, ru, en };

export function getDict(lang: Locale): Dict {
  return dicts[lang] ?? uz;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Код языка для тега `lang` и для OpenGraph. */
export const htmlLang: Record<Locale, string> = { uz: "uz", ru: "ru", en: "en" };
export const ogLocale: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };

export type { Dict };
