const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/pdf', async (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith('https://archive.org/')) {
    return res.status(400).send('Invalid or missing URL');
  }
  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(404).send('PDF not found');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/pdf');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching PDF');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));