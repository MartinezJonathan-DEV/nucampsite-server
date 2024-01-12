// Importing required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Load currency type for mongoose
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Schema for comments
const commentSchema = new Schema(
  {
    // Rating for the campsite (between 1 and 5)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    // Text content of the comment
    text: {
      type: String,
      required: true,
    },
    // Author of the comment
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds timestamps for creation and modification
  }
);

// Schema for campsites
const campsiteSchema = new Schema(
  {
    // Name of the campsite (must be unique)
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Description of the campsite
    description: {
      type: String,
      required: true,
    },
    // Image URL for the campsite
    image: {
      type: String,
      required: true,
    },
    // Elevation of the campsite
    elevation: {
      type: Number,
      required: true,
    },
    // Cost of the campsite (in specified Currency)
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
    // Featured status of the campsite (default is false)
    featured: {
      type: Boolean,
      default: false,
    },
    // Array of comments associated with the campsite
    comments: [commentSchema],
  },
  {
    timestamps: true, // Adds timestamps for creation and modification
  }
);

// Model for the Campsite using the defined schema
const Campsite = mongoose.model("Campsite", campsiteSchema);

// Exporting the Campsite model for external use
module.exports = Campsite;
