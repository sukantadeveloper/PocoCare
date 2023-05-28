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
    return res.status(401).json({ message: "No refresh AccessToken provided" });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const email = decodedToken.email;

    const isRefreshTokenValid = await checkRefreshTokenValidity(
      email,
      refreshToken
    );

    if (!isRefreshTokenValid) {
      return res.status(401).json({ message: "Invalid refresh AccessToken" });
    }

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing AccessToken:", error);
    res.status(401).json({ message: "Invalid refresh AccessToken" });
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
    // Check if the refresh AccessToken has expired
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      return false; // Refresh AccessToken has expired, invalid refresh AccessToken
    }
    return true;
  } catch (error) {
    console.error("Error checking refresh AccessToken validity:", error);
    return false;
  }
}

module.exports = RefreshRouter;
