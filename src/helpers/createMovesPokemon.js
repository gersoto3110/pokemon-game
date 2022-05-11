export default function createMovesPokemon(data) {
  if (!data) return [];
  
  return data
    .filter((m) => m["power"] !== null && m["contest_combos"] === null)
    .map((m) => ({
      name: m["names"].filter((l) => l["language"]["name"] === "es")[0]["name"],
      accuracy: m["accuracy"],
      power: m["power"],
      damageClass: m["damage_class"]["name"],
      type: m["type"]["name"],
    }))
    .slice(0, 4);
}
