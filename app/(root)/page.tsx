import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

/**
 * Корень сайта не несёт содержимого: он выбирает язык и уводит на `/uz`,
 * `/ru` или `/en`.
 *
 * Раньше это делал `proxy.ts` (в Next 16 так называется бывший middleware), и
 * переехало сюда ради развёртывания. Прокси в Next 16 по умолчанию идёт на
 * рантайме Node, а параметр `runtime` в файле прокси запрещён — вернуть его на
 * edge нельзя. Netlify же заворачивает такой прокси в edge-функцию Deno и не
 * может её собрать: рядом со сборкой middleware не хватает соседнего куска
 * («Cannot find module './webpack-runtime.js'»). Страница на корне не требует
 * edge-функции вовсе и одинаково работает и в `next dev`, и на Netlify.
 *
 * Правила выбора те же, что были у прокси: выбранный руками язык (кука `lang`)
 * важнее браузера, затем `Accept-Language`, иначе узбекский. `redirect()`
 * отвечает 307 — ровно как отвечал прокси.
 */
export const dynamic = "force-dynamic";

/** Язык из `Accept-Language`: по первой подходящей метке, с учётом веса `q`. */
function fromHeader(header: string | null) {
  if (!header) return undefined;
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { code: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((r) => isLocale(r.code))?.code;
}

export default async function RootPage() {
  const saved = (await cookies()).get("lang")?.value;
  const lang =
    locales.find((l) => l === saved) ?? fromHeader((await headers()).get("accept-language")) ?? defaultLocale;

  redirect(`/${lang}`);
}
