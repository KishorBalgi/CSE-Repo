const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

Router.use(authController.protect);
Router.use(authController.restrictTo("admin"));

Router.route("/createLab").post(adminController.createLab);
Router.route("/uploadCode").post(adminController.uploadCode);

module.exports = Router;
