import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://www.visualsofaadhi.in/", {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/portfolio-reference.png" });
await browser.close();
