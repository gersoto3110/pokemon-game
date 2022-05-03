import "./Pokemons.css"

import PokemonCard from "../PokemonCard/PokemonCard";

const Pokemons = ({ pokemons }) => {
  return (
    <div className="pokemons">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default Pokemons;