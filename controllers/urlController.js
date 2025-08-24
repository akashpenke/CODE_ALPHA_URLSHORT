const Url = require('../models/Url');
const { nanoid } = require('nanoid');

// Shorten URL
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.session?.userId; // If you use authentication

  if (!originalUrl) return res.status(400).send('URL is required');

  const shortCode = nanoid(6);

  const newUrl = new Url({ shortCode, originalUrl, user: userId });
  await newUrl.save();

  const fullShortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
  res.render('result', { fullShortUrl });
};

// Redirect
exports.redirectUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).send('URL not found');

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
