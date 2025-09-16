const express = require("express");
const { chromium } = require("playwright");
const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],  // Important for Fly.io!
    });
    const page = await browser.newPage();
    await page.goto("https://www.nexusloanhub.com", { timeout: 20000 });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (error) {
    console.error("Scraping failed:", error.message);
    res.status(500).send("Error scraping site.");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
