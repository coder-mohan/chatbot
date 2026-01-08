const express = require("express");
const router = express.Router();
// const axios = require("axios");
const auth = require("../middleware/auth");
const OpenAI = require("openai");


// const GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate", auth, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("OpenAI API Error:", err.message);
    res.status(500).json({
      error: "Failed to generate response from OpenAI",
    });
  }
});



module.exports = router;
