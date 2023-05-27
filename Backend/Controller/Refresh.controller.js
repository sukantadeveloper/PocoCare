const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Model/User.Model");
dotenv.config();
const RefreshRouter = express.Router();

RefreshRouter.post("/refresh-token", async (req, res) => {
  const email = req.body.email;
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  await User.findOneAndUpdate({ email }, { refreshToken }, { new: true });

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const email = decodedToken.email;

    const isRefreshTokenValid = await checkRefreshTokenValidity(
      email,
      refreshToken
    );

    if (!isRefreshTokenValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

async function checkRefreshTokenValidity(email, refreshToken) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }
    if (user.refreshToken !== refreshToken) {
      return false;
    }
    // Check if the refresh token has expired
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      return false; // Refresh token has expired, invalid refresh token
    }
    return true;
  } catch (error) {
    console.error("Error checking refresh token validity:", error);
    return false;
  }
}

module.exports = RefreshRouter;
