const { getRedditTrends } = require("./redditService");

const test = async () => {
  const trends = await getRedditTrends();
  console.log(trends);
};

test();