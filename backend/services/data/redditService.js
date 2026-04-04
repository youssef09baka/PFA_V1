const axios = require("axios");

const getRedditTrends = async () => {
  try {
    const urls = [
      "https://www.reddit.com/r/artificial.json?limit=20",
      "https://www.reddit.com/r/startups.json?limit=20",
      "https://www.reddit.com/r/Entrepreneur.json?limit=20",
      "https://www.reddit.com/r/technology.json?limit=20",
    ];

    let allPosts = [];

    for (const url of urls) {
      const res = await axios.get(url);
      allPosts = allPosts.concat(res.data.data.children);
    }

    const trends = allPosts
      .map((post) => {
        let title = post.data.title;
        if (!title) return null;

        // nettoyage
        title = title
          .replace(/\[.*?\]/g, "")
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .trim()
          .replace(/\s+/g, " ");

        if (title.length < 25) return null;

        const lower = title.toLowerCase();

        // 🔹 pertinence
        if (
          !["ai", "startup", "business", "tech"].some((k) =>
            lower.includes(k)
          )
        )
          return null;

        // 🔹 suppression contenu toxique / inutile
        const bad = [
          "trump",
          "bernie",
          "politics",
          "war",
          "sexual",
          "accused",
          "lawsuit",
          "kill",
          "threat",
          "loser",
          "drama",
          "gossip",
          "share",
          "ama",
        ];

        if (bad.some((b) => lower.includes(b))) return null;

        // 🔹 éviter questions / discussions
        if (title.includes("?")) return null;
        if (lower.startsWith("what") || lower.startsWith("how")) return null;

        return {
          title,
          popularity: post.data.score,
          growth: post.data.num_comments,
          source: "reddit",
          link: `https://reddit.com${post.data.permalink}`,
        };
      })
      .filter(Boolean)

      // 🔥 score intelligent
      .sort((a, b) => {
        const scoreA = a.popularity * 0.7 + a.growth * 0.3;
        const scoreB = b.popularity * 0.7 + b.growth * 0.3;
        return scoreB - scoreA;
      })

      // 🔥 top résultats uniquement
      .slice(0, 8);

    return trends;
  } catch (err) {
    console.error("Reddit error:", err.message);
    return [];
  }
};

module.exports = { getRedditTrends };