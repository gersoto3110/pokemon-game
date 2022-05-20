import { createContext } from "react";
import createPokedex from "../../helpers/createPokedex";
import getManyPokemonsUrlApi from "../../helpers/getManyPokemonsUrlApi";
import useGetAllData from "../../hooks/useGetAllData";

const PokedexContext = createContext();

const PokedexProvider = ({ children, number = 151 }) => {
  const urls = getManyPokemonsUrlApi(number);
  const { data, error, loading } = useGetAllData(urls);

  const contextValue = { pokedex: createPokedex(data), error, loading };

  return (
    <PokedexContext.Provider value={contextValue}>
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContext };
export default PokedexProvider;
