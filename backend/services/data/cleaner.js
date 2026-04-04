// FINAL CLEANER — stable pour PFA

const KEYWORDS = [
  "ai",
  "startup",
  "business",
  "tech",
  "saas",
  "automation",
];

// contenu à supprimer
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
];

// nettoyage simple
const cleanTitle = (title) => {
  if (!title) return null;

  let t = title;

  t = t.replace(/\[.*?\]/g, "");
  t = t.replace(/[^a-zA-Z0-9\s]/g, "");
  t = t.trim().replace(/\s+/g, " ");

  if (t.length < 25) return null;

  return t;
};

// vérifier pertinence
const isRelevant = (title) => {
  const t = title.toLowerCase();
  return KEYWORDS.some((k) => t.includes(k));
};

// filtrage qualité
const isGoodContent = (title) => {
  const t = title.toLowerCase();

  if (BAD_PATTERNS.some((bad) => t.includes(bad))) return false;

  if (title.includes("?")) return false;

  return true;
};

module.exports = { cleanTitle, isRelevant, isGoodContent };