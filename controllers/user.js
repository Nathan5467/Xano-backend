const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "secretkey";
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          country: foundUser.country,
          majority: foundUser.majority,
          phonenumber: foundUser.phonenumber,
          IFSC_Code: foundUser.IFSC_Code,
          bank: foundUser.bank,
          branch: foundUser.branch,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(200).json({ msg: "password" });
    }
  } else {
    return res.status(200).json({ msg: "email" });
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});
  console.log(users)

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password, phonenumber } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
        phonenumber: phonenumber,
        role: "user",
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res
        .status(400)
        .json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const registeragain = async (req, res) => {
  const options = { new: true };
  const updatedata = req.body;
  const salt = await bcrypt.genSalt(10);
  console.log(req.user.id);
  const password = await bcrypt.hash(req.body.password, salt);
  const update_again = { ...req.body, password: password };
  console.log(update_again);
  const result = await User.findByIdAndUpdate(
    req.user.id,
    update_again,
    options
  );
  if (!result) {
    return res.status(404).send({ message: "User not found" });
    console.log("err");
  }
  return res.status(200).json({ msg: "success" });
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  registeragain,
};
