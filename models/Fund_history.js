const mongoose = require("mongoose");

const Fund_history = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("fund_history", Fund_history);
