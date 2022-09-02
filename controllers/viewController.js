const catchAsync = require("../util/catchAsync");

exports.getIndex = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Home",
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.render("login", {
    title: "Login",
  });
});

exports.getSignup = catchAsync(async (req, res, next) => {
  res.render("signup", {
    title: "Signup",
  });
});
