const express = require('express');
const router = express.Router();
const { getTeamMembers, addTeamMember } = require('../controllers/teamsController');
const upload = require("../middlewares/upload"); // Import multer middleware

router.get('/', getTeamMembers);
router.post('/add', upload.single('image'), addTeamMember);

module.exports = router;
