const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { authenticateUser } = require('../middleware/auth');

// Protect routes with authentication
router.get('/dashboard', authenticateUser, getDashboardData);

module.exports = router;
