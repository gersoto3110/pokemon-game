import { useEffect, useReducer } from "react";

import getManyPokemonsUrlApi from "../helpers/getManyPokemonsUrlApi";
import getAllData from "../helpers/getAllData";
import createPokedex from "../helpers/createPokedex";

const initialData = {
  data: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => ({ ...state, ...action });

const useGetManyPokemons = (qty) => {
  const urls = getManyPokemonsUrlApi(qty);

  const [data, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    getAllData(urls)
      .then((newData) => createPokedex(newData))
      .then((newData) => dispatch({ data: newData }))
      .catch((error) => dispatch({ error: error }))
      .finally(() => dispatch({ loading: false }));
  }, [urls]);

  return { ...data };
};

export default useGetManyPokemons;
