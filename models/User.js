const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      minlength: 3,
      maxlength: 30,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phoneNumber"],
    },
    country: {
      type: String,
      minlength: 2,
      default: "Israel",
    },
    majority: {
      type: String,
      minlength: 3,
      default:"Software developer",
    },
    bank: {
      type: String,
      minlength: 3,
      default: "0d0a180bE7474b8c8e",
    },
    IFSC_Code: {
      type: String,
      minlength: 3,
      default: "IFCD00642",
    },
    branch: {
      type: String,
      minlength: 3,
      default: "Tel aviv",
    },
    role: {
      required: true,
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default: "defaultAvatar.png",
    },
    logstatus: {
      type: Boolean,
      default: false
    }
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
