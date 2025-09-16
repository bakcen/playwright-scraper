const { chromium } = require("playwright");

module.exports = async function scrapeWebsite(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
    locale: "en-US",
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    const html = await page.content();
    await browser.close();
    return html;
  } catch (error) {
    await browser.close();
    throw new Error("Failed to scrape: " + error.message);
  }
};
