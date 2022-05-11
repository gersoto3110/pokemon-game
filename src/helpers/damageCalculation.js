function getRandom(min = 85, max = 100) {
  return Math.floor(Math.random() * (max + 1 - min) + min) / 100;
}

function effectiveDamage(attack, pokemon, rival) {
  const level = 5;

  const key = {
    attack: attack.damageClass === "physical" ? "special-attack" : "attack",
    defense: attack.damageClass === "physical" ? "special-defense" : "defense",
  };

  let levelDamage = Math.floor((2 * level) / 5 + 2);
  let effectiveAttack = Math.floor(
    (levelDamage * attack.power * pokemon[key.attack]) / rival[key.defense]
  );

  return Math.floor(effectiveAttack / 50) + 2;
}

export default function damageCalculation(attack, pokemon, rival) {
  let stab = pokemon.types.includes(attack.type) ? 1.5 : 1;
  let effective = Math.floor(
    effectiveDamage(attack, pokemon, rival) * getRandom()
  );

  return Math.floor(effective * stab);
}
