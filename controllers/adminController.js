const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const Lab = require("../models/labModel");

// Create Lab:
exports.createLab = catchAsync(async (req, res, next) => {
  const data = req.body;
  //Check if Lab already exists
  const lab = await Lab.findOne(data);
  if (lab) {
    return next(new AppError(`Lab : ${lab.name} already exists`, 400));
  }
  //Create lab
  const newLab = await Lab.create(data);
  res.status(201).json({
    status: "success",
  });
});
