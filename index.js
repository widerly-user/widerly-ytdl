const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/audio', async (req, res) => {
    const url = req.query.url;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        if (!audioFormat) {
            throw new Error('No audio format available');
        }
        res.json({ url: audioFormat.url });
    } catch (error) {
        console.error('Error fetching audio:', error);
        res.status(500).json({ error: 'Failed to fetch audio' });
    }
});

module.exports = app;
