const express = require("express");

const Router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

// View Routes:
Router.use(authController.isLoggedIn);
Router.route("/").get(viewController.getIndex);
Router.route("/login").get(viewController.getLogin);
Router.route("/signup").get(viewController.getSignup);
Router.route("/labs").get(viewController.getLabs);

// Protected Routes:
Router.use(authController.protect);
Router.route("/profile").get(viewController.getProfile);
Router.route("/profile/edit").get(viewController.getEditProfile);
Router.route("/profile/change-password").get(viewController.getChangePassword);
Router.route("/profile/delete").get(viewController.getDeleteAccount);

// Admins:
Router.use(authController.restrictTo("admin"));
Router.route("/admins/createLab").get(viewController.createLab);
module.exports = Router;
