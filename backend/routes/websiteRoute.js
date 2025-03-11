const express = require('express');
const router = express.Router();
const { getWebsiteBySlug } = require('../controllers/websiteController');

router.get('/:slug', getWebsiteBySlug);

module.exports = router;
