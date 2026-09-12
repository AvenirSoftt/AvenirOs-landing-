/**
 * Демо-данные для макетов интерфейса.
 *
 * ВСЕ ключевые числа взяты со стенда AvenirOS (демо-организация «Demo Agency
 * Test») — поэтому воронка это ровно 596.000.000 при 51 лиде и 66,67%
 * конверсии, а план/факт по выручке — 108,7%. Выдумывать «красивые» цифры
 * нельзя: страница показывает реальные экраны, и расхождение сразу видно.
 *
 * Здесь лежат только ЧИСЛА и имена собственные. Всё, что читается словами
 * (стадии воронки, роли, источники лида, названия задач и постов), живёт в
 * словаре `lib/i18n` — иначе русская версия страницы показывала бы узбекский
 * интерфейс. Поэтому в строках ниже стоят ИНДЕКСЫ в словарные массивы.
 *
 * Компании в CRM — тоже из демо-базы и из числа узнаваемых в Узбекистане. Это
 * ПРИМЕРЫ карточек, а не клиенты: на странице они подписаны как демо-данные
 * (подвал и подпись под доской).
 *
 * **Объём намеренно «как в рабочий день», а не по три строки на экран**
 * (12.09.2026, по просьбе владельца: макеты выглядели пустыми). Доска и списки
 * прокручиваются внутри своей рамки, поэтому лишние строки ничего не ломают, а
 * система перестаёт выглядеть демонстрационной заготовкой.
 */

export const finance = {
  revenue: 3_480_000_000,
  expenses: 2_903_453_955,
  profit: 576_546_045,
  receivables: 448_000_000,
  overdueInvoices: 7,
  margin: 16.6,
  funnel: 596_000_000,
  leads: 51,
  conversion: 66.67,
  peakMonth: 498_000_000,
};

/** Помесячная динамика за 12 месяцев: пик — 498 млн, как на стенде. */
export const monthly = [
  { m: 0, revenue: 214, profit: 34 },
  { m: 1, revenue: 236, profit: 41 },
  { m: 2, revenue: 268, profit: 47 },
  { m: 3, revenue: 252, profit: 38 },
  { m: 4, revenue: 301, profit: 55 },
  { m: 5, revenue: 318, profit: 61 },
  { m: 6, revenue: 347, profit: 58 },
  { m: 7, revenue: 372, profit: 66 },
  { m: 8, revenue: 356, profit: 62 },
  { m: 9, revenue: 411, profit: 74 },
  { m: 10, revenue: 447, profit: 79 },
  { m: 11, revenue: 498, profit: 92 },
];

export const planFact = [
  { label: "revenue", fact: "3.480.000.000", target: "3.200.000.000", forecast: "5.021.645.022", value: 108.7, tone: "success" },
  { label: "profit", fact: "576.546.045", target: "950.000.000", forecast: "831.956.775", value: 60.7, tone: "warning" },
  { label: "margin", fact: "16,6%", target: "32%", forecast: "24%", value: 51.9, tone: "danger" },
  { label: "clients", fact: "10", target: "18", forecast: "14", value: 55.6, tone: "danger" },
  { label: "check", fact: "87.000.000", target: "70.000.000", forecast: "125.541.126", value: 124.3, tone: "success" },
] as const;

export const health = {
  score: 45,
  parts: [
    { label: "sales", weight: 30, score: 0 },
    { label: "work", weight: 25, score: 100 },
    { label: "finance", weight: 25, score: 0 },
    { label: "team", weight: 20, score: 100 },
  ],
};

/** Стадии воронки — как в продукте; подписи стадий берутся из словаря. */
export const kanban = [
  {
    stage: "new",
    dot: "bg-primary-bright",
    count: 16,
    total: "240.000.000",
    leads: [
      { company: "Korzinka", note: "Lid new #2", amount: "12.000.000", chance: 20, source: "site", date: "18.08" },
      { company: "Artel", note: "Lid new #3", amount: "16.000.000", chance: 15, source: "site", date: "18.08" },
      { company: "Payme", note: "Lid new #4", amount: "8.000.000", chance: 10, source: "telegram", date: "17.08" },
      { company: "Texnomart", note: "Lid new #5", amount: "14.000.000", chance: 18, source: "site", date: "16.08" },
      { company: "Makro", note: "Lid new #6", amount: "10.000.000", chance: 12, source: "telegram", date: "15.08" },
    ],
  },
  {
    stage: "qualified",
    dot: "bg-accent",
    count: 10,
    total: "160.000.000",
    leads: [
      { company: "Humans", note: "Lid qualified #1", amount: "8.000.000", chance: 35, source: "site", date: "11.07" },
      { company: "TBC Bank UZ", note: "Lid qualified #2", amount: "12.000.000", chance: 40, source: "referral", date: "10.07" },
      { company: "MyTaxi", note: "Lid qualified #3", amount: "16.000.000", chance: 30, source: "site", date: "09.07" },
      { company: "Beeline", note: "Lid qualified #4", amount: "24.000.000", chance: 45, source: "partner", date: "08.07" },
    ],
  },
  {
    stage: "discovery",
    dot: "bg-violet",
    count: 6,
    total: "88.000.000",
    leads: [
      { company: "Uzum Market", note: "Lid discovery #1", amount: "20.000.000", chance: 55, source: "site", date: "01.07" },
      { company: "Uzcard", note: "Lid discovery #2", amount: "12.000.000", chance: 50, source: "partner", date: "30.06" },
      { company: "Ucell", note: "Lid discovery #3", amount: "18.000.000", chance: 48, source: "referral", date: "28.06" },
    ],
  },
  {
    stage: "proposal",
    dot: "bg-warning",
    count: 4,
    total: "72.000.000",
    leads: [
      { company: "Korzinka", note: "Lid proposal #1", amount: "12.000.000", chance: 65, source: "site", date: "25.06" },
      { company: "Click Group", note: "Lid proposal #2", amount: "20.000.000", chance: 70, source: "referral", date: "23.06" },
      { company: "Oson", note: "Lid proposal #3", amount: "15.000.000", chance: 62, source: "site", date: "22.06" },
    ],
  },
  {
    stage: "negotiation",
    dot: "bg-success",
    count: 3,
    total: "36.000.000",
    leads: [
      { company: "Humans", note: "Lid negotiation #1", amount: "8.000.000", chance: 80, source: "site", date: "21.06" },
      { company: "TBC Bank UZ", note: "Lid negotiation #2", amount: "12.000.000", chance: 85, source: "site", date: "20.06" },
      { company: "Artel", note: "Lid negotiation #3", amount: "16.000.000", chance: 75, source: "partner", date: "19.06" },
    ],
  },
] as const;

