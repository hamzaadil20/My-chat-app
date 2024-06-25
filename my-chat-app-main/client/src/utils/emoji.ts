export const astroEmojis = [
  "👾",
  "⭐",
  "🌟",
  "🚀",
  "☄️",
  "🛰️",
  "🌌",
  "🧑‍🚀",
  "👨‍🚀",
  "🌍",
  "🪐",
];

export const getRandomEmoji = () => {
  return astroEmojis[Math.floor(Math.random() * astroEmojis.length)];
};
