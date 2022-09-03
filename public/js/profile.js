import axios from "axios";
import { alert } from "./alert";
const randAvatar = () => {
  let r = (Math.random() + 1).toString(36).substring(7);
  return `https://robohash.org/${r}`;
};

export const changeAvatar = () => {
  let profileAvatar = document.querySelector(".profile-avatar-img");
  profileAvatar.src = randAvatar();
};

// Update profile:

export const updateProfile = async (e) => {
  e.preventDefault();
  const name = document.querySelector(".profile-edit-name").value;
  const avatar = document.querySelector(".profile-avatar-img").src;
  const data = { name, avatar };
  console.log(data);
  try {
    const res = await axios({
      url: "/api/v1/users/profile",
      method: "PATCH",
      data,
    });
    if (res.data.status === "success") {
      alert("success", "Profile updated successfully");
      setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    alert("error", err.response.data.message);
  }
};
