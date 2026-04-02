const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const trendRoutes = require("./routes/trendRoutes");

const app = express();

// 🔥 1. Connect DB
connectDB();

// 🔥 2. Middlewares (AVANT routes)
app.use(cors());
app.use(express.json());

// 🔥 3. Routes
app.use("/api/users", userRoutes);

app.use("/api/trends", trendRoutes);

// 🔥 4. Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

// 🔥 5. Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});