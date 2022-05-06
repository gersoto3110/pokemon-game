import "./Pokemons.css";

import PokemonCard from "../PokemonCard/PokemonCard";

const Pokemons = ({ pokemons, style, startBattle }) => {
  return (
    <div className="pokemons" style={style}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          startBattle={startBattle}
        />
      ))}
    </div>
  );
};

export default Pokemons;
