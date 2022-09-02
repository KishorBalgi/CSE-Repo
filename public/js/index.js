let socket = io();
const viewCount = document.querySelector(".view-count .count");

// Viewer count:
socket.on("user-count-change", function (userCount) {
  viewCount.innerHTML = userCount;
});

// Authentication:
