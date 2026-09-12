"use client";

import { useEffect, useState } from "react";

import { Chrome, Rail } from "@/components/product/chrome";
import { DashboardPanel, type PanelData } from "@/components/product/dashboard";
import { KanbanBody } from "@/components/product/kanban";
import { ProjectsBody, TeamBody } from "@/components/product/boards";
import { AnalyticsBody, FinanceBody } from "@/components/product/analytics";
import { AiBody } from "@/components/product/ai-panel";
import { TasksBody } from "@/components/product/tasks-board";
import { ContentBody } from "@/components/product/content-plan";
import { finance, health } from "@/lib/demo";
import type { Dict } from "@/lib/i18n";

/**
 * Живая система на первом экране.
 *
 * Раньше здесь стоял один статичный дашборд: меню слева было нарисовано, а
 * вкладки «Месяц / Квартал / Год» ничего не переключали. Человек видел
 * скриншот и не мог проверить ни одного обещания страницы.
 *
 * Теперь это настоящая оболочка продукта:
 *   • **меню работает** — все девять разделов открываются (у каждого свой
 *     экран, а не заглушка);
 *   • **вкладки периода работают** — цифры и даты пересчитываются;
 *   • **числа живут** — раз в несколько секунд они смещаются, как смещается
 *     выручка в рабочий день.
 *
 * Три решения, которые здесь важнее кода:
 *
 * 1. **Дрожание чисел — только на дашборде и только когда вкладка видима.**
 *    Считать фон, который никто не смотрит, — это разряженная батарея
 *    телефона, и ничего больше.
 * 2. **Случайности нет в первом рендере.** Сервер и клиент обязаны выдать
 *    одинаковую разметку, иначе React ругается на гидрацию; поэтому смещение
 *    начинается с нуля и появляется только в эффекте.
 * 3. **На узком экране меню продукта скрыто** (так в самом AvenirOS), поэтому
 *    под рамкой появляется своя лента разделов — иначе половина возможностей
 *    была бы доступна только на большом экране.
 */

/** Множители периода. Не 3 и 12: у квартала и года есть сезонность, и ровные
 *  числа читались бы как «просто умножили». */
const K = [1, 2.94, 11.62];
const PERIODS = ["2026-09-01 — 2026-09-30", "2026-07-01 — 2026-09-30", "2026-01-01 — 2026-12-31"];

export function LiveDashboard({ d }: { d: Dict }) {
  const ui = d.ui;
  const [section, setSection] = useState(0);
  const [period, setPeriod] = useState(0);
  /** Смещение живых чисел, в долях: 0 — ровно значения стенда. */
  const [drift, setDrift] = useState({ revenue: 0, expenses: 0, funnel: 0, receivables: 0 });

  useEffect(() => {
    if (section !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      if (document.visibilityState !== "visible") return;
      // Случайное блуждание с потолком: показатель дня гуляет на проценты, а
      // не на порядки. Без ограничения за минуту просмотра выручка уехала бы
      // вдвое, и цифры перестали бы выглядеть настоящими.
      setDrift((p) => ({
        revenue: clamp(p.revenue + rnd(0.0022)),
        expenses: clamp(p.expenses + rnd(0.0016)),
        funnel: clamp(p.funnel + rnd(0.004)),
        receivables: clamp(p.receivables + rnd(0.003)),
      }));
    };

    const timer = setInterval(tick, 3200);
    return () => clearInterval(timer);
  }, [section]);

  const k = K[period];
  const revenue = Math.round(finance.revenue * k * (1 + drift.revenue));
  const expenses = Math.round(finance.expenses * k * (1 + drift.expenses));
  const data: PanelData = {
    revenue,
    expenses,
    profit: revenue - expenses,
    funnel: Math.round(finance.funnel * (1 + drift.funnel)),
    receivables: Math.round(finance.receivables * (1 + drift.receivables)),
    // Здоровье считается по периоду, а не дрожит: это интегральная оценка, и
    // прыгающий раз в три секунды балл выглядел бы как поломка, а не как жизнь.
    score: [health.score, health.score + 6, health.score + 11][period],
    period: PERIODS[period],
  };

  // Тип объявлен явно: без него TypeScript выводит объединение объектов, у
  // половины которых поля `tabs` нет вовсе, и обращение к нему не проходит
  // проверку.
  const screens: { title: string; tabs?: readonly string[] }[] = [
    { title: ui.dashboardTitle, tabs: [ui.tabs.month, ui.tabs.quarter, ui.tabs.year] },
    { title: ui.tasksTitle },
    { title: ui.projectsTitle, tabs: ui.projectsTabs },
    { title: ui.crmTitle, tabs: ui.crmTabs },
    { title: ui.contentTitle },
    { title: ui.financeTitle, tabs: ui.financeTabs },
    { title: ui.reportsTitle, tabs: ui.reportsTabs },
    { title: ui.teamTitle },
    { title: ui.aiTitle },
  ];
  const current = screens[section];

  const body = () => {
    switch (section) {
      case 1:
        return <TasksBody d={d} />;
      case 2:
        return <ProjectsBody d={d} />;
      case 3:
        return <KanbanBody d={d} />;
      case 4:
        return <ContentBody d={d} />;
      case 5:
        return <FinanceBody d={d} />;
      case 6:
        return <AnalyticsBody d={d} />;
      case 7:
        return <TeamBody d={d} />;
      case 8:
        return <AiBody d={d} />;
      default:
        return <DashboardPanel d={d} data={data} live />;
    }
  };

  return (
    <div>
      <Chrome
        title={current.title}
        tabs={current.tabs}
        activeTab={section === 0 ? period : 0}
        onTab={section === 0 ? setPeriod : undefined}
      >
        <div className="flex">
          <Rail ui={ui} active={section} onSelect={setSection} />
          {/* Ключ по разделу: при переключении экран пересобирается и въезжает
              заново — иначе подмена содержимого читается как «мигнуло». */}
          <div key={section} className="rise min-w-0 flex-1">
            {body()}
          </div>
        </div>
      </Chrome>

      {/* Лента разделов для узкого экрана: меню продукта там скрыто. */}
      <div className="pan-x mt-3 flex gap-1.5 lg:hidden" aria-label={ui.liveHint}>
        {ui.rail.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setSection(i)}
            aria-current={i === section ? "page" : undefined}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors duration-200 ${
              i === section
                ? "bg-primary/15 text-primary-bright"
                : "border border-white/10 text-snow-3"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-[11.5px] text-snow-3">{ui.liveHint}</p>
    </div>
  );
}

/** Шаг блуждания: знак и величина, не больше `amp`. */
function rnd(amp: number) {
  return (Math.random() - 0.5) * 2 * amp;
}

/** Потолок смещения — 1,2%: дальше цифры перестают быть «тем же днём». */
function clamp(v: number) {
  return Math.max(-0.012, Math.min(0.012, v));
}
