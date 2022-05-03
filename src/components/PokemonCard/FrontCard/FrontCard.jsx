import "./FrontCard.css";

import formatNamePokemon from "../../../helpers/formatNamePokemon";
import formatNumberPokemon from "../../../helpers/formatNumberPokemon";

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
