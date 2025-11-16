const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

router.post("/generate", auth, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user", // Must be "user" or "model"
            parts: [
              {
                text: message
              }
            ]
          },
          {
            role: "user", // The actual user message
            parts: [{ text: message }]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    console.log("Gemini API Error:", err.response?.data || err);
    res.status(500).json({ error: "Failed to generate response from Gemini" });
  }
});

module.exports = router;
