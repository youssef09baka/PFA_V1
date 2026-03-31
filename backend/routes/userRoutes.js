const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { registerUser, loginUser, updatePreferences } = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/preferences", protect, updatePreferences);
module.exports = router;

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});