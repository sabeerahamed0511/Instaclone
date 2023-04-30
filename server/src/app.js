require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.text({ limit: '200mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));

app.use("/", authRouter);
app.use("/", postRouter);

module.exports = app;