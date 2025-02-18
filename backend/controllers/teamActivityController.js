const { TeamActivity } = require('../models/teamActivityModel');

exports.addProject = async (req, res) => {
    try {
        const { email, ...projectData } = req.body;
        let teamActivity = await TeamActivity.findOne({});
        if (!teamActivity) {
            teamActivity = new TeamActivity({ uncompletedProjects: [[]], completedProjects: [[]] });
        }
        teamActivity.uncompletedProjects[0].push({ email, ...projectData });
        await teamActivity.save();
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
  try {
      const userEmail = req.user.email;
      const teamActivity = await TeamActivity.findOne({});
      if (!teamActivity) return res.status(404).json({ message: 'No projects found' });
      
      const userUncompletedProjects = teamActivity.uncompletedProjects[0].filter(project => project.email === userEmail);
      const userCompletedProjects = teamActivity.completedProjects[0].filter(project => project.email === userEmail);
      
      res.status(200).json({
          uncompletedProjects: [userUncompletedProjects],
          completedProjects: [userCompletedProjects]
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.updateProject = async (req, res) => {
  try {
      const { projectName } = req.body;
      const userEmail = req.user.email;
      
      const teamActivity = await TeamActivity.findOne({});
      if (!teamActivity) return res.status(404).json({ message: 'No projects found' });
      
      let projectFound = false;
      teamActivity.uncompletedProjects[0] = teamActivity.uncompletedProjects[0].map(project => {
          if (project.email === userEmail && project.projectName === projectName) {
              project.accepted = true;
              projectFound = true;
          }
          return project;
      });
      
      if (!projectFound) return res.status(404).json({ message: 'Project not found' });
      
      await teamActivity.save();
      res.status(200).json({ message: 'Project accepted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.deleteProject = async (req, res) => {
    try {
        const teamActivity = await TeamActivity.findOne({});
        if (!teamActivity) return res.status(404).json({ message: 'No projects found' });
        // Deleting logic needs to be implemented
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.acceptProject = async (req, res) => {
    try {
        const teamActivity = await TeamActivity.findOne({});
        if (!teamActivity) return res.status(404).json({ message: 'No projects found' });
        // Accept logic needs to be implemented
        res.status(200).json({ message: 'Project accepted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completeProject = async (req, res) => {
    try {
        const teamActivity = await TeamActivity.findOne({});
        if (!teamActivity) return res.status(404).json({ message: 'No projects found' });
        // Move project to completed logic needs to be implemented
        res.status(200).json({ message: 'Project moved to completed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
