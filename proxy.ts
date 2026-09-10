import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Корень сайта уводится на язык.
 *
 * Выбор идёт по заголовку браузера `Accept-Language`, а не жёстко на
 * узбекский: человек из России, зашедший по прямой ссылке, должен получить
 * русскую версию сразу. Если ничего не подошло — узбекский, он здесь основной.
 *
 * Язык, выбранный руками, важнее браузера: переключатель кладёт его в куку
 * `lang`, и она перебивает заголовок.
 *
 * В Next 16 этот файл называется `proxy.ts` (бывший `middleware.ts`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const saved = request.cookies.get("lang")?.value;
  const fromHeader = request.headers
    .get("accept-language")
    ?.split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => locales.some((l) => l === code));

  const lang = locales.find((l) => l === saved) ?? fromHeader ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Служебные пути и файлы с расширением не трогаем: иначе иконка и статика
  // уедут на /uz/icon.png и отдадут 404.
  matcher: ["/((?!_next|favicon.ico|icon.png|.*\\..*).*)"],
};
