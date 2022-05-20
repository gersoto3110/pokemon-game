import { useContext } from "react";
import { GameBattleContext } from "./GameBattleProvider"

export default function useGameBattle() {
  return useContext(GameBattleContext)
}