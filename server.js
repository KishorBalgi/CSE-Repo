const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const socket = require("socket.io");

// Env config:
dotenv.config({ path: "./config.env" });

// Connect to DB:
const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Server:
const PORT = process.env.PORT || 3000;
const server = app
  .listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    );
  })
  .on("error", (err) => {
    console.log(err);
  });

// const io = socket(server);

// let onlineUsers = 0;
// io.on("connection", (socket) => {
//   onlineUsers++;
//   io.emit("user-count-change", onlineUsers);
//   socket.on("disconnect", () => {
//     onlineUsers--;
//     io.emit("user-count-change", onlineUsers);
//   });
// });
