const Service = require("../models/serviceModel");

// 📌 Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("❌ Error in getAllServices:", error);
    res.status(500).json({ error: "Failed to retrieve services" });
  }
};

// 📌 Add a New Service
exports.createService = async (req, res) => {
  try {
    console.log("🔹 Incoming Request Body:", req.body);
    console.log("🔹 Incoming File:", req.file);

    const { type, title, description, longDescription, pricing } = req.body;

    // Validate if all required fields exist
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    if (!type || !title || !description || !longDescription || !pricing) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Parse pricing (if it's a stringified JSON)
    let parsedPricing;
    try {
      parsedPricing = typeof pricing === "string" ? JSON.parse(pricing) : pricing;
    } catch (error) {
      return res.status(400).json({ error: "Invalid pricing format!" });
    }

    // Ensure pricing object has required keys
    parsedPricing = {
      basic: Array.isArray(parsedPricing.basic) ? parsedPricing.basic : [],
      medium: Array.isArray(parsedPricing.medium) ? parsedPricing.medium : [],
      premium: Array.isArray(parsedPricing.premium) ? parsedPricing.premium : [],
    };

    // Create and save new service entry
    const newService = new Service({
      type,
      title,
      description,
      longDescription,
      image: req.file.path, // Cloudinary Image URL
      pricing: parsedPricing,
    });

    await newService.save();

    res.status(201).json({ message: "Service added successfully!", newService });
  } catch (error) {
    console.error("❌ Error in createService:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Get a Single Service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) return res.status(404).json({ error: "Service not found!" });

    res.status(200).json(service);
  } catch (error) {
    console.error("❌ Error in getServiceById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Delete a Service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) return res.status(404).json({ error: "Service not found!" });

    res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    console.error("❌ Error in deleteService:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
