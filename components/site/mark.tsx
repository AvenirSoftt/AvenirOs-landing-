/**
 * Знак AvenirOS — обведён с НАСТОЯЩЕЙ иконки продукта
 * (`Avnir_OS/apps/web/app/icon.png`, она же лежит иконкой вкладки): вогнутая
 * четырёхлучевая звезда, из неё в четыре стороны идут тонкие оси, на концах —
 * полые ромбы.
 *
 * Почему вектором, а не самим PNG. В оригинале звезда тёмно-синяя, а оси
 * почти чёрные: на тёмном фоне сайта они просто исчезают. Форма сохранена
 * один в один, а цвет взят из фирменной пары (синий → голубой) — знак остаётся
 * узнаваемым и живёт на тёмном. Плюс 28 px из PNG на 2000 px — это мыло и
 * 52 КБ на ровном месте.
 */
export function Mark({
  size = 30,
  className = "",
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.55),transparent_68%)] blur-[6px] transition-opacity duration-500"
        />
      ) : null}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
        className="relative"
      >
        <defs>
          <linearGradient id="mark-core" x1="24" y1="18" x2="78" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="55%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Оси: от тела звезды к ромбам */}
        <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity="0.85">
          <path d="M50 12v13M50 75v13M12 50h13M75 50h13" />
        </g>

        {/* Полые ромбы на концах */}
        <g stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" opacity="0.9">
          <rect x="44.4" y="4.4" width="11.2" height="11.2" rx="1.4" transform="rotate(45 50 10)" />
          <rect x="44.4" y="84.4" width="11.2" height="11.2" rx="1.4" transform="rotate(45 50 90)" />
          <rect x="4.4" y="44.4" width="11.2" height="11.2" rx="1.4" transform="rotate(45 10 50)" />
          <rect x="84.4" y="44.4" width="11.2" height="11.2" rx="1.4" transform="rotate(45 90 50)" />
        </g>

        {/* Тело: вогнутая звезда — та же кривая, что в оригинале */}
        <path
          d="M50 14c2.4 20.6 14.9 33.2 36 36-21.1 2.8-33.6 15.4-36 36-2.4-20.6-14.9-33.2-36-36 21.1-2.8 33.6-15.4 36-36Z"
          fill="url(#mark-core)"
        />
      </svg>
    </span>
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
    <span className={`group/logo inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} className="text-snow-2 transition-colors duration-500 group-hover/logo:text-accent" />
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
