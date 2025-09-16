// server.js
const express = require("express");
const scrapeWebsite = require("./scrape");

const app = express();

app.get("/", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("❌ Please provide a URL using the ?url= parameter.");
  }

  try {
    const html = await scrapeWebsite(url);
    res.status(200).send(html);
  } catch (error) {
    console.error("Scraper error:", error.message);
    res.status(500).send("❌ Error scraping site. " + error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
