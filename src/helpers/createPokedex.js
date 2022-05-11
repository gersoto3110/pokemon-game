export default function createPokedex(data) {
  if (!data) return [];
  return data.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    imgUrl: pokemon.sprites.other.dream_world.front_default,
    types: pokemon.types.map((e) => e.type.name),
    stats: pokemon.stats.map((e) => ({
      name: e.stat.name,
      baseStat: e.base_stat,
    })),
    attacks: pokemon.moves
      .filter((m) => m["version_group_details"][0]["level_learned_at"] < 5)
      .map((m) => m["move"]["url"]),
  }));
}
