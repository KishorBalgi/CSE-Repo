const express = require("express");

const Router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

// View Routes:
Router.use(authController.isLoggedIn);
Router.route("/").get(viewController.getIndex);
Router.route("/login").get(viewController.getLogin);
// Router.route("/signup").get(viewController.getSignup);
Router.route("/labs").get(viewController.getLabs);
Router.route("/labs/:labId").get(viewController.getLab);
Router.route("/labs/codes/:codeId").get(viewController.getLabCode);
Router.route("/about").get(viewController.getAbout);
Router.route("/notes").get(viewController.getNotes);
Router.route("/placements").get(viewController.getPlacements);
Router.route("/text-books").get(viewController.getTextBooks);
Router.route("/contact").get(viewController.getContact);

// Protected Routes:
Router.use(authController.protect);
Router.route("/profile").get(viewController.getProfile);
Router.route("/profile/edit").get(viewController.getEditProfile);
Router.route("/profile/change-password").get(viewController.getChangePassword);
Router.route("/profile/delete").get(viewController.getDeleteAccount);

// Admins:
Router.use(authController.restrictTo("admin"));
Router.route("/admin").get(viewController.getAdminPanel);
Router.route("/admin/createLab").get(viewController.createLab);
Router.route("/admin/editLab/:labId").get(viewController.getEditLab);
Router.route("/admin/uploadCode").get(viewController.uploadCode);
Router.route("/admin/editCode/:codeId").get(viewController.getEditCode);
Router.route("/admin/createDomain").get(viewController.createDomain);
Router.route("/admin/editDomain/:domainId").get(viewController.getEditDomain);
Router.route("/admin/addCourse").get(viewController.addCourse);
Router.route("/admin/updateCourse/:courseId").get(viewController.getEditCourse);

module.exports = Router;
