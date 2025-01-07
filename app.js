const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const goalRouter = require("./routes/goalRoutes");
const exerciseRouter = require("./routes/exerciseRoutes");
const foodRouter = require("./routes/foodRoutes");
const cookieParser = require("cookie-parser");
const requestLogger = require("./utils/logger");
const unknownEndpoint = require("./utils/Error");
const { URL } = require("./utils/config");
const suggestionRouter = require("./routes/suggestionRoutes");
console.log("This", URL);
app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use("/users", userRouter);
app.use("/goals", goalRouter);
app.use("/exercises", exerciseRouter);
app.use("/foods", foodRouter);
app.use("/suggestions", suggestionRouter);
app.use(unknownEndpoint);

module.exports = app;
