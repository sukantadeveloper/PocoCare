const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { RefreshTokenGenerator } = require("../Controller/Refresh.controller");
dotenv.config();

function authMiddleware(req, res, next) {
  const AccessToken = req.headers.authorization;

  if (!AccessToken) {
    return res.status(401).json({ message: "No AccessToken provided" });
  }

  try {
    const decodedToken = jwt.verify(AccessToken, process.env.ACCESS_TOKEN);
    //  console.log(decodedToken, jwt.verify(AccessToken, process.env.ACCESS_TOKEN));
    req.user = decodedToken.email;
    //console.log(req.user + "hle" + decodedToken.email);
    next();
  } catch (error) {
    console.error("Error verifying AccessToken:", error);
    res?.status(401).json({ message: "Invalid AccessToken" });
  }
}

module.exports = authMiddleware;
