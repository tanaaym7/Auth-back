const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
// SIGN-UP USER
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const entry = await User.findOne({ email });
    if (entry) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

// LOGIN USER
async function loginUser(req, res) {
  const { email, password } = req.body;

  // CHECKING IF THE USER ALREADY EXISTS
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // CHECKING IF THE PASSWORD IS CORRECT
  const isPasswordCorrect = await existingUser.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: existingUser._id, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.clearCookie("token");
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 60 * 1000), // expire in 10 minutes
  });
  console.log("**login done\n");
  return res.status(200).json({ message: "Sucessfully logged in " });
}

// GET USER
async function getUser(req, res) {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("get user got hit");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
}

// LOGOUT USER
async function logoutUser(req, res) {
  console.log("cookie clearing started");
  const prevToken = req.cookies.token;
  if (!prevToken) {
    return res.status(404).json({ message: "No token found" });
  }
  console.log("deleting..", prevToken);

  res.clearCookie("token");
  console.log("cookie cleared");
  return res.status(200).json({ message: "Successfully logged out" });
}

module.exports = { createUser, loginUser, getUser, logoutUser };
