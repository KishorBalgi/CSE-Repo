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

// Send JWT to client:
const sendJWTToken = (user, statusCode, res, req) => {
  const token = signToken(user._id);
  // Cookie options:
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    data: { user: user },
  });
};

// Sign up:
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  //   Check if email and password exist:
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  //   Check if user exists:
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("User already exists", 400));
  }
  //   Create user:
  const newUser = await User.create({ name, email, password });
  // Token:
  sendJWTToken(newUser, 201, res, req);
});

// Log in:
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //   Check if email and password exist:
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  //   Check if user exists:
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //   Token:
  sendJWTToken(user, 200, res, req);
});

// Log out:
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
