require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.SERPAPI_KEY;

const getGoogleTrends = async () => {
  try {
    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google_trends_trending_now",
          geo: "US",
          api_key: API_KEY,
        },
      }
    );

    const rawTrends = response.data.trending_searches || [];

    return rawTrends.slice(0, 5).map((trend) => ({
      title: trend.query,
      popularity: Math.floor(Math.random() * 50000), // 🔥 plus faible que reddit
      growth: Math.floor(Math.random() * 50),
      source: "google",
      link: "",
    }));
  } catch (error) {
    console.error("Google Trends error:", error.response?.data || error.message);
    return [];
  }
};

module.exports = { getGoogleTrends };