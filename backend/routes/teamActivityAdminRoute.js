
const express = require("express");
const { addProject } = require("../controllers/teamActivityController");
const upload = require("../middlewares/upload"); // Import multer middleware

const router = express.Router();

// Upload images & add project
router.post("/add-project", upload.array("projectImages"), addProject);


module.exports = router;
