const { getRedditTrends } = require("./redditService");
const { getGoogleTrends } = require("./googleTrendsService");

const getRealTrends = async () => {
  const reddit = await getRedditTrends();
  const google = await getGoogleTrends();

  const filteredGoogle = google.filter(t => {
    const title = t.title.toLowerCase();
    return (
      title.includes("ai") ||
      title.includes("tech") ||
      title.includes("business") ||
      title.includes("startup")
    );
  });

  const allTrends = [...reddit, ...filteredGoogle];

  return allTrends
    .sort((a, b) => {
      const scoreA = a.popularity * 0.7 + a.growth * 0.3;
      const scoreB = b.popularity * 0.7 + b.growth * 0.3;
      return scoreB - scoreA;
    })
    .slice(0, 10);
};

module.exports = { getRealTrends };