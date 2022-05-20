import { createContext, useEffect, useReducer } from "react";
import players from "../../constants/players";
import createPlayer from "../../helpers/createPlayer";
import damageCalculation from "../../utils/damageCalculation";

const GameBattleContext = createContext();

const initBattle = {
  [players.player]: {
    pokemon: null,
    attacks: null,
  },
  [players.IA]: {
    pokemon: null,
    attacks: null,
  },
  gameOver: false,
  result: "",
  loading: true,
  error: null,
};

const types = {
  reduceHp: "REDUCE_HEALTH",
  selectedPokemon: "SELECTED_POKEMON",
  updatePlayer: "UPDATE_PLAYER",
  updateResult: "UPDATE_RESULT",
  resetBattle: "RESET_BATTLE",
  isNotLoading: "IS_NOT_LOADING",
  error: "ERROR",
};

function reducer(prevState, action) {
  let prevData;
  switch (action.type) {
    case types.selectedPokemon:
      return {
        ...prevState,
        [action.payload.key]: {
          ...prevState[action.payload.key],
          pokemon: action.payload.pokemon,
        },
      };
    case types.isNotLoading:
      return {
        ...prevState,
        loading: false,
      };
    case types.error:
      return {
        ...prevState,
        error: action.payload,
      };
    case types.reduceHp:
      let newHp =
        prevState[action.payload.key].pokemon.stats.hp -
        action.payload.damageReceived;
      prevData = prevState[action.payload.key];
      return {
        ...prevState,
        [action.payload.key]: {
          ...prevData,
          pokemon: {
            ...prevData.pokemon,
            stats: {
              ...prevData.pokemon.stats,
              hp: newHp < 0 ? 0 : newHp,
            },
          },
        },
      };
    case types.updatePlayer:
      return {
        ...prevState,
        [action.payload.key]: {
          ...prevState[action.payload.key],
          pokemon: action.payload.player.pokemon,
          attacks: action.payload.player.attacks,
        },
      };
    case types.updateResult:
      return {
        ...prevState,
        result: action.payload,
        gameOver: true,
      };
    case types.resetBattle:
      return {
        ...initBattle,
      };
    default:
      return prevState;
  }
}

const GameBattleProvider = ({ children }) => {
  const [battle, dispatch] = useReducer(reducer, initBattle);

  useEffect(() => {
    if (!battle[players.player].pokemon && !battle[players.IA].pokemon) return;

    if (battle[players.player].attacks && battle[players.IA].attacks) return;

    const uploadPlayers = async () => {
      try {
        const player = await createPlayer(battle[players.player].pokemon);
        const rival = await createPlayer(battle[players.IA].pokemon);

        dispatch({
          type: types.updatePlayer,
          payload: { key: players.player, player: player },
        });

        dispatch({
          type: types.updatePlayer,
          payload: { key: players.IA, player: rival },
        });
      } catch (error) {
        dispatch({
          type: types.error,
          payload: error,
        });
      } finally {
        dispatch({
          type: types.isNotLoading,
        });
      }
    };

    uploadPlayers();
  }, [battle, battle.player, battle.IA]);

  const isGameOver = (damageReceivedPokePlayer, damageReceivedPokeIA) => {
    if (
      battle.player.pokemon.stats.hp - damageReceivedPokePlayer <= 0 &&
      battle.IA.pokemon.stats.hp - damageReceivedPokeIA <= 0
    ) {
      dispatch({
        type: types.updateResult,
        payload: "Empate",
      });
    } else if (battle.player.pokemon.stats.hp - damageReceivedPokePlayer <= 0) {
      dispatch({ type: types.updateResult, payload: "Perdiste" });
    } else if (battle.IA.pokemon.stats.hp - damageReceivedPokeIA <= 0) {
      dispatch({ type: types.updateResult, payload: "Ganaste" });
    }
  };

  const reduceHp = (player, attackReceived) => {
    const rival = players.player === player ? players.IA : players.player;

    const damageReceived = damageCalculation(
      attackReceived,
      battle[rival].pokemon,
      battle[player].pokemon
    );

    dispatch({
      type: types.reduceHp,
      payload: { key: player, damageReceived },
    });

    return damageReceived;
  };

  const handleSelectedPokemon = (pokemon, rivalPokemon) => {
    dispatch({
      type: types.selectedPokemon,
      payload: { key: players.player, pokemon },
    });

    dispatch({
      type: types.selectedPokemon,
      payload: { key: players.IA, pokemon: rivalPokemon },
    });
  };

  const handleResetBattle = () => {
    dispatch({ type: types.resetBattle });
  };

  const value = {
    ...battle,
    handleSelectedPokemon,
    handleResetBattle,
    reduceHp,
    isGameOver,
  };

  return (
    <GameBattleContext.Provider value={value}>
      {children}
    </GameBattleContext.Provider>
  );
};

export { GameBattleContext };
export default GameBattleProvider;
