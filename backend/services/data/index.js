const { getRedditTrends } = require("./redditService");
const { getGoogleTrends } = require("./googleTrendsService");
const { isRelevant } = require("./cleaner"); // 🔥 ajout

// 🔥 cache simple (1 minute)
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 60 * 1000; // 1 min

const getRealTrends = async () => {
  try {
    // 🔥 utiliser cache si dispo
    if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log("DATA: using cache");
      return cache.data;
    }

    let reddit = [];
    let google = [];

    // 🔹 récupérer Reddit
    try {
      reddit = await getRedditTrends();
    } catch (err) {
      console.error("Reddit failed:", err.message);
    }

    // 🔹 récupérer Google
    try {
      google = await getGoogleTrends();
    } catch (err) {
      console.error("Google failed:", err.message);
    }

    // 🔹 sécuriser données
    if (!Array.isArray(reddit)) reddit = [];
    if (!Array.isArray(google)) google = [];

    // 🔥 utiliser cleaner (plus propre)
    const filteredGoogle = google.filter((t) => isRelevant(t.title));

    // 🔥 fusion
    let trends = [...reddit, ...filteredGoogle];

    // 🔥 fallback si vide
    if (trends.length === 0) {
      console.warn("DATA: no trends found, returning fallback");
      return [
        {
          title: "AI tools for productivity",
          popularity: 50,
          growth: 10,
          source: "fallback",
          link: "",
        },
      ];
    }

    // 🔥 limiter résultats
    trends = trends.slice(0, 15);

    // 🔥 log
    console.log("DATA: trends fetched:", trends.length);

    // 🔥 sauvegarder cache
    cache = {
      data: trends,
      timestamp: Date.now(),
    };

    return trends;
  } catch (error) {
    console.error("DATA ERROR:", error.message);

    // 🔥 fallback global
    return [
      {
        title: "AI market trends",
        popularity: 40,
        growth: 5,
        source: "fallback",
        link: "",
      },
    ];
  }
};

module.exports = { getRealTrends };