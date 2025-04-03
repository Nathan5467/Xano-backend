// File: controllers/user.js
// Description: This file contains the controller logic for handling user-related operations in the application.
// It interacts with the User model, performs database operations, and handles authentication using JWT.

// Dependencies
const jwt = require("jsonwebtoken"); // For generating and verifying JSON Web Tokens (JWT).
const bcrypt = require("bcryptjs"); // For hashing and comparing passwords securely.
const User = require("../models/User"); // Mongoose model for the User collection.

// Constants
const JWT_SECRET = "secretkey"; // Secret key for signing JWT tokens (should be stored securely in environment variables).

// Controller Functions

/**
 * Handles user login.
 * Verifies email and password, updates log status, and generates a JWT token.
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);
    if (isMatch) {
      await User.findByIdAndUpdate(foundUser._id, { logstatus: true });
      const token = jwt.sign(
        {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar,
          role: foundUser.role,
          country: foundUser.country,
          majority: foundUser.majority,
          phoneNumber: foundUser.phoneNumber,
          IFSC_Code: foundUser.IFSC_Code,
          bank: foundUser.bank,
          branch: foundUser.branch,
          balance: foundUser.balance,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ msg: "User logged in", token });
    } else {
      return res.status(200).json({ msg: "Invalid password" });
    }
  } else {
    return res.status(200).json({ msg: "Email not found" });
  }
};

/**
 * Updates the user's log status to false (e.g., for logout).
 */
const logBoolean = async (req, res) => {
  const userId = req.body.id;
  const result = await User.findByIdAndUpdate(userId, { logstatus: false });
  res.status(200).json({ msg: "Log status updated", result });
};

/**
 * Returns a personalized message and a random lucky number for authenticated users.
 */
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

/**
 * Retrieves all users from the database.
 */
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

/**
 * Deletes a user from the database based on the provided user ID.
 */
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({ msg: "User deleted successfully" });
};

const updateUser = async (req, res) => {
  const options = { new: true };
  const updateData = { ...req.body };
  const result = await User.findByIdAndUpdate(req.user.id, updateData, options);

  if (!result) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({ msg: "User updated successfully", result });
};

/**
 * Handles user registration.
 * Creates a new user if the email is not already in use.
 */
const register = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    if (username && email && password) {
      const newUser = new User({
        name: username,
        email,
        password,
        phoneNumber,
        role: "user",
      });
      await newUser.save();
      return res.status(201).json({ newUser });
    } else {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

/**
 * Updates user details, including the password, based on the provided data.
 */
const registeragain = async (req, res) => {
  const foundUser = { ...req.body };
  const result = await User.findByIdAndUpdate(req.body.id, foundUser);
  if (!result) {  
    return res.status(404).json({ msg: "User not found" });
  }
  await User.findByIdAndUpdate(foundUser._id, { logstatus: true }, { new: true });
  const token = jwt.sign(
    {
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      avatar: foundUser.avatar,
      role: foundUser.role,
      country: foundUser.country,
      majority: foundUser.majority,
      phoneNumber: foundUser.phoneNumber,
      IFSC_Code: foundUser.IFSC_Code,
      bank: foundUser.bank,
      branch: foundUser.branch,
      balance: foundUser.balance,
      logstatus: foundUser.logstatus,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res.status(200).json({ msg: "User logged in", token });
};

// Exports
module.exports = {
  login,
  register,
  updateUser,
  dashboard,
  getAllUsers,
  registeragain,
  deleteUser,
  logBoolean,
};