/**
 * Знак AvenirOS — тот же, что стоит иконкой у самой системы
 * (`Avnir_OS/apps/web/app/icon.png`): четырёхлучевая звезда с вогнутыми лучами
 * и ромбами на концах.
 *
 * Нарисован вектором, а не вставлен картинкой: в шапке он живёт при 28 px, а в
 * подвале — при 28 px на ретине; PNG на 52 КБ ради этого грузить незачем.
 * Одним компонентом — чтобы шапка и подвал не разъехались.
 */
export function Mark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Лучи с ромбами на концах — тонкая «ось» знака */}
        <path
          d="M12 1.4v21.2M1.4 12h21.2"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {[
          [12, 1.6],
          [12, 22.4],
          [1.6, 12],
          [22.4, 12],
        ].map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x - 1.5}
            y={y - 1.5}
            width="3"
            height="3"
            rx="0.5"
            transform={`rotate(45 ${x} ${y})`}
            fill="white"
            fillOpacity="0.85"
          />
        ))}
        {/* Тело знака: вогнутая звезда */}
        <path
          d="M12 2.6c.62 5.3 4.08 8.78 9.4 9.4-5.32.62-8.78 4.1-9.4 9.4-.62-5.3-4.08-8.78-9.4-9.4 5.32-.62 8.78-4.1 9.4-9.4Z"
          fill="white"
        />
      </svg>
    </span>
  );
}
