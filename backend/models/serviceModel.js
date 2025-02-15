const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
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
