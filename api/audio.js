const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        console.log(`Fetching info for URL: ${url}`);
        const info = await ytdl.getInfo(url, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        });
        console.log('Info fetched:', info.formats.length, 'formats available');
        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        if (!audioFormat) {
            throw new Error('No audio format available');
        }
        console.log(`Audio URL: ${audioFormat.url}`);
        res.status(200).json({ url: audioFormat.url });
    } catch (error) {
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch audio', details: error.message });
    }
};
