import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await page.goto("http://127.0.0.1:3100", { waitUntil: "domcontentloaded" });
  for (const [label, path] of [
    ["About", "/about"],
    ["Photography", "/photography"],
    ["Videography", "/films"],
    ["Work", "/work"],
    ["Contact", "/contact"],
    ["Home", "/"],
  ]) {
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
    );
    await page
      .locator(".desktop-nav")
      .getByRole("link", { name: label, exact: true })
      .click();
    await page.waitForURL("**" + path);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  }
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.getByRole("link", { name: "SCROLL TO EXPLORE" }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog", { name: "Navigation" })
    .getByRole("link", { name: "About" })
    .click();
  await page.waitForURL("**/about");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog", { name: "Navigation" })
    .getByRole("link", { name: "Videography" })
    .click();
  await page.waitForURL("**/films");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goBack();
  await page.waitForURL("**/about");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  console.log(
    "Desktop, mobile, current-page navigation and browser Back reset to top; section anchors still scroll correctly.",
  );
} finally {
  await browser.close();
}
