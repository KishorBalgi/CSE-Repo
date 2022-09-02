const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");

Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/logout").get(authController.logout);

module.exports = Router;
