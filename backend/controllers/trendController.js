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

    // 🔥 1. Ajouter score
    trends = trends.map(trend => ({
      ...trend,
      score: trend.popularity + trend.growth
    }));

    // 🔥 2. Trier par score (du plus grand au plus petit)
    trends.sort((a, b) => b.score - a.score);

    res.status(200).json(trends);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrends };