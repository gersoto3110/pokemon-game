import colorsTypePokemon from "../../../constants/colorsTypePokemon"
import "./PokemonTypeSelection.css"

const PokemonTypeSelection = ({type, current, setCurrent, handleFirstPage }) => {
  let active = type === current

  const style = {
    "--color": colorsTypePokemon.dark[type],
    "--opacity": active ? "1": ".6",
    "--scale": active ? "1.2" : "",
  }
  
  const handleClick = () => {
    if (active) setCurrent(null)
    else setCurrent(type)
    handleFirstPage();
  }

  return (
    <button className="pkm-type" style={style} onClick={() => handleClick()}>
      <img src={`/img/pkm-type-icons/${type}.svg`} alt={`${type}`} />
    </button>
  )
}

export default PokemonTypeSelection