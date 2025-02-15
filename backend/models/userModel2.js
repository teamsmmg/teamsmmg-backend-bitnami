const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePhoto: String,
  phoneNumber: String,
  companyName: String,
  projects: [
    {
      projectName: String,
      projectType: [String],
      projectPurpose: String,
      techStack: String,
      referenceLinks: String,
      budget: String,
      deadline: Date,
      additionalServices: [String],
    }
  ]
});

module.exports = mongoose.model('User2', userSchema);
