const mongoose = require("mongoose");

const Add_withdrawl = new mongoose.Schema(
  {
    From: {
      type: String,
      required: true,
    },
    Transaction_id: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Amount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("add_withdrawl", Add_withdrawl);
