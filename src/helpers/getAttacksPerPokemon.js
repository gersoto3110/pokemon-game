import axios from "axios";

function mapAttacks(data) {
  if (!data) return [];
  
  return data
    .map((m) => ({
      name: m["names"].filter((l) => l["language"]["name"] === "es")[0]["name"],
      accuracy: m["accuracy"],
      power: m["power"],
      damageClass: m["damage_class"]["name"],
      type: m["type"]["name"],
    }))
}

export default async function getAttacksPerPokemon(urlAttacks, qty = 4) {
  try {
    const attacks = [];
    for (let urlAttack of urlAttacks) {
      let {data: getAttack} = await axios(urlAttack);

      if (getAttack["power"] !== null && getAttack["contest_combos"] === null) {
        attacks.push(getAttack);
      }
      if (attacks.length === qty) break;
    }
    return mapAttacks(attacks);
    
  } catch (error) {
    throw error
  }
}