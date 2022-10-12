const mongoose = require("mongoose");

const labSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lab name is required"],
    unique: [true, "Lab name is already in database"],
  },
  semester: {
    type: String,
    required: [true, "Semester is required"],
  },
  info: {
    type: String,
    required: [true, "Info is required"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lab = mongoose.model("Lab", labSchema);
module.exports = Lab;
