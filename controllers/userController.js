const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// JWT:
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};
