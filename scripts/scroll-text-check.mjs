import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of ["/", "/about", "/films", "/work", "/photography"]) {
    await page.goto("http://127.0.0.1:3100" + route, {
      waitUntil: "domcontentloaded",
    });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      if (
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        )
      )
        throw Error(`Overflow ${route} ${width}`);
    }
    const heading = page.locator(".scroll-text").last();
    await heading.scrollIntoViewIfNeeded();
    await heading.evaluate((el) =>
      window.scrollBy({
        top: el.getBoundingClientRect().bottom - innerHeight * 0.45,
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(1100);
    const opacity = await heading
      .locator(".scroll-text-word")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    if (opacity !== "1") throw Error("Heading did not finish revealing");
  }
  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await reduced.goto("http://127.0.0.1:3100/about", {
    waitUntil: "domcontentloaded",
  });
  const word = reduced.locator(".scroll-text-word").first();
  if ((await word.evaluate((el) => getComputedStyle(el).opacity)) !== "1")
    throw Error("Reduced motion text is dimmed");
  await reduced.close();
  if (errors.length) throw Error(errors.join("\n"));
  console.log(
    "Text reveals, reduced motion and all affected routes at 320/390/768/1440px pass.",
  );
} finally {
  await browser.close();
}
