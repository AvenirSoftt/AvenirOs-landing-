"use client";

import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Горизонтальная лента, которую можно ТЯНУТЬ указателем — как доску в самой
 * системе.
 *
 * Колёсико и палец здесь ни при чём: у пальца свой инерционный скролл, а у
 * колеса — вертикальная страница, и перехватывать их значит сделать хуже, чем
 * было. Поэтому захват включается только для мыши и пера (`pointerType`), а
 * `touch` уходит браузеру нетронутым.
 *
 * Две неочевидные вещи, без которых это ощущается сломанным:
 *
 *   1. **После перетаскивания нельзя пускать клик.** Карточки внутри — живые
 *      элементы; протащил доску, отпустил над карточкой — и без подавления
 *      сработало бы нажатие. Поэтому считается пройденное расстояние, и клик
 *      гасится на фазе перехвата (capture), пока он не дошёл до карточки.
 *   2. **Захват указателя (`setPointerCapture`).** Без него курсор, вышедший
 *      за край ленты, «роняет» перетаскивание на середине жеста.
 *
 * Клавиатура получает то же самое стрелками: лента объявлена областью с
 * подписью и попадает в обход по Tab — иначе часть доски была бы доступна
 * только мышью.
 */
export function DragScroll({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, startX: 0, startLeft: 0, moved: 0 });

  const down = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = box.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    drag.current = { on: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "true";
  };

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!drag.current.on || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > drag.current.moved) drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const end = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!el) return;
    drag.current.on = false;
    delete el.dataset.dragging;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={box}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`pan-x drag-x ${className}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      onClickCapture={(e) => {
        // Порог в 6 пикселей: дрожание руки на обычном клике не должно
        // читаться как перетаскивание.
        if (drag.current.moved > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
        drag.current.moved = 0;
      }}
      onKeyDown={(e) => {
        const el = box.current;
        if (!el) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          el.scrollBy({ left: 240, behavior: "smooth" });
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          el.scrollBy({ left: -240, behavior: "smooth" });
        }
      }}
    >
      {children}
    </div>
  );
}
