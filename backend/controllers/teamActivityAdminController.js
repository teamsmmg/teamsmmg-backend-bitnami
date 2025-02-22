const TeamActivity = require("../models/teamActivityModel");

// Add a new project to a team's activity
exports.addProject = async (req, res) => {
    try {
        const { email, projectName, projectDescription, documentationLink, deadline, notes, accepted, activated, submitted } = req.body;
        console.log(req.body);
        const projectImages = req.files ? req.files.map(file => file.secure_url) : [];

        console.log("Processed Images:", projectImages);

        const newProject = {
            email,
            projectName,
            projectImages,
            projectDescription,
            documentationLink,
            deadline,
            notes,
            accepted,
            activated,
            submitted
        };

        let teamActivity = await TeamActivity.findOne();
        if (!teamActivity) {
            teamActivity = new TeamActivity({ uncompletedProjects: [[newProject]], completedProjects: [] });
        } else {
            teamActivity.uncompletedProjects.push([newProject]);
        }

        await teamActivity.save();
        res.status(201).json({ message: "Project added successfully!", project: newProject });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Error adding project", error });
    }
};