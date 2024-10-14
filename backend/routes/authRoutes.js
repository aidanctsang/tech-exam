const authController = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.post("/logout", authController.Logout);

router.get("/home", authenticate, (req, res) => {
  res.json({
    success: true,
    username: req.user.username,
  });
});

module.exports = router;
