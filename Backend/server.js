require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(express.json());
app.use(cors());

// CORS setup: allow frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL, // e.g., https://chatbot-meqq.vercel.app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () =>
  console.log("🚀 Backend running on port", process.env.PORT)
);
