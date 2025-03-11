const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  heading: String,
  subheading: String,
  address: String
});

module.exports = mongoose.model('Website', websiteSchema);
