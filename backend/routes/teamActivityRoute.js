const express = require('express');
const router = express.Router();
const teamActivityController = require('../controllers/teamActivityController');
const {authMiddleware} = require('../middlewares/userAuth');

router.post('/add', authMiddleware, teamActivityController.addProject);
router.get('/get', authMiddleware, teamActivityController.getProjects);
router.post('/update', authMiddleware, teamActivityController.updateProject);
router.delete('/delete/:id', authMiddleware, teamActivityController.deleteProject);
router.post('/accept/:id', authMiddleware, teamActivityController.acceptProject);
router.post('/complete/:id', authMiddleware, teamActivityController.completeProject);

module.exports = router;
