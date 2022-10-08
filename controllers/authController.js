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
  const newUser = await User.create({
    name,
    email,
    password,
    avatar: `https://robohash.org/${name.split(" ")[0]}`,
  });
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

// Change Password:
exports.changePassword = catchAsync(async (req, res, next) => {
  const { curPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.checkPassword(curPassword, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Your password has been changed",
  });
});

// Protect routes:
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //   Check if token exists:
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  //   Verify token:
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  //   Check if user still exists:
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }
  //   Check if user changed password after token was issued:
  // if (user.changedPasswordAfter(decoded.iat)) {
  //   return next(new AppError("Password has been changed", 401));
  // }
  //   Grant access to protected route:
  req.user = user;
  next();
});

// Check if user is logged in:
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      //   Check if user still exists:
      const user = await User.findById(decoded.id);
      if (!user) {
        return next();
      }
      //   Check if user changed password after token was issued:
      // if (user.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }
      //   Grant access to protected route:
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
});

// Restrict to:
exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Unauthorized access", 403));
    }
    next();
  });
};
