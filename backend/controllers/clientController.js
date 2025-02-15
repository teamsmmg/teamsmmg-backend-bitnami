const Client = require("../models/clientModel");

// Add a new client with Cloudinary image
exports.addClient = async (req, res) => {
    try {
     
      const { name, heading, description, projectLink } = req.body;
      
      // Check if file exists
      if (!req.file || !req.file.secure_url) {
        return res.status(400).json({ message: "Image upload failed!" });
      }
  
      const projectImage = req.file.secure_url; // Get Cloudinary secure URL
  
    
      // Create new client document
      const newClient = new Client({
        name,
        projectImage,  // Save correct image URL
        heading,
        description,
        projectLink,
      });
  
      await newClient.save(); // Save to MongoDB
  
  
      res.status(201).json({ message: "Client added successfully!", client: newClient });
  
    } catch (error) {
     
      res.status(500).json({ message: "Error adding client", error });
    }
  };
  
  
// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};
