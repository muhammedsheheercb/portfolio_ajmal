import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
let failed = false;
for (const theme of ["dark", "light"])
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
      document.documentElement.dataset.accent = "gold";
    }, theme);
    await page.waitForTimeout(700);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const violations = result.violations.filter((v) => v.impact !== "minor");
    if (violations.length) {
      failed = true;
      console.log(
        JSON.stringify(
          {
            route,
            theme,
            violations: violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => ({
                html: n.html,
                summary: n.failureSummary,
              })),
            })),
          },
          null,
          2,
        ),
      );
    } else console.log(`Accessibility OK: ${route} ${theme}`);
  }
await browser.close();
if (failed) process.exitCode = 1;
