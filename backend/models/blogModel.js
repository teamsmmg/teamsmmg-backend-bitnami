const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  htmlcode: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  author: {
    name: { type: String, required: true },
    profileLink: { type: String, required: true }
  }
});

module.exports = mongoose.model('Blog', blogSchema);
