const TeamMember = require('../models/teamsModel');

exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTeamMember = async (req, res) => {
    try {
        const { name, skills, threads, facebook, instagram, linkedin } = req.body;
        const imageUrl = req.file.path; // Cloudinary stores the image URL in `req.file.path`

        const newMember = new TeamMember({
            name,
            image: imageUrl,
            skills: skills.split(','),
            social: { threads, facebook, instagram, linkedin }
        });

        await newMember.save();
        res.status(201).json({ message: 'Team member added successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
