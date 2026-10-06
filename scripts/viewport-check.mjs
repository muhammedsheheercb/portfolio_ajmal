import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
await fs.mkdir("test-results", { recursive: true });
async function revealPage(page) {
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((value) => window.scrollTo(0, value), y);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(750);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "";
  });
}
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (error) => errors.push(error.message));
for (const route of [
  "/",
  "/work",
  "/photography",
  "/films",
  "/about",
  "/contact",
]) {
  await page.goto(origin + route, { waitUntil: "domcontentloaded" });
  await page.locator("h1").waitFor();
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    if (overflow) throw Error(`Horizontal overflow at ${route} ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el) => el.decode());
  }
  await revealPage(page);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: `test-results/${route.replaceAll("/", "") || "home"}-desktop.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el) => el.decode());
  }
  await revealPage(page);
  await page.screenshot({
    path: `test-results/${route.replaceAll("/", "") || "home"}-mobile.png`,
    fullPage: true,
  });
  console.log(`Layout OK: ${route}, all 8 widths`);
}
await page.goto(origin + "/photography", { waitUntil: "domcontentloaded" });
await page
  .getByRole("group", { name: "Filter photographs" })
  .getByRole("button", { name: /Portraits/ })
  .click();
await expect(page.locator(".photo-button")).toHaveCount(6);
await page.locator(".photo-button").first().click();
await page.getByRole("dialog").waitFor();
await page.keyboard.press("Escape");
await expect(page.getByRole("dialog")).toHaveCount(0);
await page.getByRole("button", { name: "All", exact: false }).click();
await page.locator(".photo-button").first().click();
await page.keyboard.press("ArrowRight");
if (!(await page.locator(".viewer-controls").innerText()).includes("02"))
  throw Error("Next image keyboard failed");
await page.keyboard.press("ArrowLeft");
await page.getByRole("button", { name: "Next photograph" }).click();
await page.getByRole("button", { name: "Close photograph" }).click();
await page.getByRole("button", { name: "Open menu" }).click();
await page
  .getByRole("dialog", { name: "Navigation" })
  .getByRole("link", { name: "About" })
  .click();
await page.waitForURL("**/about");
await page.getByRole("button", { name: /Switch to/ }).click();
const theme = await page.evaluate(() => document.documentElement.dataset.theme);
await page.reload({ waitUntil: "domcontentloaded" });
if (
  (await page.evaluate(() => document.documentElement.dataset.theme)) !== theme
)
  throw Error("Theme persistence failed");
await page.getByRole("button", { name: "Choose accent color" }).click();
await page.getByRole("button", { name: "Muted green" }).click();
await page.reload({ waitUntil: "domcontentloaded" });
if (
  (await page.evaluate(() => document.documentElement.dataset.accent)) !==
  "green"
)
  throw Error("Accent persistence failed");
await page.goto(origin + "/contact", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "SEND ENQUIRY" }).click();
if ((await page.locator("[aria-invalid=true]").count()) < 3)
  throw Error("Form validation failed");
await page.getByLabel("Your name").fill("Test Visitor");
await page.getByLabel("Email address").fill("visitor@example.com");
await page.getByLabel("Service", { exact: true }).selectOption("Photography");
await page
  .getByLabel("Your project")
  .fill("A photography enquiry to validate the production form.");
await page.getByRole("button", { name: "SEND ENQUIRY" }).click();
await page
  .getByRole("alert")
  .filter({ hasText: "Online enquiries are not available yet" })
  .waitFor();
await page.route("**/api/enquiry", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  }),
);
await page.getByRole("button", { name: "SEND ENQUIRY" }).click();
await page
  .getByRole("status")
  .filter({ hasText: "Your enquiry has been sent" })
  .waitFor();
await page.unroute("**/api/enquiry");
await page.goto(origin + "/films", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Play showreel" }).click();
await page.locator(".video-stage video").waitFor();
await page.waitForFunction(
  () => document.querySelector(".video-stage video")?.readyState >= 2,
);
await page.getByRole("button", { name: "Close video" }).click();
const reduced = await browser.newPage({ reducedMotion: "reduce" });
await reduced.goto(origin, { waitUntil: "domcontentloaded" });
if (await reduced.locator(".hero-video").count())
  throw Error("Reduced motion hero video should not load");
await reduced.close();
if (errors.length) throw Error(`Console errors: ${errors.join("\n")}`);
console.log(
  "Interactions OK: gallery, lightbox, keyboard, menu, themes, accents, form, video, reduced motion",
);
await browser.close();
