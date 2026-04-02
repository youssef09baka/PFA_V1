const getTrends = async (req, res) => {
  try {
    let trends = [
      {
        title: "AI tools for students",
        popularity: 85,
        growth: 20,
        source: "reddit"
      },
      {
        title: "Fitness at home",
        popularity: 70,
        growth: 15,
        source: "google trends"
      },
      {
        title: "Online business ideas 2026",
        popularity: 90,
        growth: 25,
        source: "youtube"
      }
    ];

    // 🔥 score
    trends = trends.map(trend => ({
      ...trend,
      score: trend.popularity + trend.growth
    }));

    // 🔥 tri
    trends.sort((a, b) => b.score - a.score);

    // 🔥 IA SIMULÉE
    trends = trends.map(trend => ({
      ...trend,
      analysis: `The trend "${trend.title}" is growing due to increased demand and online engagement.`,
      idea: `Create content about "${trend.title}" targeting beginners and trending audiences.`
    }));

    res.status(200).json(trends);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrends };