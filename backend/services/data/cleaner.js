const KEYWORDS = [
  "ai",
  "startup",
  "business",
  "tech",
  "saas",
  "automation",
];

const BAD_PATTERNS = [
  "accused",
  "sexual",
  "lawsuit",
  "politics",
  "war",
  "kill",
  "help",
  "anyone",
  "do you",
  "how do",
  "why",
  "share",
  "finally",
  "my startup",
  "what",
  "how",
  "people",
  "feels",
  "would you",
];

const cleanTitle = (title) => {
  if (!title) return null;

  return title
    .replace(/\[.*?\]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, " ");
};

const isRelevant = (title) => {
  if (!title) return false; // 🔥 sécurité ajoutée
  const lower = title.toLowerCase();
  return KEYWORDS.some((k) => lower.includes(k));
};

const isGoodContent = (title) => {
  if (!title) return false; // 🔥 sécurité ajoutée
  const lower = title.toLowerCase();
  return !BAD_PATTERNS.some((p) => lower.includes(p));
};

const validateTrend = (trend) => {
  return (
    trend &&
    typeof trend.title === "string" &&
    typeof trend.popularity === "number" &&
    typeof trend.growth === "number" &&
    typeof trend.source === "string" &&
    typeof trend.link === "string"
  );
};

module.exports = {
  cleanTitle,
  isRelevant,
  isGoodContent,
  validateTrend,
};