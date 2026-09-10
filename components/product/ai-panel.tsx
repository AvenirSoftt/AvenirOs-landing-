import { Chrome } from "@/components/product/chrome";
import type { Dict } from "@/lib/i18n";

/**
 * AI-ассистент. Показан ровно тем, что он есть: раздел в системе, который
 * отвечает по данным организации. Более глубокое (прогнозы, детект рисков)
 * компания сама объявляет как «в разработке» — на странице это подписано, а не
 * подано как готовая функция.
 */
export function AiMockup({ d }: { d: Dict }) {
  // Чётные реплики — вопросы человека, нечётные — ответы: диалог в словаре
  // лежит плоским списком, чтобы переводчику не приходилось следить за ролями.
  const dialog = d.ai.dialog.map((text, i) => ({ text, mine: i % 2 === 0 }));

  return (
    <Chrome title={d.ui.aiTitle}>
      <div className="space-y-3 p-4">
        {dialog.map((m, i) =>
          m.mine ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-[12.5px] leading-relaxed text-white">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={i} className="flex gap-2.5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet/15 text-[11px] font-semibold text-violet">
                AI
              </span>
              <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-line-soft bg-[#141d29] px-3.5 py-2 text-[12.5px] leading-relaxed text-snow-2">
                {m.text}
              </p>
            </div>
          ),
        )}

        <div className="flex gap-2.5">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet/15 text-[11px] font-semibold text-violet">
            AI
          </span>
          <span className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line-soft bg-[#141d29] px-4 py-3">
            {[0, 1, 2].map((dot) => (
              <i
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-snow-3"
                style={{ animation: `pulse-soft 1.4s ${dot * 0.18}s infinite` }}
              />
            ))}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line-soft bg-[#111a24] px-3.5 py-2.5">
          <span className="text-[12px] text-snow-3">{d.ai.input}</span>
          <span className="ml-auto grid h-7 w-7 place-items-center rounded-lg bg-primary text-white" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Chrome>
  );
}
