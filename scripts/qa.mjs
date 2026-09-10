/**
 * Визуальная проверка страницы в настоящем браузере.
 *
 * Зачем скриптом, а не «посмотрю глазами»: проверок шесть ширин, и каждая
 * ловит своё. Две вещи здесь важнее скриншотов и потому падают явно:
 *
 *   1. **Горизонтальное переполнение.** Ищется НЕ по `body.scrollWidth`, а по
 *      элементам, вылезшим за правый край, и с исключением тех, кто лежит
 *      внутри собственного горизонтального скроллера: макеты интерфейса
 *      прокручиваются внутри рамки — это задумано, а не поломка.
 *   2. **Ошибки страницы** (`pageerror`, console.error) — гидрация React
 *      ломается молча, и на скриншоте это выглядит нормально.
 *
 * Запуск (стенд должен быть поднят: npm run dev):
 *   node scripts/qa.mjs
 *   node scripts/qa.mjs --full          # снимки страницы целиком
 *   node scripts/qa.mjs --sizes 390x844
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.URL || "http://localhost:3003";
const OUT = process.env.OUT || ".qa";
const args = process.argv.slice(2);
const full = args.includes("--full");
const sizesArg = args.includes("--sizes") ? args[args.indexOf("--sizes") + 1] : null;
const SIZES = (sizesArg || "1440x950,1280x900,1024x800,768x1000,390x844,360x780")
  .split(",")
  .map((s) => s.split("x").map(Number));

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
const problems = [];

for (const [w, h] of SIZES) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
    isMobile: w < 768,
    hasTouch: w < 768,
    locale: "uz-UZ",
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => problems.push(`[${w}] pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${w}] console: ${m.text().slice(0, 200)}`);
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 180_000 });
  await page.waitForTimeout(1500);

  // Прокрутка до низа: без неё блоки с появлением остаются невидимыми и на
  // снимке страница выглядит пустой там, где всё в порядке.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        let y = 0;
        const timer = setInterval(() => {
          y += 700;
          window.scrollTo(0, y);
          if (y > document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 55);
      }),
  );
  await page.waitForTimeout(800);
  if (!full) await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    if (de.scrollWidth <= de.clientWidth + 1) return null;
    const bad = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right <= de.clientWidth + 1 && r.left >= -1) continue;
      if (getComputedStyle(el).position === "fixed") continue;
      let p = el.parentElement;
      let inScroller = false;
      while (p) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") {
          inScroller = true;
          break;
        }
        p = p.parentElement;
      }
      if (!inScroller) {
        const cls = String(el.className || "").slice(0, 70);
        bad.push(`${el.tagName}.${cls} → right=${Math.round(r.right)}`);
      }
    }
    return { page: de.scrollWidth, view: de.clientWidth, bad: bad.slice(0, 6) };
  });

  if (overflow) {
    problems.push(
      `[${w}] ПЕРЕПОЛНЕНИЕ ПО ГОРИЗОНТАЛИ: ${overflow.page}px при ${overflow.view}px\n      ${overflow.bad.join("\n      ")}`,
    );
  }

  await page.screenshot({ path: `${OUT}/${w}.png`, fullPage: full });
  console.log(`  снято ${w}×${h}`);
  await ctx.close();
}

await browser.close();
console.log(problems.length ? `\n${problems.join("\n")}` : "\nчисто: ошибок страницы и переполнений нет");
process.exit(problems.length ? 1 : 0);
