const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        console.log(`Fetching info for URL: ${url}`);
        const info = await ytdl.getInfo(url);
        console.log('Info fetched successfully');
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        if (!audioFormat) {
            throw new Error('No audio format available');
        }
        console.log(`Audio URL: ${audioFormat.url}`);
        res.status(200).json({ url: audioFormat.url });
    } catch (error) {
        console.error('Detailed error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch audio', details: error.message });
    }
};
