const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const validate = require("../middlewares/validatorMiddleware");
const verifyToken = require("../middlewares/verifyToken");
const refreshToken = require("../middlewares/refreshToken");

// Route for creating a new User
router.post(
  "/register",
  validate(userValidator.signupSchema),
  userController.createUser
);
// Route for logging in the user
router.post(
  "/login",
  validate(userValidator.loginSchema),
  userController.loginUser
);

router.get("/user", verifyToken, userController.getUser);
router.get("/refresh", refreshToken, verifyToken, userController.getUser);
router.post("/logout", verifyToken, userController.logoutUser);
module.exports = router;
