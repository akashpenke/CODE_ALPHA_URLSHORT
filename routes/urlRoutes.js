const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Shorten
router.post('/shorten', urlController.shortenUrl);

// Redirect (must be last, acts as a catch-all)
router.get('/:shortCode', urlController.redirectUrl);

module.exports = router;
