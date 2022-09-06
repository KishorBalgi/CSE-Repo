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
const logoutBtn = document.querySelectorAll(".logout-btn");
if (logoutBtn) {
  logoutBtn.forEach((e) => e.addEventListener("click", logout));
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

// Mobile Menu:
const mobMenuBtn = document.querySelector(".mob-menu-btn");
const mobMenu = document.querySelector(".mob-menu");
const mobMenuItems = document.querySelectorAll(".mob-menu li");
const overlay = document.querySelector(".overlay");

const closeMobMenu = () => {
  mobMenu.style.animation = "SlideOut 0.6s ease-in-out";
  setTimeout(() => {
    mobMenu.style.display = "none";
    overlay.style.display = "none";
    mobMenu.style.animation = "SlideIn 0.6s ease-in-out";
  }, 600);
};

// Open Mobile Menu:
if (mobMenuBtn) {
  mobMenuBtn.addEventListener("click", () => {
    mobMenu.style.display = "flex";
    overlay.style.display = "block";
  });
}

// Close Mobile Menu:
if (mobMenuItems) {
  mobMenuItems.forEach((e) => e.addEventListener("click", closeMobMenu));
}
if (overlay) {
  overlay.addEventListener("click", closeMobMenu);
}