export const projects = [
  { name: "Alfa Textile", kind: 0, progress: 78, budget: "420.000.000", deadline: "12.10", lead: "AR", tasks: "24/31", tone: "success" },
  { name: "Orient Logistics", kind: 1, progress: 46, budget: "260.000.000", deadline: "28.09", lead: "DY", tasks: "11/24", tone: "warning" },
  { name: "Delta Market", kind: 2, progress: 92, budget: "180.000.000", deadline: "19.09", lead: "BN", tasks: "35/38", tone: "success" },
  { name: "Nova Group", kind: 3, progress: 23, budget: "540.000.000", deadline: "05.11", lead: "GS", tasks: "6/26", tone: "danger" },
  { name: "Silk Road Foods", kind: 2, progress: 64, budget: "310.000.000", deadline: "03.10", lead: "SH", tasks: "18/28", tone: "success" },
  { name: "Bek Motors", kind: 0, progress: 38, budget: "480.000.000", deadline: "21.10", lead: "MK", tasks: "9/23", tone: "warning" },
  { name: "Tashkent City", kind: 1, progress: 12, budget: "620.000.000", deadline: "14.11", lead: "AR", tasks: "4/32", tone: "danger" },
  { name: "Mega Planet", kind: 3, progress: 87, budget: "225.000.000", deadline: "26.09", lead: "DY", tasks: "27/31", tone: "success" },
] as const;

export const team = [
  { role: 0, name: "Aziz Rahimov", load: 92, tasks: 14, projects: 4 },
  { role: 1, name: "Dilnoza Yusupova", load: 84, tasks: 11, projects: 3 },
  { role: 2, name: "Bekzod Nurmatov", load: 78, tasks: 9, projects: 2 },
  { role: 3, name: "Gulnoza Saidova", load: 71, tasks: 17, projects: 5 },
  { role: 2, name: "Shohruh Ganiev", load: 63, tasks: 8, projects: 2 },
  { role: 1, name: "Madina Karimova", load: 55, tasks: 6, projects: 2 },
] as const;

/**
 * Задачи и контент-план — для разделов «Задачи» и «Контент-план» живого
 * дашборда. `title` — позиция в `ui.taskTitles`, `project` — в `projects`,
 * `who` — в `team`, `status` — в `ui.taskStatuses`.
 */
export const tasks = [
  { title: 0, project: 0, status: 0, who: 0, due: "16.09", hours: "6/8" },
  { title: 1, project: 1, status: 0, who: 3, due: "17.09", hours: "2/5" },
  { title: 6, project: 2, status: 0, who: 1, due: "18.09", hours: "1/6" },
  { title: 9, project: 4, status: 0, who: 4, due: "19.09", hours: "3/9" },
  { title: 2, project: 0, status: 1, who: 1, due: "15.09", hours: "9/12" },
  { title: 3, project: 2, status: 1, who: 2, due: "18.09", hours: "3/6" },
  { title: 7, project: 5, status: 1, who: 5, due: "16.09", hours: "4/7" },
  { title: 10, project: 3, status: 1, who: 3, due: "20.09", hours: "2/4" },
  { title: 4, project: 3, status: 2, who: 0, due: "12.09", hours: "7/7" },
  { title: 5, project: 1, status: 2, who: 3, due: "11.09", hours: "4/4" },
  { title: 8, project: 6, status: 2, who: 4, due: "10.09", hours: "11/11" },
  { title: 11, project: 7, status: 2, who: 2, due: "09.09", hours: "5/5" },
] as const;

/** `title` — позиция в `ui.contentTitles`, `channel` — в `ui.channels`. */
export const content = [
  { title: 0, channel: 0, date: "15.09", status: 0 },
  { title: 1, channel: 1, date: "16.09", status: 1 },
  { title: 2, channel: 2, date: "18.09", status: 1 },
  { title: 3, channel: 0, date: "19.09", status: 2 },
  { title: 4, channel: 1, date: "22.09", status: 2 },
  { title: 5, channel: 0, date: "23.09", status: 0 },
  { title: 6, channel: 2, date: "25.09", status: 1 },
  { title: 7, channel: 1, date: "26.09", status: 0 },
  { title: 8, channel: 2, date: "29.09", status: 2 },
] as const;
