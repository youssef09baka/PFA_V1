const axios = require("axios");

const generateAnalysis = async (trend) => {
  try {
    // 🔥 sécurité
    if (!trend || !trend.title) {
      return "No trend data available";
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Explain why this trend is growing and give one content idea: ${trend.title}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 7000 // 🔥 ajout
      }
    );

    return response.data?.choices?.[0]?.message?.content || "No AI response";

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    return "AI analysis unavailable";
  }
};

module.exports = { generateAnalysis };