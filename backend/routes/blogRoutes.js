const express = require('express');
const { getAllBlogs, getBlogById } = require('../controllers/blogController');
const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);  // New route to fetch blog by ID

module.exports = router;
