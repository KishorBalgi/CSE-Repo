import "@babel/polyfill";
import { signup, login, logout, changePassword, deleteAccount } from "./auth";
import { changeAvatar, updateProfile } from "./profile";
let socket = io();
const viewCount = document.querySelector(".view-count .count");

// Viewer count:
socket.on("user-count-change", function (userCount) {
  viewCount.innerHTML = userCount;
});

// Authentication:

// Signup:
const signupForm = document.querySelector(".signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", signup);
}
// Login:
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", login);
}
// Logout:
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// Profile:

// Change Avatar:
const changeAvatarBtn = document.querySelector(".btn-rand-avatar");
if (changeAvatarBtn) {
  changeAvatarBtn.addEventListener("click", changeAvatar);
}

// Update Profile:
const updateProfileForm = document.querySelector(".update-profile-form");
if (updateProfileForm) {
  updateProfileForm.addEventListener("submit", updateProfile);
}

// Change Password:
const changePasswordForm = document.querySelector(".change-password-form");
if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", changePassword);
}

// Delete Account:
const deleteAccountForm = document.querySelector(".delete-profile-form ");
if (deleteAccountForm) {
  deleteAccountForm.addEventListener("submit", deleteAccount);
}
