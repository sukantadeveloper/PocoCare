const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { RefreshTokenGenerator } = require("../Controller/Refresh.controller");
dotenv.config();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    //  console.log(decodedToken, jwt.verify(token, process.env.ACCESS_TOKEN));
    req.user = decodedToken.email;
    //console.log(req.user + "hle" + decodedToken.email);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res?.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
