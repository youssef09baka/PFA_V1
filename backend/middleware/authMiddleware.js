const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // vérifier si header existe
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // récupérer token
      token = req.headers.authorization.split(" ")[1];

      // vérifier token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // récupérer user sans password
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;