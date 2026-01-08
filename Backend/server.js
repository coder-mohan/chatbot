require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ===== Middleware ===== */
app.use(express.json());

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,  
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ===== MongoDB ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ===== Routes ===== */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

/* ===== Server ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
