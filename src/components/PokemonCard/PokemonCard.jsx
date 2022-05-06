import "./PokemonCard.css";

import { useState } from "react";

import Wrapper from "./Wrapper/Wrapper";
import BackCard from "./BackCard/BackCard";
import FrontCard from "./FrontCard/FrontCard";

import colorsTypePokemon from "../../constants/colorsTypePokemon";

const PokemonCard = ({ pokemon, startBattle }) => {
  const [flipped, setFlipped] = useState(false);

  const handlerFlipped = () => setFlipped(!flipped);

  return (
    <article
      className="pkm-card"
      onMouseEnter={handlerFlipped}
      onMouseLeave={handlerFlipped}
    >
      <Wrapper
        transform={flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
        zIndex="2"
        backgroundColor={colorsTypePokemon.light[pokemon.types[0]]}
      >
        <FrontCard
          number={pokemon.id}
          name={pokemon.name}
          imgUrl={pokemon.imgUrl}
        />
      </Wrapper>

      <Wrapper
        transform={flipped ? "rotateY(0deg)" : "rotateY(-180deg)"}
        backgroundColor={colorsTypePokemon.dark[pokemon.types[0]]}
      >
        <BackCard stats={pokemon.stats} />
        <button onClick={() => startBattle()} className="btn-start-battle">
          ¡Yo te elijo!
        </button>
      </Wrapper>
    </article>
  );
};

export default PokemonCard;
