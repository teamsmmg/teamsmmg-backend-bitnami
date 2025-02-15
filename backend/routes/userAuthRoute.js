const express = require('express');
const router = express.Router();
const { Usersignup , Userlogin , submitProject} = require('../controllers/userAuthController');
const { authMiddleware } = require('../middlewares/userAuth');
router.post('/userSignup', Usersignup);
router.post('/userLogin', Userlogin);
router.post('/submitProject', authMiddleware, submitProject);


module.exports = router;
