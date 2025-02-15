const express = require('express');
const router = express.Router();
const { getUserDashboard } = require('../controllers/userDashboardController');
const {authMiddleware} = require('../middlewares/userAuth'); // Auth verification middleware

// GET request to fetch user details
router.get('/dashboard', authMiddleware, getUserDashboard);

module.exports = router;
