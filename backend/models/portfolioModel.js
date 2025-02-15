const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
