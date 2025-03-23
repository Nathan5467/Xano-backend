const mongoose = require("mongoose");

const Fund = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    Format:{
      type:String,
      required:true
    },
    Date: {
      type: String,
      required: true,
    },
    Time: {
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
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("fund", Fund);
