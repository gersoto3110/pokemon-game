import { useState } from "react";
import filteredArray from "../helpers/filteredArray";

const useSearch = (initState, array, keys) => {
  const [search, setSearch] = useState(initState);

  const filterArray = filteredArray(array, keys, search);

  return [search, setSearch, filterArray];
};

export default useSearch;
