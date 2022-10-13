const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

Router.use(authController.protect);
Router.use(authController.restrictTo("admin"));

Router.route("/createLab").post(adminController.createLab);
Router.route("/deleteLab/:labId").delete(adminController.deleteLab);
Router.route("/editLab/:labId").patch(adminController.editLab);
Router.route("/uploadCode").post(adminController.uploadCode);
Router.route("/editCode/:codeId").patch(adminController.editCode);
Router.route("/deleteCode/:codeId").delete(adminController.deleteCode);

module.exports = Router;
