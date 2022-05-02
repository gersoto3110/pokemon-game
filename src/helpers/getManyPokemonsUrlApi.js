export default function getManyPokemonsUrlApi(number) {
  const urls = [];
  const maxNumberPokemon = 10228

  if (number > maxNumberPokemon) number = maxNumberPokemon

  for (let id = 1; id <= number; id++) {
    urls.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }

  return urls;
}
