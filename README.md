# RPG-Loot-Store---Full-Project-Archive

RPG Loot Store - Full Project Archive

## ✅ Project Overview

A dynamic, procedurally generated RPG loot item generator and storefront that:

* Generates 1 randomized item per click
* Uses rarity tiers to determine stat allocation, buffs, skills, and naming
* Integrates a naming system based on stat weight, effects, and style
* Built for visual output (Netlify-ready), print use (via Gelato API), and player account systems (future)

---

## 🎯 Core Systems Implemented

### 1. Rarity Tiers

Each item has one of 6 rarities:

* **Common** (Grey)
* **Uncommon** (Green)
* **Rare** (Blue)
* **Epic** (Purple)
* **Legendary** (Gold)
* **Unique** (Orange)

### 2. Stat Allocation Per Rarity

```
Common:     3 random stats + 30% chance to get 1 of (buff | skill | unique) — 1–3% value
Uncommon:   4 random stats + 30% chance to get 1 of (buff | skill | unique) — 1–3% value
Rare:       5 random stats + 1 unique stat + 30% chance to get 1 of (buff | skill) — 4% value
Epic:       6 random stats + 2 unique stats + 30% chance to get 1 buff — 5% value
Legendary:  7 random stats + 3 unique stats + 1 buff + 1 skill
Unique:     8 random stats + 4 unique stats + 2 buffs + 2 skills
```

* All stats scale with **refinement level** (+0 to +10), except for %-based or fixed effects.

### 3. Refinement Level System

* +0 (default)
* +1 to +10 appended to item name (e.g., *"Blade of Ice +4"*)
* Stat multiplier increases based on refine level:

  * e.g., +2 = +4%, +10 = +50% (on non-% stats)

### 4. Jackpot Mechanic 🎰

* **Common items** have a 0.5%–1% chance to roll **Unique-tier stat values**
* Triggers visual cue & special label

### 5. Naming System

* Based on naming-db.json
* Factors:

  * Rarity descriptors (10 per tier)
  * Primary stat-based descriptors (Strength, Dexterity, etc.)
  * Job suffixes (e.g., "of the Berserker") tied to primary stat
  * Conditional effect subtitles (e.g., "of Burn") based on actual skill/effect present
  * Naming weight formats ("\[General] \[Item]", "\[Item] of \[Effect]", etc.)

---

## 🧠 Dynamic Naming System Logic

* Names generated from templates with weighted probabilities per rarity
* Tied to stat dominance and actual presence of skills/effects
* Example:

  * If item has fire-based skill: eligible for “of Burn”, “of Inferno”
  * If highest stat is Strength: prefix like “Crushing” and suffix like “of the Berserker”

---

## 💾 Files in Current System

* `index.html` – layout with generate button + single item view
* `styles.css` – styled for dark background and rarity colors
* `script.js` – core item generator logic (modular)
* `naming-db.json` – expanded and dynamic naming definitions

---

## 🛠️ Next Features (To-Do List)

### 🔜 Next Steps

* [ ] Finish expanded naming-db.json (more descriptors, effect subtitle mapping)
* [ ] Refactor script.js to ensure no stat duplication
* [ ] Improve stat ranges per rarity tier for better stat gaps
* [ ] Sync Netlify live testing with public GitHub repo
* [ ] Implement basic customer collection log
* [ ] Add export-to-image + send-to-print (Gelato API integration)

### ✅ Completed

* ✅ Item generation logic (single item only)
* ✅ Rarity scaling system with full logic
* ✅ Jackpot mechanic with visual cue
* ✅ Refinement level system (with scaling multiplier)
* ✅ Naming system v1 (dynamic, stat-tied)
* ✅ Buffs + skills for Common/Uncommon (30% chance, capped values)
* ✅ Public GitHub repo + Netlify deployment

### 🔧 Refinement Opportunities

* 🔧 Naming system variation logic: randomness of job suffix
* 🔧 Buff/skill stat formatting (consistency: % vs flat)
* 🔧 Dynamic image generation (future AI pixel art per stat)
* 🔧 UI polish and animations (tooltip on hover, rarity animation, etc.)

---

## 🔐 Repository Notes

* GitHub repo now public ✅
* JSON fetch working correctly via `/naming-db.json`
* Netlify site functioning properly

---

> Keep this document in your GitHub repo or local archive as your master design file. Update with each system milestone.
