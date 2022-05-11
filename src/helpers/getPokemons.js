import axios from "axios";
import createMovesPokemon from "./createMovesPokemon";
import createPokedex from "./createPokedex";
import getAllData from "./getAllData";

export default async function getPokemons(urls) {
  try {
    const manyPokemons = await getAllData(urls);

    const pokedex = createPokedex(manyPokemons);

    const pokedexWithMoves = []
    for (let pokemon of pokedex) {
      const attacks = []
      for (let urlAttack of pokemon.attacks) {
        let res = await axios(urlAttack);
        let getAttack = res.data;
        if (getAttack["power"] !== null && getAttack["contest_combos"] === null) {
          attacks.push(getAttack);
        }
        if(attacks.length === 4) break;
      }
      pokedexWithMoves.push({
        ...pokemon,
        attacks: createMovesPokemon(attacks)
      })
    }

    // console.log(pokedexWithMoves)
    // const pokedexWithMoves = Promise.all(pokedex.map(async (pokemon) => {
    //   const getAttacks = await getAllData(pokemon.attacks)
    //   return ({...pokemon, attacks: createMovesPokemon(getAttacks)})
    // }));

    return pokedexWithMoves;

  } catch (error) {
    throw error;
  }  
}