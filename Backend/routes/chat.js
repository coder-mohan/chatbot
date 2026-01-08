const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const azureai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
  defaultQuery: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION,
  },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY,
  },
});

router.post("/generate", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await azureai.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error("Azure OpenAI Error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;
