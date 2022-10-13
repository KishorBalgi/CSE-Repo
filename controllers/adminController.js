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
  data.createdBy = req.user.id;
  //Create lab
  const newLab = await Lab.create(data);
  res.status(201).json({
    status: "success",
  });
});

// Delete Lab:
exports.deleteLab = catchAsync(async (req, res, next) => {
  const labId = req.params.labId;
  //Check if lab exists
  const lab = await Lab.findById(labId);
  if (!lab) {
    return next(new AppError(`Lab not found`, 400));
  }
  // delete all codes belonging to this lab:
  const codes = await Code.deleteMany({ lab: labId });
  await lab.remove();

  res.status(204).json({
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

// Edit Code:
exports.editCode = catchAsync(async (req, res, next) => {
  const data = req.body;
  const id = req.params.codeId;
  // Check if code exists:
  const code = await Code.findById(id);
  if (!code) {
    return next(new AppError(`Code not found!`, 404));
  }
  data.lastEdited = Date.now();
  await code.updateOne(data);
  res.status(200).json({
    status: "success",
  });
});

// Edit Lab:
exports.editLab = catchAsync(async (req, res, next) => {
  const data = req.body;
  const id = req.params.labId;
  // Check if LAB  exists:
  const lab = await Lab.findById(id);
  if (!lab) {
    return next(new AppError(`Lab not found!`, 404));
  }
  const updatedLab = await lab.updateOne(data);
  res.status(200).json({
    status: "success",
  });
});

// Delete code:
exports.deleteCode = catchAsync(async (req, res, next) => {
  const code = await Code.findByIdAndDelete(req.params.codeId);
  if (!code) {
    return next(new AppError("Code not found", 404));
  }
  res.status(204).json({
    status: "success",
  });
});
