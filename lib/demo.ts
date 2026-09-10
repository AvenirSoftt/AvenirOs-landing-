/**
 * Демо-данные для макетов интерфейса.
 *
 * ВСЕ числа взяты со стенда AvenirOS (демо-организация «Demo Agency Test») —
 * поэтому воронка это ровно 596.000.000 so'm при 51 лиде и 66,67% конверсии, а
 * план/факт по выручке — 108,7%. Выдумывать «красивые» цифры нельзя: страница
 * показывает реальные экраны, и расхождение сразу видно.
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
  { m: "Yan", revenue: 214, profit: 34 },
  { m: "Fev", revenue: 236, profit: 41 },
  { m: "Mar", revenue: 268, profit: 47 },
  { m: "Apr", revenue: 252, profit: 38 },
  { m: "May", revenue: 301, profit: 55 },
  { m: "Iyn", revenue: 318, profit: 61 },
  { m: "Iyl", revenue: 347, profit: 58 },
  { m: "Avg", revenue: 372, profit: 66 },
  { m: "Sen", revenue: 356, profit: 62 },
  { m: "Okt", revenue: 411, profit: 74 },
  { m: "Noy", revenue: 447, profit: 79 },
  { m: "Dek", revenue: 498, profit: 92 },
];

export const planFact = [
  { label: "Tushum", fact: "3.480.000.000", target: "3.200.000.000", forecast: "5.021.645.022", value: 108.7, tone: "success" },
  { label: "Foyda", fact: "576.546.045", target: "950.000.000", forecast: "831.956.775", value: 60.7, tone: "warning" },
  { label: "Marja", fact: "16,6%", target: "32%", forecast: "24%", value: 51.9, tone: "danger" },
  { label: "Yangi mijozlar", fact: "10", target: "18", forecast: "14", value: 55.6, tone: "danger" },
  { label: "O'rtacha chek", fact: "87.000.000", target: "70.000.000", forecast: "125.541.126", value: 124.3, tone: "success" },
] as const;

export const health = {
  score: 45,
  parts: [
    { label: "Sotuv", weight: 30, score: 0 },
    { label: "Ish", weight: 25, score: 100 },
    { label: "Moliya", weight: 25, score: 0 },
    { label: "Jamoa", weight: 20, score: 100 },
  ],
};

/** Стадии воронки — как в продукте: НОВЫЙ → КВАЛИФИЦИРОВАН → … → ВЫИГРАН. */
export const kanban = [
  {
    stage: "Yangi",
    dot: "bg-primary-bright",
    count: 16,
    total: "240.000.000",
    leads: [
      { company: "Korzinka", note: "Lid new #2", amount: "12.000.000", chance: 20, source: "Sayt", date: "18.08" },
      { company: "Artel", note: "Lid new #3", amount: "16.000.000", chance: 15, source: "Sayt", date: "18.08" },
      { company: "Payme", note: "Lid new #4", amount: "8.000.000", chance: 10, source: "Telegram", date: "17.08" },
    ],
  },
  {
    stage: "Kvalifikatsiya",
    dot: "bg-accent",
    count: 10,
    total: "160.000.000",
    leads: [
      { company: "Humans", note: "Lid qualified #1", amount: "8.000.000", chance: 35, source: "Sayt", date: "11.07" },
      { company: "TBC Bank UZ", note: "Lid qualified #2", amount: "12.000.000", chance: 40, source: "Referal", date: "10.07" },
      { company: "MyTaxi", note: "Lid qualified #3", amount: "16.000.000", chance: 30, source: "Sayt", date: "09.07" },
    ],
  },
  {
    stage: "Diagnostika",
    dot: "bg-violet",
    count: 6,
    total: "88.000.000",
    leads: [
      { company: "Uzum Market", note: "Lid discovery #1", amount: "20.000.000", chance: 55, source: "Sayt", date: "01.07" },
      { company: "Uzcard", note: "Lid discovery #2", amount: "12.000.000", chance: 50, source: "Hamkor", date: "30.06" },
    ],
  },
  {
    stage: "Taklif",
    dot: "bg-warning",
    count: 4,
    total: "72.000.000",
    leads: [
      { company: "Korzinka", note: "Lid proposal #1", amount: "12.000.000", chance: 65, source: "Sayt", date: "25.06" },
      { company: "Click Group", note: "Lid proposal #2", amount: "20.000.000", chance: 70, source: "Referal", date: "23.06" },
    ],
  },
  {
    stage: "Muzokara",
    dot: "bg-success",
    count: 3,
    total: "36.000.000",
    leads: [
      { company: "Humans", note: "Lid negotiation #1", amount: "8.000.000", chance: 80, source: "Sayt", date: "21.06" },
      { company: "TBC Bank UZ", note: "Lid negotiation #2", amount: "12.000.000", chance: 85, source: "Sayt", date: "20.06" },
    ],
  },
] as const;

export const projects = [
  { name: "Alfa Textile", client: "Ishlab chiqarish", progress: 78, budget: "420.000.000", deadline: "12.10", lead: "AR", tasks: "24/31", tone: "success" },
  { name: "Orient Logistics", client: "Logistika", progress: 46, budget: "260.000.000", deadline: "28.09", lead: "DY", tasks: "11/24", tone: "warning" },
  { name: "Delta Market", client: "Riteyl", progress: 92, budget: "180.000.000", deadline: "19.09", lead: "BN", tasks: "35/38", tone: "success" },
  { name: "Nova Group", client: "Moliya", progress: 23, budget: "540.000.000", deadline: "05.11", lead: "GS", tasks: "6/26", tone: "danger" },
] as const;

