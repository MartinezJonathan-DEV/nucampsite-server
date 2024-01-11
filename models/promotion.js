// Importing required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Loading currency type for monetary values
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Schema for promotion information
const promotionSchema = new Schema(
  {
    // Name of the promotion (unique)
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Image URL for the promotion
    image: {
      type: String,
      required: true,
    },
    // Whether the promotion is featured or not (optional)
    featured: {
      type: Boolean,
      required: false,
    },
    // Cost of the promotion (in currency)
    cost: {
      type: Currency,
      required: true,
    },
    // Description of the promotion
    description: {
      type: String,
      required: true,
    },
  },
  {
    // Including timestamps for promotion creation and modification
    timestamps: true,
  }
);

// Creating the Promotion model using the promotion schema
const Promotion = mongoose.model("Promotion", promotionSchema);

// Exporting the Promotion model for external use
module.exports = Promotion;
