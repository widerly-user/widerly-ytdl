const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        if (!audioFormat) {
            throw new Error('No audio format available');
        }
        res.status(200).json({ url: audioFormat.url });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch audio' });
    }
};
