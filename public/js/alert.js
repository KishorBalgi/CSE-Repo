export const alert = (type, message) => {
  const alert = document.querySelector(".alert");
  alert.style.display = "flex";
  alert.classList.add(`alert--${type}`);
  document.querySelector(".alert-msg").innerHTML = message;
  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(`alert--${type}`);
  }, 3000);
};
