const express = require("express");
const router = express.Router();
const { protectUser } = require("../middlewares/authMiddleware");
const {
  getUser,
  registerUser,
  generateOtp
  // verifyOtp,
} = require("../Controller/userController");

router.post("/register", registerUser);
router.post("/generateOtp", generateOtp);
// router.post("/verifyOtp", verifyOtp);
router.get("/me", protectUser, getUser);

module.exports = router;