export const team = [
  { role: "Loyiha menejeri", name: "Aziz Rahimov", load: 92, tasks: 14, projects: 4 },
  { role: "Dizayner", name: "Dilnoza Yusupova", load: 84, tasks: 11, projects: 3 },
  { role: "Dasturchi", name: "Bekzod Nurmatov", load: 78, tasks: 9, projects: 2 },
  { role: "Sotuv menejeri", name: "Gulnoza Saidova", load: 71, tasks: 17, projects: 5 },
] as const;

/** 16 разделов системы — ровно те, что есть в боковом меню продукта. */
export const modules = [
  { key: "crm", name: "CRM", group: "Ish", desc: "Lidlar, bitimlar, mijozlar va voronka — bitta kanban maydonida." },
  { key: "finance", name: "Moliya", group: "Analitika", desc: "Hisob-fakturalar, to'lovlar, xarajatlar, P&L va kesh-flou." },
  { key: "projects", name: "Loyihalar", group: "Ish", desc: "Byudjet, muddat, jamoa va foydalilik — har bir loyiha bo'yicha." },
  { key: "tasks", name: "Vazifalar", group: "Ish", desc: "Kanban, ijrochi va nazoratchi, muddat, chek-list va taymer." },
  { key: "analytics", name: "Hisobotlar", group: "Analitika", desc: "Reja/fakt, dinamika, konversiya va jamoa yuklamasi." },
  { key: "ai", name: "AI assistent", group: "Analitika", desc: "Tizim ma'lumotlari asosida savol-javob. Kengaytirilishi ustida ish ketmoqda." },
  { key: "content", name: "Kontent reja", group: "Ish", desc: "Postlar jadvali, statuslar va mijoz tasdig'i." },
  { key: "time", name: "Mehnat sarfi", group: "Ish", desc: "Taymer va soatlar — vazifa, loyiha va xodim kesimida." },
  { key: "knowledge", name: "Bilimlar bazasi", group: "Ish", desc: "Reglament, shablon, chek-list va onbording — yozilgan xotira." },
  { key: "brainstorm", name: "Breynstorming", group: "Ish", desc: "Cheksiz doska: g'oyalar, mind-map va jamoaviy sessiya." },
  { key: "notes", name: "Zametkalar", group: "Ish", desc: "Shaxsiy va jamoaviy yozuvlar, @-eslatmalar bilan." },
  { key: "calendar", name: "Kalendar", group: "Ish", desc: "Muddatlar, uchrashuvlar va eslatmalar bitta lentada." },
  { key: "team", name: "Jamoa", group: "Analitika", desc: "Xodimlar, rollar, yuklama va samaradorlik ko'rsatkichi." },
  { key: "settings", name: "Sozlamalar", group: "Servis", desc: "Rollar, huquqlar, bo'limlar va bildirishnoma qoidalari." },
] as const;

export const faq = [
  {
    q: "AvenirOS kimlar uchun?",
    a: "Tizim marketing agentligi uchun ishlab chiqilgan va o'sha yerda har kuni ishlatiladi: loyiha, mijoz, muddat va byudjet bilan ishlaydigan xizmat ko'rsatuvchi kompaniyalar uchun mos keladi. Boshqa sohaga moslashtirish — alohida ish, uni auditdan boshlaymiz.",
  },
  {
    q: "ERP va CRM birga ishlaydimi?",
    a: "Ha, bu bitta tizimning bo'limlari, integratsiya emas. CRM'dagi bitim loyihaga, loyiha — vazifalar, mehnat sarfi va hisob-fakturaga bog'lanadi. Shuning uchun foyda hisobot kutmasdan, panelda ko'rinadi.",
  },
  {
    q: "AvenirOS'ni biznesimizga moslashtirish mumkinmi?",
    a: "Ha. Bo'limlar, rollar va huquqlar sozlanadi, voronka bosqichlari va vazifa statuslari o'zgartiriladi. Chuqurroq moslashtirish — alohida ish sifatida baholanadi.",
  },
  {
    q: "Mavjud tizimlar bilan integratsiya qilinadimi?",
    a: "Tizimda Telegram bildirishnomalari va API mavjud. Aniq integratsiya (buxgalteriya, to'lov, reklama kabineti) auditda ko'rib chiqiladi — imkoniyatni oldindan va'da qilmaymiz, avval tekshiramiz.",
  },
  {
    q: "Qancha vaqtda ishga tushiriladi?",
    a: "Muddat audit natijasiga bog'liq: bo'limlar soni, ma'lumot ko'chirish hajmi va jamoa kattaligi. Aniq reja va muddatni demo va auditdan keyin beramiz.",
  },
  {
    q: "Ma'lumotlar xavfsizligi qanday?",
    a: "Kirish rollar va huquqlar bilan chegaralanadi: xodim faqat o'ziga tegishli bo'limlar va vazifalarni ko'radi, moliya alohida huquq bilan yopiladi. Joylashtirish varianti (bulut yoki o'z serveringiz) alohida kelishiladi.",
  },
  {
    q: "Demo olish mumkinmi?",
    a: "Ha. Demo — jonli tizim ekranlari va sizning jarayoningiz bo'yicha suhbat. So'rov qoldiring, bog'lanamiz.",
  },
  {
    q: "Narx qanday belgilanadi?",
    a: "Narx ish hajmidan kelib chiqadi: qaysi bo'limlar kerak, qancha foydalanuvchi, moslashtirish qanchalik chuqur. Shuning uchun saytda «paket» narxlari yo'q — hisob-kitob auditdan keyin beriladi.",
  },
] as const;
