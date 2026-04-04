const { getRedditTrends } = require("./redditService");
const { getGoogleTrends } = require("./googleTrendsService");

const getRealTrends = async () => {
  const reddit = await getRedditTrends();
  const google = await getGoogleTrends();

  const allTrends = [...reddit, ...google];

  // 🔥 tri final global
  return allTrends.sort((a, b) => {
    const scoreA = a.popularity * 0.7 + a.growth * 0.3;
    const scoreB = b.popularity * 0.7 + b.growth * 0.3;
    return scoreB - scoreA;
  });
};

// TEST
(async () => {
  const trends = await getRealTrends();
  console.log(trends);
})();