import Image from "next/image";

/**
 * Знак AvenirOS — НАСТОЯЩИЙ файл продукта, а не перерисовка.
 *
 * Раньше здесь лежала обводка иконки в SVG с фирменным градиентом и свечением.
 * Форма совпадала, но знак от этого переставал быть знаком: у логотипа нет
 * градиента и нет ореола, и подделка читается сразу.
 *
 * Берётся `logo-light.png` — тот же файл, что в сайдбаре ERP
 * (`Avnir_OS/apps/web/public/`), в светлой раскладке. Тёмно-синий вариант
 * (`logo-dark.png`, он же иконка вкладки) на нашем фоне просто исчезает —
 * поэтому в шапке и подвале стоит светлый, а тёмный остаётся фавиконом.
 *
 * Размер задаётся числом, а не классом: `next/image` по нему решает, какой файл
 * отдать. Оригинал 2000×2000 — без явных размеров он приезжает целиком.
 */
export function Mark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-light.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Логотип целиком: знак + начертание. Отдельно от `Mark`, потому что в подвале
 * рядом со знаком стоит ещё и подпись категории, а в шапке — нет.
 */
export function Logo({
  size = 30,
  caption = false,
  className = "",
}: {
  size?: number;
  caption?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} />
      <span className="leading-none">
        <span className="block font-[family-name:var(--font-display)] text-[16px] font-semibold tracking-[-0.02em] text-snow">
          Avenir<span className="text-primary-bright">OS</span>
        </span>
        {caption ? (
          <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-snow-3">
            Business operating system
          </span>
        ) : null}
      </span>
    </span>
  );
}
