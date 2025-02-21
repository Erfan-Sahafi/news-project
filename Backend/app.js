const express = require("express");
const path = require("path");
const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const newsRouter = require("./routes/v1/news");
const cors = require("cors");

const app = express();
app.use(
  "/news/covers",
  express.static(path.join(__dirname, "public", "news", "covers"))
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/news", newsRouter);


module.exports = app;
