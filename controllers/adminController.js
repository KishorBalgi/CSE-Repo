const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const Lab = require("../models/labModel");
const Code = require("../models/codeModel");

// Create Lab:
exports.createLab = catchAsync(async (req, res, next) => {
  const data = req.body;
  //Check if Lab already exists
  const lab = await Lab.findOne({ name: data.name, semester: data.semester });
  if (lab) {
    return next(new AppError(`Lab : ${lab.name} already exists`, 400));
  }
  //Create lab
  const newLab = await Lab.create(data);
  res.status(201).json({
    status: "success",
  });
});

// Upload code:
exports.uploadCode = catchAsync(async (req, res, next) => {
  const data = req.body;
  // Check if code exists:
  const code = await Code.findOne({ title: data.title, lab: data.lab });
  if (code) {
    return next(new AppError(`Code : ${data.title} already exists`, 400));
  }
  data.uploader = req.user.id;
  // Create code:
  const newCode = await Code.create(data);
  res.status(201).json({
    status: "success",
    codeId: newCode._id,
  });
});
