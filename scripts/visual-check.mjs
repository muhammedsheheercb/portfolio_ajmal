import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1200);
await page.screenshot({ path: "test-results/hero-desktop.png" });
await page.evaluate(() => {
  document.documentElement.dataset.theme = "dark";
  localStorage.setItem("theme", "dark");
});
for (const img of await page.locator("img").all()) {
  await img.scrollIntoViewIfNeeded();
  await img.evaluate((el) => el.decode());
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
await page.screenshot({ path: "test-results/home-dark.png", fullPage: true });
await page.goto("http://127.0.0.1:3000/photography");
await page.waitForTimeout(500);
await page.screenshot({ path: "test-results/gallery-dark.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000");
await page.waitForTimeout(1200);
await page.screenshot({ path: "test-results/hero-mobile.png" });
await browser.close();
