const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePhoto: String,
  roleInTeam: String,
  skills: [String],
  description: String,
  projects: [
    {
      image: String,
      heading: String,
      description: String,
      link: String,
    }
  ],
  attendance: [String],
  leaveRequests: [
    {
      date: String,
      reason: String,
    }
  ],
  projectGuidelines: [
    {
      projectName: String,
      yourWork: String,
      deadline: String,
      requiredLinks: [String],
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
