const playwright = require('playwright');

async function scrapeSite(url) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Grab content
  const html = await page.content();
  const title = await page.title();
  const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  
  // Screenshot
  const screenshotBuffer = await page.screenshot({ fullPage: true });
  const screenshotBase64 = screenshotBuffer.toString('base64');

  await browser.close();

  return {
    url,
    title,
    description,
    html,
    screenshotBase64,
  };
}

module.exports = scrapeSite;
