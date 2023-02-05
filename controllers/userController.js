const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// JWT:
// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXP,
//   });
// };

// Update Profile:
exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Your profile has been updated",
  });
});

// Delete Account:
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.user.id)
    .select("+password")
    .select("+active");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  if (!(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }
  user.active = false;
  await user.save({ validateBeforeSave: false });
  res.status(204).json({
    status: "success",
    message: "Your Accunt has been deleted",
  });
});
