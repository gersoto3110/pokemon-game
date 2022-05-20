// import { useState } from "react";
import useGameBattle from "../../contexts/GameBattle/useGameBattle";
import PokedexProvider from "../../contexts/Pokedex/PokedexProvider";
import Battle from "./Battle/Battle"
import Selection from "./Selection/Selection";

const Game = () => {
  const {player, IA} = useGameBattle()

  return (
    <PokedexProvider>
      {!player.pokemon && !IA.pokemon ? (
        <Selection />
      ) : (
        <Battle />
      )}
    </PokedexProvider>
  );
};

export default Game;
