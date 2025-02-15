const express = require("express");
const { addClient, getClients } = require("../controllers/clientController");
const upload = require("../middlewares/upload"); // Import multer middleware

const router = express.Router();

// Upload image & add client
router.post("/add-client", upload.single("projectImage"), addClient);


router.get("/clients", getClients);

module.exports = router;
