const express = require('express');
const { getAllProjects, addProject , getProjectById } = require('../controllers/portfolioController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/', getAllProjects);
router.post('/', upload.single('image'), addProject);
router.get("/:id", getProjectById);
module.exports = router;
