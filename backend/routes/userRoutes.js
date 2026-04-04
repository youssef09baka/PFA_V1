const express = require("express");
const router = express.Router();

// ✅ FIX ICI
const { protect } = require("../middleware/authMiddleware");

const { registerUser, loginUser, updatePreferences } = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/preferences", protect, updatePreferences);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;