const { getTrends } = require("./trendController");

const getFeed = async (req, res) => {
  try {
    // 🔥 récupérer trends (comme base)
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

    // 🔥 transformer en feed
    const feed = trends.map((trend, index) => ({
        id: index + 1,
        title: trend.title,
        score: trend.score,
        analysis: trend.analysis,
        idea: trend.idea,
        source: trend.source,

        // 🔥 NOUVEAU
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 200),
        shares: Math.floor(Math.random() * 100),

        // 🔥 VIRAL SCORE
        viralScore: trend.score + Math.floor(Math.random() * 50),

        createdAt: new Date()
    }));

    res.status(200).json(feed);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFeed };