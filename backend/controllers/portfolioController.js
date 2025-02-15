const Portfolio = require('../models/portfolioModel');

// Fetch all portfolio projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Portfolio.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new project with image upload
exports.addProject = async (req, res) => {
    const { title, description, link } = req.body;
    const image = req.file.path; // Cloudinary image path

    try {
        const newProject = new Portfolio({ image, title, description, link });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
