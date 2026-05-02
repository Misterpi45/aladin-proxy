const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/*', async (req, res) => {
  const path = req.originalUrl.replace('/api', '');
  const url = 'https://api-football-v1.p.rapidapi.com/v3' + path;

  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': '8909060d7cmshc6508b07b7ee923p14ac1cjsn47007b48dab6',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });

    const data = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);

  } catch(e) {
    res.status(500).json({ errors: [e.message], response: [] });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ALADIN Proxy OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy running on port', PORT));
