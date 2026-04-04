const { getRealTrends } = require("./index");

(async () => {
  const trends = await getRealTrends();
  console.log(trends);
})();