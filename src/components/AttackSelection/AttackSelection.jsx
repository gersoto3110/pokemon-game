import "./AttackSelection.css";

import colorsTypePokemon from "../../constants/colorsTypePokemon";

const AttackSelection = ({ style, attacks, handleOnClick }) => {
  return (
    <div className="attack-selection" style={style}>
      {attacks?.map((a, i) => (
        <button
          className="attack"
          key={i}
          value={JSON.stringify(a)}
          onClick={(e) => handleOnClick(e)}
          style={{
            "--color": colorsTypePokemon.light[a.type]
          }}
        >
          {a.name}
        </button>
      ))}
    </div>
  );
};

export default AttackSelection;
