// Importing required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for partner information
const partnerSchema = new Schema(
  {
    // Name of the partner (unique)
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Image URL for the partner
    image: {
      type: String,
      required: true,
    },
    // Whether the partner is featured or not (optional)
    featured: {
      type: Boolean,
      required: false,
    },
    // Description of the partner
    description: {
      type: String,
      required: true,
    },
  },
  {
    // Including timestamps for partner creation and modification
    timestamps: true,
  }
);

// Creating the Partner model using the partner schema
const Partner = mongoose.model("Partner", partnerSchema);

// Exporting the Partner model for external use
module.exports = Partner;
