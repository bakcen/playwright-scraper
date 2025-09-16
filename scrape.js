// scrape.js
const { chromium } = require("playwright");

async function scrapeWebsite(url) {
  if (!url.startsWith("http")) {
    throw new Error("Invalid URL format. Must start with http or https.");
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox'], // REQUIRED for Fly.io and containerized environments
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout: 20000 });
    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    await browser.close();
    throw new Error(`Failed to scrape: ${error.message}`);
  }
}

module.exports = scrapeWebsite;
