const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide code title"],
  },
  code: {
    type: String,
    required: [true, "Please enter code"],
  },
  lab: {
    type: mongoose.Schema.ObjectId,
    ref: "Lab",
  },
  uploader: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Code", codeSchema);
