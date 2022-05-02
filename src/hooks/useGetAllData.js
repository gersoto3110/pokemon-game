import { useEffect, useReducer, useState } from "react";
import getAllData from "../helpers/getAllData";

const initialData = {
  data: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => ({ ...state, ...action });

const useGetAllData = (urls) => {
  const [data, dispatch] = useReducer(reducer, initialData);

  const [initialUrls] = useState(urls);

  useEffect(() => {
    getAllData(initialUrls)
      .then((newData) => dispatch({ data: newData }))
      .catch((error) => dispatch({error: error}))
      .finally(() => dispatch({ loading: false }));
  }, [initialUrls]);

  return { ...data };
};

export default useGetAllData;
