const { getTrends } = require("./trendController");

const getFeed = async (req, res) => {
  try {
    const user = req.user;

    console.log("USER PREF:", user?.preferences);

    // 🔥 récupérer trends
    const fakeReq = {};
    const fakeRes = {
      status: () => ({
        json: (data) => data
      })
    };

    const trends = await new Promise((resolve) => {
      fakeRes.status = () => ({
        json: (data) => resolve(data)
      });

      getTrends(fakeReq, fakeRes);
    });

    // 🔥 NORMALISER préférences (important)
    const preferences = (user?.preferences || []).map(p => p.toLowerCase());

    // 🔥 FILTRAGE INTELLIGENT
    let filteredTrends = trends;

    if (preferences.length > 0) {
      filteredTrends = trends.filter(trend => {
        const title = trend.title.toLowerCase();
        const analysis = trend.analysis.toLowerCase();

        return preferences.some(pref =>
          title.includes(pref) || analysis.includes(pref)
        );
      });
    }

    // 🔥 fallback si aucun match
    const finalTrends = filteredTrends.length > 0 ? filteredTrends : trends;

    // 🔥 transformer en feed
    const feed = finalTrends.map((trend, index) => ({
      id: index + 1,
      title: trend.title,
      score: trend.score,
      analysis: trend.analysis,
      idea: trend.idea,
      source: trend.source,

      // 🔥 engagement
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 200),
      shares: Math.floor(Math.random() * 100),

      // 🔥 viral score
      viralScore: trend.score + Math.floor(Math.random() * 50),

      createdAt: new Date()
    }));

    res.status(200).json(feed);

  } catch (error) {
    console.error("FEED ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFeed };