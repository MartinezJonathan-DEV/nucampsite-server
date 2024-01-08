const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

/**
 * Schema for comments associated with a campsite.
 */
const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Schema for a campsite.
 */
const campsiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    elevation: {
      type: Number,
      required: true,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * Model for a Campsite.
 *
 * @typedef {Object} Campsite
 * @property {string} name - The name of the campsite.
 * @property {string} description - A description of the campsite.
 * @property {string} image - The image URL of the campsite.
 * @property {number} elevation - The elevation of the campsite.
 * @property {Currency} cost - The cost of the campsite.
 * @property {boolean} featured - Whether the campsite is featured or not.
 * @property {Array<Object>} comments - An array of comments associated with the campsite.
 * @property {string} comments[].rating - The rating of the comment.
 * @property {string} comments[].text - The text content of the comment.
 * @property {string} comments[].author - The author of the comment.
 * @property {Date} createdAt - The timestamp of when the campsite was created.
 * @property {Date} updatedAt - The timestamp of when the campsite was last updated.
 */

const Campsite = mongoose.model("Campsite", campsiteSchema);

module.exports = Campsite;
