const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { PORT } = require("./config/config");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});