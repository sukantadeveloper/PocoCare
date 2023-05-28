const express = require("express");
const app = express();
const cors = require("cors");
const authMiddleware = require("./Middlewares/authMiddleware");
const ConnectionFn = require("./config/db");
const AuthRoute = require("./Router/Auth.router");
const RefreshRouter = require("./Controller/Refresh.controller");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    origin: true,
  })
);

const allowedOrigins = ["http://localhost:3000"];

app.use(function (req, res, next) {
  let origin = req.headers.origin;
  console.log(origin);
  if (allowedOrigins.includes(origin)) {
    console.log(`Allowed Origin : ${origin}`);
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use("/", AuthRoute);

app.use("/", RefreshRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Poco Care API");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected resource accessed successfully" });
});

app.listen(5000, () => {
  ConnectionFn();
  console.log("Server started on port 3000");
});
