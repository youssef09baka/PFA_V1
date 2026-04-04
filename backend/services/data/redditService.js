const axios = require("axios");
const {
  cleanTitle,
  isRelevant,
  isGoodContent,
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
      const response = await axios.get(url);
      allPosts = allPosts.concat(response.data.data.children);
    }

    const trends = allPosts
      .map((post) => {
        const data = post.data;

        const cleanedTitle = cleanTitle(data.title);
        if (!cleanedTitle) return null;

        if (!isRelevant(cleanedTitle)) return null;

        if (!isGoodContent(cleanedTitle)) return null;

        return {
          title: cleanedTitle,
          popularity: data.score,
          growth: data.num_comments,
          source: "reddit",
          link: `https://reddit.com${data.permalink}`,
        };
      })
      .filter(Boolean);

    return trends;
  } catch (error) {
    console.error("Reddit fetch error:", error.message);
    return [];
  }
};

module.exports = { getRedditTrends };