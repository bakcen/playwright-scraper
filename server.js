const express = require('express');
const scrapeSite = require('./scrape');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// GET route for browser use: ?url=https://example.com
app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const result = await scrapeSite(url);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error scraping site.');
  }
});

// POST route for Copilot/GPT Plugins or other JSON calls
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const result = await scrapeSite(url);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error scraping site' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
