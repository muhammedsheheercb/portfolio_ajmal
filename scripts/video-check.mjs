import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
try {
  await page.goto("http://127.0.0.1:3100/films", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator(".film-preview")).toHaveCount(11);
  for (let i = 0; i < 11; i++) {
    const button = page.locator(".film-preview").nth(i);
    const title = await button.getAttribute("aria-label");
    await button.click();
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".video-stage video");
        return v && v.readyState >= 2 && !v.error;
      },
      {},
      { timeout: 30000 },
    );
    const info = await page
      .locator(".video-stage video")
      .evaluate((v) => ({ duration: v.duration, width: v.videoWidth }));
    if (!Number.isFinite(info.duration) || info.width < 1)
      throw Error("Invalid media: " + title);
    console.log(title + " OK (" + Math.round(info.duration) + " seconds)");
    await page.getByRole("button", { name: "Close video" }).click();
    await expect(page.locator(".video-modal")).toHaveCount(0);
  }
  await page.getByRole("button", { name: "Play showreel" }).click();
  await page.waitForFunction(
    () => document.querySelector(".video-stage video")?.readyState >= 2,
  );
  await page.getByRole("button", { name: "Close video" }).click();
  await page.goto("http://127.0.0.1:3100/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector(".hero-video")?.readyState >= 2,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("Mobile overflow");
  if (errors.length) throw Error(errors.join("\n"));
  console.log("All 11 videos, showreel and hero playback verified.");
} finally {
  await browser.close();
}
