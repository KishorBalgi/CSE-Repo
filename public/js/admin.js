import axios from "axios";
import { alert } from "./alert";

const createLabBtn = document.querySelector(".createLab-btn");
// Create Lab:
export const createLab = async (e) => {
  e.preventDefault();
  createLabBtn.innerHTML = "Creating Lab...";
  createLabBtn.disabled = true;
  const name = document.querySelector(".lab-name").value;
  const semester = document.querySelector(".lab-semester").value;
  const info = document.querySelector(".lab-info").value;
  const data = { name, semester, info };
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/admins/createLab",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Lab Created Successfully");
      document.querySelector(".createLab-form").reset();
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
  createLabBtn.innerHTML = "Create";
  createLabBtn.disabled = false;
};

// Upload Code:
const uploadCodeBtn = document.querySelector(".uploadCode-btn");

export const uploadCode = async (e) => {
  e.preventDefault();
  uploadCodeBtn.innerHTML = "Uploading Code...";
  uploadCodeBtn.disabled = true;
  const title = document.querySelector(".code-title").value;
  const lab = document.querySelector(".code-lab").value;
  const code = document.querySelector(".code-content").value;
  const data = { title, lab, code };
  console.log(data);
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/admins/uploadCode",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Code Uploaded Successfully");
      setTimeout(() => {
        location.href = "/labs/codes/" + res.data.codeId;
      }, 500);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
  uploadCodeBtn.innerHTML = "Upload";
  uploadCodeBtn.disabled = false;
};

// Delete Code:
export const deleteCode = async (codeId, labId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/admins/deleteCode/" + codeId,
    });
    if (res.status == 204) {
      alert("success", "Code Deleted Successfully");
      setTimeout(() => {
        location.href = "/labs/" + labId;
      }, 1000);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};

// Delete Lab:
export const deleteLab = async (labId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/admins/deleteLab/" + labId,
    });
    if (res.status == 204) {
      alert("success", "Lab Deleted Successfully");
      setTimeout(() => {
        location.href = "/labs";
      }, 1000);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};
