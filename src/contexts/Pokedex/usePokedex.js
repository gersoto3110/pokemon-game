import { useContext } from "react";
import { PokedexContext } from "./PokedexProvider";

export default function usePokedex () {
  return useContext(PokedexContext);
}