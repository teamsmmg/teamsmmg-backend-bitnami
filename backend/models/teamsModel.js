const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    image: String,
    skills: [String],
    social: {
        threads: String,
        facebook: String,
        instagram: String,
        linkedin: String
    }
});

module.exports = mongoose.model('TeamMember', teamSchema);
