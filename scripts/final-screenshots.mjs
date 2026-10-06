import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const [theme, width] of [
  ["dark", 1440],
  ["light", 390],
]) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
  for (const route of [
    "/",
    "/work",
    "/photography",
    "/films",
    "/about",
    "/contact",
  ]) {
    await page.goto("http://127.0.0.1:3000" + route, {
      waitUntil: "domcontentloaded",
    });
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value;
      document.documentElement.style.scrollBehavior = "auto";
    }, theme);
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((value) => window.scrollTo(0, value), y);
      await page.waitForTimeout(100);
    }
    for (const img of await page.locator("img").all())
      await img.evaluate((el) => el.decode());
    await page.waitForTimeout(750);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/final-${route.replaceAll("/", "") || "home"}-${theme}.png`,
      fullPage: true,
    });
  }
}
await browser.close();
console.log(
  "Final screenshots captured with all scroll reveals and images loaded.",
);
