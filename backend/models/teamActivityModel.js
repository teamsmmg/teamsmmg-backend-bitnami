const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    email: String,
    projectName: String,
    projectImages: [String],
    projectDescription: String,
    documentationLink: String,
    deadline: Date,
    notes: String,
    accepted: Boolean,
    activated: Boolean,
    submitted: Boolean
});

const TeamActivitySchema = new mongoose.Schema({
    uncompletedProjects: [[ProjectSchema]],
    completedProjects: [[ProjectSchema]]
});

const TeamActivity = mongoose.model('TeamActivity', TeamActivitySchema);

module.exports = { TeamActivity };
