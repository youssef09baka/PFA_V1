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

        // CLEAN
        title = title
          .replace(/\[.*?\]/g, "")
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .trim()
          .replace(/\s+/g, " ");

        if (title.length < 25) return null;

        const lower = title.toLowerCase();

        // KEYWORDS
        if (
          !["ai", "startup", "business", "tech"].some((k) =>
            lower.includes(k)
          )
        ) return null;

        // BAD CONTENT
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

        // ULTRA CLEAN FINAL
        if (
          title.includes("?") ||
          lower.startsWith("what") ||
          lower.startsWith("how") ||
          lower.startsWith("why") ||
          lower.startsWith("anyone") ||
          lower.startsWith("something") ||
          lower.startsWith("people") ||
          lower.startsWith("feels") ||
          lower.startsWith("do you") ||
          lower.startsWith("would you") ||
          lower.includes("who") ||
          lower.includes("i will")
        ) return null;

        return {
          title,
          popularity: post.data.score,
          growth: post.data.num_comments,
          source: "reddit",
          link: `https://reddit.com${post.data.permalink}`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const scoreA = a.popularity * 0.7 + a.growth * 0.3;
        const scoreB = b.popularity * 0.7 + b.growth * 0.3;
        return scoreB - scoreA;
      })
      .slice(0, 6);

    return trends;
  } catch (err) {
    console.error("Reddit error:", err.message);
    return [];
  }
};

module.exports = { getRedditTrends };