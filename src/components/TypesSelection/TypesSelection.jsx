import "./TypesSelection.css";

import colorsTypePokemon from "../../constants/colorsTypePokemon";
import PokemonTypeSelection from "./PokemonTypeSelection/PokemonTypeSelection";

const TypesSelection = ({ style, current, setCurrent, handleFirstPage }) => {
  return (
    <div className="wrapper-types" style={style}>
      {Object.keys(colorsTypePokemon.light).map((type) => (
        <PokemonTypeSelection
          type={type}
          key={type}
          current={current}
          setCurrent={setCurrent}
          handleFirstPage={handleFirstPage}
        />
      ))}
    </div>
  );
};

export default TypesSelection;
