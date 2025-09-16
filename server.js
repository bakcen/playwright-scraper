const express = require("express");
const app = express();
const scrapeWebsite = require("./scrape");

app.use(express.json());

app.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL in request body" });
  }

  try {
    const html = await scrapeWebsite(url);
    res.json({ html });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("🧠 Playwright Scraper API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
