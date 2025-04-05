const mongoose = require("mongoose");

const Transaction = new mongoose.Schema(
  {
    stocks: {
      type: String,
      required: true,
    },
    avg: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    cmp: {
      type: Number,
      required: true,
    },
    val_cost: {
      type: Number,
      required: true,
    },
    return: {
      type: Number,
      required: true,
    },
    val_cmp: {
      type: Number,
      required: true,
    },
    day_gain: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      default: "success",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("transaction", Transaction);
