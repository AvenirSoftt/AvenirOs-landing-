/**
 * Проверка того, что на странице НАЖИМАЕТСЯ.
 *
 * Снимки этого не ловят: переключатель разделов, аккордеон вопросов, мобильное
 * меню и форма живут в состоянии, а не в разметке. Здесь же проверяется
 * клавиатура — по разделам можно ходить стрелками, как в любом переключателе.
 *
 * Запуск: node scripts/interactions.mjs   (нужен поднятый стенд на :3003)
 */
import { chromium } from "playwright-core";

const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.URL || "http://localhost:3003";

let failed = 0;
const ok = (cond, msg, extra = "") => {
  console.log(`${cond ? "  OK  " : "  FAIL"} ${msg}${extra ? ` — ${extra}` : ""}`);
  if (!cond) failed++;
};

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });

// ── Десктоп ────────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 180_000 });

  // Переключатель разделов
  await page.locator("#modullar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const before = await page.locator("#modullar h3").first().innerText();
  await page.locator("#mod-crm").click();
  await page.waitForTimeout(400);
  const after = await page.locator("#modullar h3").first().innerText();
  ok(before !== after && after === "CRM", "выбор раздела меняет экран", `${before} → ${after}`);
  ok(
    (await page.locator("#modullar").getByText("Sotuv voronkasi").count()) > 0,
    "у раздела CRM показан его экран",
  );

  // Клавиатура: стрелка вниз ведёт к следующему разделу
  await page.locator("#mod-crm").press("ArrowDown");
  await page.waitForTimeout(300);
  const afterKey = await page.locator("#modullar h3").first().innerText();
  ok(afterKey !== "CRM", "стрелка вниз переключает раздел", afterKey);

  // Аккордеон
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const q2 = page.locator("#faq dt button").nth(2);
  ok((await page.locator("#faq-2").isVisible()) === false, "закрытый ответ скрыт");
  await q2.click();
  await page.waitForTimeout(300);
  ok(await page.locator("#faq-2").isVisible(), "ответ открывается по клику");
  ok((await q2.getAttribute("aria-expanded")) === "true", "aria-expanded переключается");

  // Форма: обязательные поля не дают отправить, а «успех» не выдумывается
  await page.locator("#demo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('#demo button[type="submit"]').click();
  await page.waitForTimeout(300);
  ok(
    (await page.locator("#demo [role=status]").count()) === 0,
    "пустая форма не отправляется",
  );
  await page.fill("#ism", "Test Foydalanuvchi");
  await page.fill("#tel", "+998 90 000 00 00");
  await page.locator('#demo button[type="submit"]').click();
  await page.waitForTimeout(400);
  const notice = await page.locator("#demo [role=status]").innerText();
  ok(/ulanmagan/i.test(notice), "форма честно говорит, что отправка не подключена");
  ok(
    !/rahmat|yuborildi|muvaffaqiyat/i.test(notice),
    "успешная отправка НЕ имитируется",
    notice.slice(0, 60),
  );

  // Выбор языка: меню открывается, готов только узбекский, недоступные
  // помечены и не притворяются работающими.
  const langBtn = page.locator('header button[aria-haspopup="menu"]');
  await langBtn.click();
  await page.waitForTimeout(350);
  const menu = page.locator('header [role="menu"]');
  ok(await menu.isVisible(), "меню языка открывается");
  ok(
    (await menu.locator('[role="menuitemradio"][aria-checked="true"]').innerText()).includes("UZ"),
    "выбранный язык отмечен",
  );
  ok(
    (await menu.locator('[aria-disabled="true"]').count()) === 2,
    "русский и английский честно помечены недоступными",
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  ok(!(await menu.isVisible()), "Escape закрывает меню языка");

  // Якоря шапки. Ждём НУЖНОГО положения, а не «пока перестанет ехать»: плавная
  // прокрутка через всю страницу начинается не сразу и идёт больше секунды —
  // проверка «страница стоит» срабатывала мгновенно, ещё до старта.
  await page.locator('header nav a[href="#analitika"]').click();
  const landed = await page
    .waitForFunction(
      () => {
        const el = document.querySelector('#analitika');
        if (!el) return false;
        const top = el.getBoundingClientRect().top;
        return top >= 0 && top < 140;
      },
      null,
      { timeout: 15_000 },
    )
    .then(() => true)
    .catch(() => false);
  const y = await page.evaluate(() =>
    Math.round(document.querySelector('#analitika').getBoundingClientRect().top),
  );
  ok(landed, "переход по якорю не прячет заголовок под шапку", `top=${y}`);

  await ctx.close();
}

// ── Телефон ────────────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 180_000 });

  const menu = page.locator("#mobil-menyu");
  ok(!(await menu.isVisible()), "мобильное меню закрыто по умолчанию");
  await page.locator('header button[aria-controls="mobil-menyu"]').click();
  await page.waitForTimeout(300);
  ok(await menu.isVisible(), "бургер открывает меню");
  await menu.getByRole("link", { name: "Modullar" }).click();
  await page.waitForTimeout(700);
  ok(!(await menu.isVisible()), "переход по ссылке закрывает меню");
  ok(
    (await page.evaluate(() => getComputedStyle(document.body).overflow)) !== "hidden",
    "прокрутка страницы возвращается после закрытия меню",
  );

  await ctx.close();
}

await browser.close();
console.log(failed ? `\nПРОВАЛЕНО: ${failed}` : "\nвсё зелёное");
process.exit(failed ? 1 : 0);
