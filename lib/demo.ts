/**
 * Демо-данные для макетов интерфейса.
 *
 * ВСЕ числа взяты со стенда AvenirOS (демо-организация «Demo Agency Test») —
 * поэтому воронка это ровно 596.000.000 при 51 лиде и 66,67% конверсии, а
 * план/факт по выручке — 108,7%. Выдумывать «красивые» цифры нельзя: страница
 * показывает реальные экраны, и расхождение сразу видно.
 *
 * Здесь лежат только ЧИСЛА и имена собственные. Всё, что читается словами
 * (стадии воронки, роли, источники лида), живёт в словаре `lib/i18n` — иначе
 * русская версия страницы показывала бы узбекский интерфейс.
 *
 * Компании в CRM — тоже из демо-базы. Это ПРИМЕРЫ карточек, а не клиенты:
 * на странице они везде подписаны как демо-данные.
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
    ],
  },
] as const;

export const projects = [
  { name: "Alfa Textile", kind: 0, progress: 78, budget: "420.000.000", deadline: "12.10", lead: "AR", tasks: "24/31", tone: "success" },
  { name: "Orient Logistics", kind: 1, progress: 46, budget: "260.000.000", deadline: "28.09", lead: "DY", tasks: "11/24", tone: "warning" },
  { name: "Delta Market", kind: 2, progress: 92, budget: "180.000.000", deadline: "19.09", lead: "BN", tasks: "35/38", tone: "success" },
  { name: "Nova Group", kind: 3, progress: 23, budget: "540.000.000", deadline: "05.11", lead: "GS", tasks: "6/26", tone: "danger" },
] as const;

export const team = [
  { role: 0, name: "Aziz Rahimov", load: 92, tasks: 14, projects: 4 },
  { role: 1, name: "Dilnoza Yusupova", load: 84, tasks: 11, projects: 3 },
  { role: 2, name: "Bekzod Nurmatov", load: 78, tasks: 9, projects: 2 },
  { role: 3, name: "Gulnoza Saidova", load: 71, tasks: 17, projects: 5 },
] as const;
