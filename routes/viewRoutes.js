const express = require("express");

const Router = express.Router();
const viewController = require("../controllers/viewController");

// View Routes:
Router.route("/").get(viewController.getIndex);

Router.route("/login").get(viewController.getLogin);

Router.route("/signup").get(viewController.getSignup);

module.exports = Router;
