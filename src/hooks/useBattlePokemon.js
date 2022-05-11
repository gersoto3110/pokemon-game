import { useEffect, useReducer } from "react";
import getAttacksPerPokemon from "../helpers/getAttacksPerPokemon";

function initPlayer(pokemon) {
  const { attacks: attacksUrls, ...updatePokemon } = pokemon;
  const { stats, ...other } = updatePokemon;

  const objectStats = stats.reduce((acc, stat) => {
    acc[stat.name] = stat.baseStat;
    return acc;
  }, {});

  return {
    attacksUrls,
    pokemon: { ...other, ...objectStats, maxHp: objectStats.hp },
    attacks: null,
  };
}

function initialBattle(pokemon, rivalPokemon) {
  return {
    player: initPlayer(pokemon),
    IA: initPlayer(rivalPokemon),
    loading: true,
    error: null,
    texts: null,
    startBattle: false,
  };
}

const types = {
  reduceHp: "REDUCE_HEALTH",
  updateAttacks: "UPDATE_ATTACKS",
  isNotLoading: "IS_NOT_LOADING",
  error: "ERROR",
};

function reducer(prevState, action) {
  let prevData;
  switch (action.type) {
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
    case types.updateAttacks:
      prevData = prevState[action.payload.key];
      return {
        ...prevState,
        [action.payload.key]: {
          ...prevData,
          attacks: action.payload.attacks,
        },
      };
    case types.reduceHp:
      let prevHp = prevState[action.payload.key].pokemon.hp;
      prevData = prevState[action.payload.key];
      return {
        ...prevState,
        [action.payload.key]: {
          ...prevData,
          pokemon: {
            ...prevData.pokemon,
            hp: prevHp - action.payload.damageReceived,
          },
        },
      };
    default:
      return prevState;
  }
}

const useBattlePokemon = (pokemon, rivalPokemon) => {
  const [battle, dispatch] = useReducer(
    reducer,
    initialBattle(pokemon, rivalPokemon)
  );

  useEffect(() => {
    try {
      getAttacksPerPokemon(battle.player.attacksUrls).then((attacks) => {
        dispatch({
          type: types.updateAttacks,
          payload: { key: "player", attacks },
        });
      });
      getAttacksPerPokemon(battle.IA.attacksUrls).then((attacks) =>
        dispatch({
          type: types.updateAttacks,
          payload: { key: "IA", attacks },
        })
      );
    } catch (error) {
      dispatch({ type: types.error, payload: error });
    } finally {
      dispatch({ type: types.isNotLoading });
    }
  }, [battle.player.attacksUrls, battle.IA.attacksUrls]);

  
  const handleReduceHp = (player, damageReceived) => {
    dispatch({
      type: types.reduceHp,
      payload: { key: player, damageReceived },
    });
  };

  return { ...battle, handleReduceHp };
};

export default useBattlePokemon;
