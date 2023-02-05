import axios from "axios";
import { alert } from "./alert";

const signupBtn = document.querySelector(".signup-btn");
// Signup:
export const signup = async (e) => {
  e.preventDefault();
  signupBtn.innerHTML = "Signing up...";
  signupBtn.disabled = true;
  const name = document.querySelector(".signup-name").value;
  const email = document.querySelector(".signup-email").value;
  const password = document.querySelector(".signup-password").value;
  const data = { name, email, password };
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Signed up successfully");
      setTimeout(() => {
        document.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    signupBtn.innerHTML = "Sign up";
    signupBtn.disabled = false;
    alert("error", err.response.data.message);
  }
};

// Login:
const loginBtn = document.querySelector(".login-btn");

export const login = async (e) => {
  e.preventDefault();
  loginBtn.innerHTML = "Logging in...";
  loginBtn.disabled = true;
  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-password").value;
  const data = { email, password };
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Logged in successfully");
      setTimeout(() => {
        document.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    loginBtn.innerHTML = "Log in";
    loginBtn.disabled = false;
    alert("error", err.response.data.message);
  }
};

// Logout:
export const logout = async (e) => {
  e.preventDefault();
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      alert("success", "Logged out successfully");
      setTimeout(() => {
        location.reload(true);
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    alert("error", "Error logging out! Please Try again.");
  }
};

// Change Password:
export const changePassword = async (e) => {
  e.preventDefault();
  const curPassword = document.querySelector(".cur-pass").value;
  const newPassword = document.querySelector(".new-pass").value;
  const confPassword = document.querySelector(".conf-pass").value;
  if (newPassword !== confPassword) {
    return alert("error", "Passwords do not match");
  }
  const data = { curPassword, newPassword };
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/account/password",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Your password has been updated successfully");
      setTimeout(() => {
        location.assign("/profile");
      }, 1500);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

// Delete Account:
export const deleteAccount = async (e) => {
  e.preventDefault();
  const password = document.querySelector(".del-password").value;
  try {
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/users/account",
      data: { password },
    });
    alert("success", "Your account has been deleted successfully");
    setTimeout(() => {
      logout(e);
    }, 1000);
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

// Contact:
export const contact = async (e) => {
  e.preventDefault();
  const name = document.querySelector(".contact-name").value;
  const email = document.querySelector(".contact-email").value;
  const message = document.querySelector(".contact-message").value;
  const data = { name, email, message };
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/contact",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Message Sent Successfully");
      document.querySelector(".contact-form").reset();
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};
