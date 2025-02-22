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

// 📌 Get a Single Portfolio Project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Portfolio.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
