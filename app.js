const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./util/appError");
const globalErrorHandler = require("./controllers/errorController");
// Routers:
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

// Pug template engine:
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files:
app.use(express.static(path.join(__dirname, "public")));
// CORS:
app.use(cors());
// Data:
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Routes:
// app.use("/", (req, res, next) => {
//   console.log(req.connection.remoteAddress);
//   next();
// });
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  res.render("error", {
    title: "404 Not Found",
  });
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
