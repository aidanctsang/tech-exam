const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { email, password, username, role, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      password: hashedPwd,
      username: username,
      role: role || "user",
      createdAt: createdAt,
    });
    res
      .status(201)
      .json({ success: `New user ${user.username} successfully created!` });
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //compare password in User model and password in the body
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
  }
};

const Logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  Register,
  Login,
  Logout,
};
