const catchAsync = require("../util/catchAsync");

exports.getIndex = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Home",
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  if (res.locals.user) {
    return res.redirect("/");
  }
  res.render("login", {
    title: "Login",
  });
});

exports.getSignup = catchAsync(async (req, res, next) => {
  if (res.locals.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Signup",
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  res.render("profile", {
    title: "Profile",
  });
});

exports.getEditProfile = catchAsync(async (req, res, next) => {
  res.render("editProfile", {
    title: "Edit Profile",
  });
});

exports.getChangePassword = catchAsync(async (req, res, next) => {
  res.render("changePassword", {
    title: "Change Password",
  });
});

exports.getDeleteAccount = catchAsync(async (req, res, next) => {
  res.render("deleteProfile", {
    title: "Delete Account",
  });
});
