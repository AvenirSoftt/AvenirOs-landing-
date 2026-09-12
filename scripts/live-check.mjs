/**
 * Проверка того, что на первом экране действительно РАБОТАЕТ, а не нарисовано.
 *
 * Снимки (`qa.mjs`) этого не ловят в принципе: живой дашборд, перетаскивание
 * доски и смена периода на статичном кадре выглядят ровно так же, как их
 * отсутствие. Поэтому здесь проверяются ДЕЙСТВИЯ и их последствия.
 *
 * Запуск (стенд поднят: npm run start или npm run dev):
 *   node scripts/live-check.mjs
 */
import { chromium } from "playwright-core";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.URL || "http://localhost:3003/uz";

const results = [];
const ok = (pass, name, extra = "") => {
  results.push({ pass, name, extra });
  console.log(`${pass ? "  OK  " : "ПАДЕНИЕ"} ${name}${extra ? " — " + extra : ""}`);
};

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, locale: "uz-UZ" });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 160)));

await page.goto(URL, { waitUntil: "networkidle", timeout: 120_000 });
await page.waitForTimeout(1200);

// ── 1. Плашек больше нет ───────────────────────────────────────────────────
const body = await page.textContent("body");
ok(!/Demo ma'lumot|Демо-данные|Demo data/.test(body), "плашка «демо-данные» убрана");
const eyebrow = await page.locator("[data-hero-eyebrow]").count();
ok(eyebrow === 0, "плашка над заголовком убрана");

// ── 2. Белого фона не осталось ─────────────────────────────────────────────
const light = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll("section, main, body, div")) {
    const bg = getComputedStyle(el).backgroundColor;
    const m = bg.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (!m) continue;
    const [r, g, b] = [+m[1], +m[2], +m[3]];
    const a = m[4] === undefined ? 1 : +m[4];
    // Светлым считаем плотный и яркий фон: стеклянные подсветки с малой
    // альфой сюда не попадают — они и не читаются как белый.
    if (a > 0.5 && (r + g + b) / 3 > 170) bad.push(el.tagName + "." + String(el.className).slice(0, 40));
  }
  return bad.slice(0, 5);
});
ok(light.length === 0, "светлых заливок не осталось", light.join(", "));

// ── 3. Меню продукта переключает разделы ───────────────────────────────────
// Заголовок окна — единственный `truncate` в шапке рамки. Брать его «пятым
// span'ом» нельзя: в шапке есть ещё кружки и вкладки, и порядок меняется от
// раздела к разделу — первая версия проверки ловила букву «A» из логотипа.
const title = () => page.locator(".panel .truncate").first().textContent();
const before = await title();
await page.getByRole("button", { name: "CRM", exact: true }).first().click();
await page.waitForTimeout(700);
const after = await title();
ok(before !== after && /CRM/.test(after), "меню открывает раздел CRM", `${before} → ${after}`);

const stages = await page.getByText("Kvalifikatsiya", { exact: false }).count();
ok(stages > 0, "внутри раздела CRM настоящая доска");

// ── 4. Доску можно тянуть мышью ────────────────────────────────────────────
const board = page.locator('[role="region"]').first();
const boxRect = await board.boundingBox();
const left0 = await board.evaluate((el) => el.scrollLeft);
await page.mouse.move(boxRect.x + boxRect.width - 80, boxRect.y + 120);
await page.mouse.down();
for (let i = 1; i <= 8; i++) {
  await page.mouse.move(boxRect.x + boxRect.width - 80 - i * 40, boxRect.y + 120);
  await page.waitForTimeout(30);
}
await page.mouse.up();
await page.waitForTimeout(300);
const left1 = await board.evaluate((el) => el.scrollLeft);
ok(left1 > left0 + 100, "доска тянется мышью", `${left0} → ${left1}`);

// ── 5. Возврат на обзор, вкладки периода считают ───────────────────────────
await page.getByRole("button", { name: "Obzor", exact: true }).first().click();
await page.waitForTimeout(600);
const periodBefore = await page.locator("p.tabular").first().textContent();
await page.getByRole("button", { name: "Yil", exact: true }).first().click();
await page.waitForTimeout(900);
const periodAfter = await page.locator("p.tabular").first().textContent();
ok(periodBefore !== periodAfter, "вкладка периода меняет данные", `${periodBefore} → ${periodAfter}`);

// ── 6. Числа живут сами ────────────────────────────────────────────────────
await page.getByRole("button", { name: "Oy", exact: true }).first().click();
await page.waitForTimeout(800);
const read = () => page.locator(".panel").first().textContent();
const snap1 = await read();
await page.waitForTimeout(8000);
const snap2 = await read();
ok(snap1 !== snap2, "числа на дашборде меняются сами");

ok(errors.length === 0, "ошибок страницы нет", errors.slice(0, 3).join(" | "));

await browser.close();
const failed = results.filter((r) => !r.pass).length;
console.log(failed ? `\nПРОВАЛЕНО: ${failed} из ${results.length}` : `\nвсё чисто: ${results.length} проверок`);
process.exit(failed ? 1 : 0);
