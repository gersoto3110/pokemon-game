export default function createPokedex(data) {
  return data.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    imgUrl: pokemon.sprites.other.dream_world.front_default,
    types: pokemon.types.map((e) => e.type.name),
    stats: pokemon.stats.map((e) => ({
      name: e.stat.name,
      baseStat: e.base_stat,
    })),
  }));
}
