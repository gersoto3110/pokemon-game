import "./Selection.css";

import { useContext } from "react";
import { PokedexContext } from "../../contexts/Pokedex";
import { usePaginate, useSearch } from "../../hooks";
import {
  Pokemons,
  Loading,
  TypesSelection,
  SearchInput,
  Pagination,
} from "../../components";
import itemsPerPagePerMatchMedia from "../../helpers/itemsPerPagePerMatchMedia";

const Selection = ({ startBattle }) => {
  const { pokedex, error, loading } = useContext(PokedexContext);

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

  const handleInputText = (e) => {
    if (currentPage > 1) handleFirstPage();
    setSearch(e.target.value.toLowerCase());
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
            startBattle={startBattle}
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
