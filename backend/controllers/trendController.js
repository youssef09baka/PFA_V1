const { generateBatchAnalysis } = require("../services/aiService");
const { getRealTrends } = require("../services/data");

const getTrends = async (req, res) => {
  try {
    // 🔥 1. DATA RÉELLE
    let trends = await getRealTrends();

    // 🔥 sécurité
    if (!Array.isArray(trends)) trends = [];

    // 🔥 fallback
    if (trends.length === 0) {
      trends = [
        {
          title: "AI tools for productivity",
          popularity: 50,
          growth: 10,
          source: "fallback",
          link: ""
        }
      ];
    }

    // 🔥 limiter (important pour IA)
    trends = trends.slice(0, 5);

    // 🔥 scoring UNIFIÉ
    trends = trends.map(trend => ({
      ...trend,
      score: trend.popularity * 0.7 + trend.growth * 0.3
    }));

    // 🔥 tri
    trends.sort((a, b) => b.score - a.score);

    // 🔥 IA OPTIMISÉE (batch = rapide)
    trends = await generateBatchAnalysis(trends);

    res.status(200).json(trends);

  } catch (error) {
    console.error("TRENDS ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrends };