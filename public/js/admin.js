import axios from "axios";
import { alert } from "./alert";

const createLabBtn = document.querySelector(".createLab-btn");
// Signup:
export const createLab = async (e) => {
  e.preventDefault();
  createLabBtn.innerHTML = "Creating Lab...";
  createLabBtn.disabled = true;
  const name = document.querySelector(".lab-name").value;
  const semester = document.querySelector(".lab-semester").value;
  const data = { name, semester };
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
