const catchAsync = require("../util/catchAsync");
const Lab = require("../models/labModel");

exports.getIndex = catchAsync(async (req, res, next) => {
  // Get user ip address:
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // console.log(ip);
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

// Labs:
exports.getLabs = catchAsync(async (req, res, next) => {
  // Get All Labs group by semester and order by semeseter number:
  const sems = await Lab.aggregate([
    {
      $group: {
        _id: "$semester",
        labs: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
  console.log(sems);
  res.render("labs", {
    title: "Labs",
    sems,
  });
});

// Admin:
exports.createLab = catchAsync(async (req, res, next) => {
  res.render("createLab", {
    title: "Create Lab",
  });
});
