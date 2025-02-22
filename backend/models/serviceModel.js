const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    // Hero Section: Service Overview
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },

    // About the Service
    about_service: { type: String, required: true, trim: true },
    about_service_description: { type: String, required: true, trim: true },
    about_service_image: { type: String, required: true },

    // What We Provide
    what_we_provide: {
      type: String,
      required: true,
      trim: true,
    },
    what_we_provide_cards: [
      {
        image: { type: String, required: true },
        heading: { type: String, required: true, trim: true },
      },
    ],
    what_we_provide_extra_image: { type: String, required: true },

    // Why You Need This Service
    service_need: { type: String, required: true, trim: true },
    service_need_card: {
      points: [{ type: String, required: true }], // Array of 5 points
    },
    service_need_image: { type: String, required: true },

    // Service Qualities
    service_qualities: { type: String, required: true, trim: true },
    service_qualities_description: { type: String, required: true, trim: true },
    service_qualities_cards: [
      {
        points: [{ type: String, required: true }], // Each card has 5 points
      },
    ],

    // Additional metadata
    type: { type: String, required: true, index: true }, // Faster querying on type
    pricing: {
      basic: {
        type: [{ type: String, trim: true }],
        validate: {
          validator: (arr) => Array.isArray(arr),
          message: "Basic plan should be an array",
        },
      },
      medium: {
        type: [{ type: String, trim: true }],
        validate: {
          validator: (arr) => Array.isArray(arr),
          message: "Medium plan should be an array",
        },
      },
      premium: {
        type: [{ type: String, trim: true }],
        validate: {
          validator: (arr) => Array.isArray(arr),
          message: "Premium plan should be an array",
        },
      },
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

module.exports = mongoose.model("Service", ServiceSchema);
