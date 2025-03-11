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
    what_we_provide: { type: String, required: true, trim: true },
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
      points: {
        type: [{ type: String, required: true }],
        validate: [arrayLimit, "{PATH} must have exactly 5 points"],
      },
    },
    service_need_image: { type: String, required: true },

    // Service Qualities
    service_qualities: { type: String, required: true, trim: true },
    service_qualities_description: { type: String, required: true, trim: true },
    service_qualities_cards: [
      {
        points: {
          type: [{ type: String, required: true }],
          validate: [arrayLimit, "{PATH} must have exactly 5 points"],
        },
      },
    ],

    // Additional metadata
    type: { type: String, required: true, index: true },

    // Pricing Section
    pricing: {
      basic: {
        individual_pricing: { type: Number, required: true },
        type: {
          type: [{ type: String, trim: true }],
          validate: [arrayNotEmpty, "Basic plan should have at least one feature"],
        },
      },
      medium: {
        individual_pricing: { type: Number, required: true },
        type: {
          type: [{ type: String, trim: true }],
          validate: [arrayNotEmpty, "Medium plan should have at least one feature"],
        },
      },
      premium: {
        individual_pricing: { type: Number, required: true },
        type: {
          type: [{ type: String, trim: true }],
          validate: [arrayNotEmpty, "Premium plan should have at least one feature"],
        },
      },
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

// Validators
function arrayLimit(val) {
  return val.length === 5;
}

function arrayNotEmpty(val) {
  return val.length > 0;
}

module.exports = mongoose.model("Service", ServiceSchema);
