import getAttacksPerPokemon from "./getAttacksPerPokemon";

export default async function createPlayer(pokemon) {
  const { attacks: urls, ...updatePokemon } = pokemon;
  const attacks = await getAttacksPerPokemon(urls);

  const stats = updatePokemon.stats.reduce((acc, stat) => {
    acc[stat.name] = stat.baseStat;
    return acc;
  }, {});

  stats.maxHp = stats.hp;

  const pokemonPlayer = {
    ...updatePokemon,
    stats: stats,
  };

  return { attacks, pokemon: pokemonPlayer };
}
