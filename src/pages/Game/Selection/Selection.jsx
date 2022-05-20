import "./Selection.css";

import { usePaginate, useSearch } from "../../../hooks";
import {
  Pokemons,
  Loading,
  TypesSelection,
  SearchInput,
  Pagination,
} from "../../../components";
import itemsPerPagePerMatchMedia from "../../../helpers/itemsPerPagePerMatchMedia";
import usePokedex from "../../../contexts/Pokedex/usePokedex";
import useGameBattle from "../../../contexts/GameBattle/useGameBattle";
import randomSelectItemArray from "../../../helpers/randomSelectItemArray";

const Selection = () => {
  const { pokedex, error, loading } = usePokedex();
  const [currentType, setCurrentType, filterType] = useSearch(
    null,
    pokedex,
    "types"
  );
  const [search, setSearch, pokemons] = useSearch("", filterType, "name");
  const {
    currentItems,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleFirstPage,
  } = usePaginate(pokemons, itemsPerPagePerMatchMedia());

  const { handleSelectedPokemon } = useGameBattle();

  const handleInputText = (e) => {
    if (currentPage > 1) handleFirstPage();
    setSearch(e.target.value.toLowerCase());
  };

  const handleStartBattle = (pokemon) => {
    handleSelectedPokemon(pokemon, randomSelectItemArray(pokedex));
  };

  const nameGridAreas = ["title", "search", "types", "cards", "pag"];

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <>{`${error}`}</>
      ) : (
        <div className="selection">
          <h2 style={{ gridArea: nameGridAreas[0] }}>Seleccionar Pokemon</h2>

          <SearchInput
            placeholder={"Buscar pokemón"}
            value={search}
            onChange={handleInputText}
            style={{ gridArea: nameGridAreas[1] }}
          />
          <TypesSelection
            current={currentType}
            setCurrent={setCurrentType}
            style={{ gridArea: nameGridAreas[2] }}
            handleFirstPage={handleFirstPage}
          />
          <Pokemons
            pokemons={currentItems}
            style={{ gridArea: nameGridAreas[3] }}
            startBattle={handleStartBattle}
          />
          <Pagination
            style={{ gridArea: nameGridAreas[4] }}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      )}
    </>
  );
};

export default Selection;
