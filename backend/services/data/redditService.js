const axios = require("axios");
const {
  cleanTitle,
  isRelevant,
  isGoodContent,
  validateTrend,
} = require("./cleaner");

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
      const res = await axios.get(url, { timeout: 5000 });
      allPosts = allPosts.concat(res.data.data.children);
    }

    const trends = allPosts
      .map((post) => {
        let title = cleanTitle(post.data.title);
        if (!title || title.length < 25) return null;

        if (!isRelevant(title)) return null;
        if (!isGoodContent(title)) return null;

        const trend = {
          title,
          popularity: post.data.score || 0,
          growth: post.data.num_comments || 0,
          source: "reddit",
          link: `https://reddit.com${post.data.permalink}`,
        };

        return validateTrend(trend) ? trend : null;
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