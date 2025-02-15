const express = require("express");
const router = express.Router();
const Service = require("../models/serviceModel");

// GET Services Route
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.json([]);
    }

    // Format services correctly
    const formattedServices = services.map(service => ({
      title: service.title,
      image: service.image,
      description: service.description,
      longDescription: service.longDescription || "No detailed description available.",
      type: service.type,
      pricing: {
        Basic: service.pricing?.basic || [],
        Medium: service.pricing?.medium || [],
        Premium: service.pricing?.premium || [],
      }
    }));

    res.json(formattedServices);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
