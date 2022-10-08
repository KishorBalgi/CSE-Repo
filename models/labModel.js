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
});

const Lab = mongoose.model("Lab", labSchema);
module.exports = Lab;
