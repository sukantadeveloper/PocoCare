const express = require("express");
const app = express();
const cors = require("cors");
const authMiddleware = require("./Middlewares/authMiddleware");
const ConnectionFn = require("./config/db");
const AuthRoute = require("./Router/Auth.router");
const RefreshRouter = require("./Controller/Refresh.controller");
app.use(express.json());
app.use(cors());

app.use("/", AuthRoute);
app.use("/", RefreshRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Poco Care API");
});
app.get("*", (req, res) => {
  res.send("Not Found");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected resource accessed successfully" });
});

app.listen(5000, () => {
  ConnectionFn();
  console.log("Server started on port 3000");
});
