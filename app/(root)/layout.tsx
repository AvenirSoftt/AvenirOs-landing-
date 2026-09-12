/**
 * Макет только для корня сайта.
 *
 * Общего `app/layout.tsx` здесь нет: корневым служит `[lang]/layout.tsx`, и
 * иначе быть не может — только он знает язык для `<html lang>`. Странице на
 * корне нужен свой: файл прямо под `app/` остаётся без макета сверху, и сборка
 * webpack падает на «page.tsx doesn't have a root layout» (Turbopack это
 * пропускает молча). Группа в скобках оставляет адрес просто «/».
 *
 * До браузера отсюда ничего не доходит: страница перенаправляет раньше, чем
 * успевает отрисоваться.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
