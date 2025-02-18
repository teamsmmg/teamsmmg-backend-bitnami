const express = require("express");
const router = express.Router();
const Service = require("../models/serviceModel");

// GET Services Route
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find().lean(); // Use .lean() for better performance

    if (!services || services.length === 0) {
      return res.status(200).json([]); // Explicit status code for empty result
    }

    // Format services correctly
    const formattedServices = services.map(service => ({
      id: service._id, // 🔹 Added ID field
      title: service.title,
      image: service.image,
      description: service.description,
      longDescription: service.longDescription || "No detailed description available.",
      type: service.type,
      pricing: {
        Basic: service.pricing?.basic || [],
        Medium: service.pricing?.medium || [],
        Premium: service.pricing?.premium || [],
      },
    }));

    res.status(200).json(formattedServices);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Get a Single Service by ID
router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
