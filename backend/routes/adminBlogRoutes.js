const express = require('express');
const { createBlog } = require('../controllers/adminBlogController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/create', upload.single('thumbnail'), createBlog);

module.exports = router;
