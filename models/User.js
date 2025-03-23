const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      minlength: 3,
      maxlength: 50,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
    },
    phonenumber: {
      type: String,
      required: [true, "Please provide phonenumber"],
      minlength: 3,
    },
    country: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
    },
    majority: {
      type: String,
      required: [true, "Please provide phonenumber"],
      minlength: 3,
    },
    bank: {
      type: String,
      required: [true, "Please provide phonenumber"],
      minlength: 3,
    },
    IFSC_Code: {
      type: String,
      required: [true, "Please provide phonenumber"],
      minlength: 3,
    },
    branch: {
      type: String,
      required: [true, "Please provide phonenumber"],
      minlength: 3,
    },
    role: {
      required: true,
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
