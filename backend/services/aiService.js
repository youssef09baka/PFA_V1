const axios = require("axios");

// 🔥 ancienne version (utile en fallback)
const generateAnalysis = async (trend) => {
  try {
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
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    return "AI analysis unavailable";
  }
};

// 🔥 VERSION OPTIMISÉE (BATCH)
const generateBatchAnalysis = async (trends) => {
  try {
    const titles = trends.map((t, i) => `${i + 1}. ${t.title}`).join("\n");

    const prompt = `
Return ONLY valid JSON.

Format:
[
 { "analysis": "...", "idea": "..." }
]

Trends:
${titles}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    console.log("AI RAW:", text);

    // 🔥 extraire JSON même si l’IA ajoute du texte
    const jsonMatch = text.match(/\[[\s\S]*\]/);

    if (!jsonMatch) throw new Error("No JSON found");

    const parsed = JSON.parse(jsonMatch[0]);

    return trends.map((trend, i) => ({
      ...trend,
      analysis: parsed[i]?.analysis || "No analysis",
      idea: parsed[i]?.idea || "No idea"
    }));

  } catch (error) {
    console.error("AI BATCH ERROR:", error.message);
    return trends;
  }
};

module.exports = { generateAnalysis, generateBatchAnalysis };