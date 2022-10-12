import "@babel/polyfill";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { alert } from "./alert";
import { signup, login, logout, changePassword, deleteAccount } from "./auth";
import { changeAvatar, updateProfile } from "./profile";
import { createLab, uploadCode } from "./admin";
let socket = io();
const viewCount = document.querySelector(".view-count .count");

// Highlight code:
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre code").forEach((block) => {
    block.style.display = "block";
    hljs.highlightElement(block);
  });
});

// Copy code to clipBoard:
const copyCodeBtn = document.querySelector(".code-copy-btn");
if (copyCodeBtn) {
  copyCodeBtn.addEventListener("click", () => {
    let code = document.querySelector(".code-container").innerText;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("success", "Code copied to Clipboard!");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  });
}
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

// Admin:

// Create Lab:
const createLabForm = document.querySelector(".createLab-form");
if (createLabForm) {
  createLabForm.addEventListener("submit", createLab);
}

// Upload Code:
const uploadCodeForm = document.querySelector(".uploadCode-form");
if (uploadCodeForm) {
  uploadCodeForm.addEventListener("submit", uploadCode);
}

// Code info panel:

const codeInfo = document.querySelector(".code-info-btn");
if (codeInfo) {
  codeInfo.addEventListener("click", (event) => {
    document.querySelector(".code-info").classList.toggle("show");
  });
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
