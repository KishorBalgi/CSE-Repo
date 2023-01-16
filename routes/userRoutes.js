const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/logout").get(authController.logout);
Router.route("/contact").post(authController.contact);

// Protected Routes:
Router.use(authController.protect);
Router.route("/profile").patch(userController.updateProfile);
Router.route("/account/password").patch(authController.changePassword);
Router.route("/account").delete(userController.deleteAccount);

module.exports = Router;
