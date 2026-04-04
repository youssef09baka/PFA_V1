// Cleaner ULTRA PRO

const KEYWORDS = [
  "ai",
  "artificial intelligence",
  "startup",
  "business",
  "money",
  "marketing",
  "tech",
  "saas",
  "automation",
  "online",
];

// mots à exclure
const BAD_WORDS = [
  "accused",
  "sexual",
  "lawsuit",
  "politics",
  "bernie",
  "trump",
  "democrat",
  "republican",
  "war",
  "crime",
  "kill",
  "threat",
  "slams",
  "loser",
  "drama",
  "gossip",
  "ama",
  "help me",
  "anyone else",
  "do you",
  "question",
];

// 🔹 Nettoyage
const cleanTitle = (title) => {
  if (!title) return null;

  let cleaned = title;

  cleaned = cleaned.replace(/\[.*?\]/g, "");
  cleaned = cleaned.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
    ""
  );

  cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, "");
  cleaned = cleaned.trim().replace(/\s+/g, " ");

  if (cleaned.length < 20) return null;

  return cleaned;
};

// 🔹 pertinence
const isRelevant = (title) => {
  const lower = title.toLowerCase();
  return KEYWORDS.some((k) => lower.includes(k));
};

// 🔹 qualité stricte
const isGoodContent = (title) => {
  const lower = title.toLowerCase();

  // exclure contenu toxique / inutile
  if (BAD_WORDS.some((bad) => lower.includes(bad))) return false;

  // exclure questions
  if (title.endsWith("?")) return false;

  // exclure phrases faibles
  if (lower.startsWith("how") || lower.startsWith("why")) return false;

  return true;
};

module.exports = { cleanTitle, isRelevant, isGoodContent };