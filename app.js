const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const AppError = require("./util/appError");
const globalErrorHandler = require("./controllers/errorController");
// Routers:
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

const fs = require("fs");

app.use(compression());
// Pug template engine:
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files:
app.use(express.static(path.join(__dirname, "public")));
// CORS:
app.use(cors());
// Data:
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this id, retry after an hour.",
});
app.use("/api", limiter);
// Prevent parameter pollution:
app.use(hpp());
// Data sanitization against NoSQL query injection:
app.use(mongoSanitize());
// Data sanitization against XSS:
app.use(xss());
// Routes:
app.use("/npzip", (req, res, next) => {
  // Send the zip file:
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=np.zip");

  // Send the existing ZIP file
  const filePath = path.join(__dirname, "public", "np.zip");
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  res.render("error", {
    title: "404 Not Found",
  });
});
app.use(globalErrorHandler);

module.exports = app;
