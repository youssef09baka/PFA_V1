const express = require("express");
const router = express.Router();

const { getFeed } = require("../controllers/feedController");

// 🔥 IMPORTANT : import direct
const { protect } = require("../middleware/authMiddleware");

console.log("protect:", protect);

// 🔥 route protégée
router.get("/", protect, getFeed);

module.exports = router;