const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  projectImage: String,  // Cloudinary Image URL
  heading: String,
  description: String,
  projectLink: String,
});

module.exports = mongoose.model("Client", clientSchema);
