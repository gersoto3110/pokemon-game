import "./FrontCard.css";

import formatNamePokemon from "../../../utils/formatNamePokemon";
import formatNumberPokemon from "../../../utils/formatNumberPokemon";

const FrontCard = ({ number, name, imgUrl }) => {
  return (
    <>
      <img className="pkm-img" src={imgUrl} alt={`pokemon-${name}-imagen`} />
      <span className="pkm-number">{formatNumberPokemon(number)}</span>
      <h3 className="pkm-name">{formatNamePokemon(name)}</h3>
    </>
  );
};

export default FrontCard;
