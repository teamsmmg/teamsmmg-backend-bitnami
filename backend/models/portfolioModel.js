const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }, // Detailed description
    brief: { type: String }, // Short summary of the project
    link: { type: String },
    technologies: [{ type: String }], // Tech stack used in the project
    teamMembers: [{ 
        name: String, 
        role: String 
    }], // List of team members with their roles
    totalMembers: { type: Number }, // Total number of people involved
    startDate: { type: Date },
    endDate: { type: Date },
    status: { 
        type: String, 
        enum: ['Completed', 'In Progress', 'On Hold'], 
        default: 'In Progress' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
