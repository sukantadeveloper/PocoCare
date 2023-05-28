const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/User.Model");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

// User registration
const Register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await User.create(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res?.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const AccessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "5s",
      }
    );
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    try {
      await User.findOneAndUpdate({ email }, { refreshToken }, { new: true });
    } catch (error) {
      console.log(error);
    }

    res.json({ AccessToken: AccessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { Register, Login };
