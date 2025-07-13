// ✅ Updated script.js

let namingData;

fetch("naming-db.json")
  .then((response) => response.json())
  .then((data) => {
    namingData = data;
  })
  .catch((err) => console.error("Failed to load naming-db.json", err));

function generateItem() {
  if (!namingData) {
    alert("Naming data not loaded yet. Please try again in a moment.");
    return;
  }

  const rarityChances = {
    Common: 50,
    Uncommon: 30,
    Rare: 12,
    Epic: 5,
    Legendary: 2.5,
    Unique: 0.5,
  };

  const statRanges = {
    Common: [1, 5],
    Uncommon: [2, 7],
    Rare: [4, 10],
    Epic: [6, 15],
    Legendary: [10, 20],
    Unique: [15, 30],
  };

  const allStats = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Luck",
  ];

  const rarity = weightedRandom(rarityChances);
  const [min, max] = statRanges[rarity];
  const primaryStats = {};
  const numStats = {
    Common: 3,
    Uncommon: 4,
    Rare: 5,
    Epic: 6,
    Legendary: 7,
    Unique: 8,
  }[rarity];

  // Assign primary stats with random values and avoid duplicates
  const selectedStats = shuffleArray([...allStats]).slice(0, numStats);
  selectedStats.forEach((stat) => {
    primaryStats[stat] = getRandomInt(min, max);
  });

  const dominantStat = Object.entries(primaryStats).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  // Bonus stat pool logic
  const bonusStatPool = [];
  const roll = Math.random();

  if (rarity === "Common" || rarity === "Uncommon") {
    if (roll <= 0.3) {
      bonusStatPool.push(randomChoice(["unique", "buff", "skill"]));
    }
  } else if (rarity === "Rare") {
    bonusStatPool.push("unique");
    if (roll <= 0.3) bonusStatPool.push(randomChoice(["buff", "skill"]));
  } else if (rarity === "Epic") {
    bonusStatPool.push("unique", "unique");
    bonusStatPool.push("skill");
    if (roll <= 0.3) bonusStatPool.push("buff");
  } else if (rarity === "Legendary") {
    bonusStatPool.push("unique", "unique", "unique");
    bonusStatPool.push("buff", "skill");
  } else if (rarity === "Unique") {
    bonusStatPool.push("unique", "unique", "unique", "unique");
    bonusStatPool.push("buff", "buff", "skill", "skill");
  }

  // Generate name
  const itemType = randomChoice(["Sword", "Bow", "Staff", "Armor", "Amulet"]);
  const name = generateName(rarity, dominantStat, itemType);

  const lines = [
    `<h2>${name}</h2>`,
    `<p><strong>Rarity:</strong> ${rarity}</p>`,
    `<ul>` +
      Object.entries(primaryStats)
        .map(([k, v]) => `<li>+${v} ${k}</li>`) // stat display
        .join("") +
      `</ul>`
  ];

  if (bonusStatPool.length > 0) {
    lines.push("<p><strong>Special Stats:</strong></p><ul>");
    const used = new Set();
    bonusStatPool.forEach((type) => {
      let stat;
      do {
        stat = generateBonusStat(type);
      } while (used.has(stat));
      used.add(stat);
      lines.push(`<li>${stat}</li>`);
    });
    lines.push("</ul>");
  }

  document.getElementById("item-display").innerHTML = `
    <div class="item ${rarity.toLowerCase()}">
      ${lines.join("\n")}
    </div>`;
}

function generateName(rarity, dominantStat, itemType) {
  const tier = namingData.tables.rarity_info.find((r) => r.rarity_tier === rarity);
  const format = weightedChoice(tier.naming_format_weights);

  let general = randomChoice(tier.general_descriptors);
  let statDesc = randomChoice(namingData.stat_descriptors[dominantStat]);
  let jobTitle = randomChoice(namingData.job_suffixes[dominantStat]);
  let subtitle = "";

  if (format.includes("[Effect]")) {
    const effects = namingData.effect_descriptors.filter(
      (e) => rarityOrder(e.min_rarity) <= rarityOrder(rarity)
    );
    if (effects.length) {
      subtitle = randomChoice(effects.flatMap((e) => e.synonyms));
    }
  }

  return format
    .replace("[General]", general)
    .replace("[StatDesc]", statDesc)
    .replace("[Item]", itemType)
    .replace("[Job]", jobTitle)
    .replace("[Effect]", subtitle);
}

function generateBonusStat(type) {
  if (type === "buff") {
    return `+${getRandomInt(4, 6)}% Area Damage`;
  } else if (type === "skill") {
    return `+${getRandomInt(1, 3)} Summon Skeletons`;
  } else if (type === "unique") {
    return `+${getRandomInt(10, 30)} Elemental Resistance`;
  }
  return "";
}

function weightedRandom(obj) {
  const entries = Object.entries(obj);
  const total = entries.reduce((sum, [, val]) => sum + val, 0);
  let roll = Math.random() * total;
  for (const [key, val] of entries) {
    if (roll < val) return key;
    roll -= val;
  }
}

function weightedChoice(choices) {
  const flat = choices.flatMap(([value, weight]) => Array(weight).fill(value));
  return randomChoice(flat);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rarityOrder(rarity) {
  return ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Unique"].indexOf(rarity);
}
