const Member = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create JWT Token
const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Dashboard Data Fetch
const getDashboardData = async (req, res) => {
  try {
    const member = await Member.findOne({ email: req.user.email });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({
      name: member.name,
      email: member.email,
      profilePhoto: member.profilePhoto,
      roleInTeam: member.roleInTeam,
      skills: member.skills,
      description: member.description,
      projects: member.projects,
      attendance: member.attendance,
      leaveRequests: member.leaveRequests,
      projectGuidelines: member.projectGuidelines,
      createdAt: member.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getDashboardData, createToken };
