const express = require('express');
const youtubedl = require('youtube-dl-exec');
const app = express();

app.get('/audio', async (req, res) => {
    const url = req.query.url;
    try {
        const info = await youtubedl(url, { format: 'bestaudio', getUrl: true });
        res.json({ url: info });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch audio' });
    }
});

module.exports = app;
