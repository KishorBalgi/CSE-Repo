const catchAsync = require("../util/catchAsync");
const Lab = require("../models/labModel");
const Code = require("../models/codeModel");
const User = require("../models/userModel");

exports.getIndex = catchAsync(async (req, res, next) => {
  // Get user ip address:
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // console.log(ip);
  res.render("index", {
    title: "Home",
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.render("about", {
    title: "About",
  });
});

exports.getNotes = catchAsync(async (req, res, next) => {
  res.render("_gdrive", {
    title: "Notes",
    link: "https://drive.google.com/embeddedfolderview?id=1s6LiRwgqN7AHO2xkRoTFVpQi4Bv7uo7E#grid",
  });
});

exports.getPlacements = catchAsync(async (req, res, next) => {
  res.render("_gdrive", {
    title: "Placements",
    link: "https://drive.google.com/embeddedfolderview?id=1-3iGG250VKl42zyOZYjxOKiS00zhVY6y#grid",
  });
});

exports.getTextBooks = catchAsync(async (req, res, next) => {
  res.render("_gdrive", {
    title: "Text Books",
    link: "https://drive.google.com/embeddedfolderview?id=1XgNHCQoJ9kU3JWVFS6_MllszmhR67Lr_#grid",
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
  res.render("labs", {
    title: "Labs",
    sems,
  });
});

exports.getLab = catchAsync(async (req, res, next) => {
  const lab = await Lab.findById(req.params.labId).populate("createdBy");
  // find codes by labID:
  const codes = await Code.find({
    lab: req.params.labId,
  }).select("title _id");
  res.render("lab", {
    title: lab.name,
    lab,
    codes,
  });
});

exports.getLabCode = catchAsync(async (req, res, next) => {
  const code = await Code.findById(req.params.codeId).populate("uploader");
  res.render("labCode", {
    title: code.title,
    code,
  });
});

// Admin:
exports.getAdminPanel = catchAsync(async (req, res, next) => {
  res.render("adminPanel", {
    title: "Admin Dashbord",
  });
});

exports.createLab = catchAsync(async (req, res, next) => {
  res.render("createLab", {
    title: "Create Lab",
  });
});

exports.uploadCode = catchAsync(async (req, res, next) => {
  const labs = await Lab.find().sort({ name: 1 });
  res.render("uploadCode", {
    title: "Upload Code",
    labs,
  });
});

// Edit Code:
exports.getEditCode = catchAsync(async (req, res, next) => {
  const code = await Code.findById(req.params.codeId);
  const labs = await Lab.find().sort({ name: 1 });

  if (!code || !labs) return next(new AppError("Something Went Wrong", 404));
  res.render("editCode", {
    title: "Edit Code",
    code,
    labs,
  });
});

// Edit Lab:
exports.getEditLab = catchAsync(async (req, res, next) => {
  const lab = await Lab.findById(req.params.labId);
  if (!lab) return next(new AppError("Something went Wrong", 404));
  res.render("editLab", {
    title: "Edit Lab",
    lab,
  });
});

// Courses:

exports.createDomain = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Create Domain",
  });
});

exports.getEditDomain = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Edit Domain",
  });
});

exports.addCourse = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Add Course",
  });
});

exports.getEditCourse = catchAsync(async (req, res, next) => {
  res.render("index", {
    title: "Edit Course",
  });
});

// Contact:
exports.getContact = catchAsync(async (req, res, next) => {
  res.render("contact", {
    title: "Contact",
  });
});
