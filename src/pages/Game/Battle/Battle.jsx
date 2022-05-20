import "./Battle.css";

import {
  AttackSelection,
  BattleCard,
  GameOver,
  Loading,
  Typing,
} from "../../../components";
import { useTyping } from "../../../hooks";
import randomSelectItemArray from "../../../helpers/randomSelectItemArray";
import formatNamePokemon from "../../../helpers/formatNamePokemon";
import useGameBattle from "../../../contexts/GameBattle/useGameBattle";
import players from "../../../constants/players";

const Battle = () => {
  const {
    player,
    IA,
    gameOver,
    result,
    loading,
    error,
    reduceHp,
    isGameOver,
    handleResetBattle,
  } = useGameBattle();

  const {
    typed,
    startTyped,
    handleTexts,
    handleFasterTyping,
    handleNormalTyping,
  } = useTyping();

  const handleOnClick = (e) => {
    const pokePlayerAttack = JSON.parse(e.target.value);
    const pokeIAAttack = randomSelectItemArray(IA.attacks);

    const damageReceivedPokeIA = reduceHp(players.IA, pokePlayerAttack);
    const damageReceivedPokePlayer = reduceHp(players.player, pokeIAAttack);

    handleTexts(
      createTextsBattle(
        player.pokemon,
        pokePlayerAttack,
        damageReceivedPokePlayer,
        IA.pokemon,
        pokeIAAttack,
        damageReceivedPokeIA
      )
    );

    isGameOver(damageReceivedPokePlayer, damageReceivedPokeIA);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <>{`${error}`}</>
      ) : (
        <div className="battle">
          <h2 style={{ gridArea: "title" }}>Batalla Pokemon</h2>

          <BattleCard
            style={{ gridArea: "player" }}
            imgUrl={player.pokemon.imgUrl}
            name={player.pokemon.name}
            hp={player.pokemon.stats.hp}
            maxHp={player.pokemon.stats.maxHp}
            visibleHp={!startTyped}
          />

          <BattleCard
            style={{ gridArea: "ia" }}
            imgUrl={IA.pokemon.imgUrl}
            name={IA.pokemon.name}
            hp={IA.pokemon.stats.hp}
            maxHp={IA.pokemon.stats.maxHp}
            visibleHp={!startTyped}
          />

          {startTyped ? (
            <div
              style={{
                gridArea: "panel",
                width: "100%",
                height: "100%",
                display: "grid",
              }}
              onMouseDown={() => handleFasterTyping()}
              onMouseUp={() => handleNormalTyping()}
            >
              <Typing text={typed} />
            </div>
          ) : gameOver ? (
            <GameOver
              gridArea="panel"
              result={result}
              handleResetBattle={handleResetBattle}
            />
          ) : (
            <AttackSelection
              style={{
                gridArea: "panel",
              }}
              attacks={player.attacks}
              handleOnClick={handleOnClick}
            />
          )}
        </div>
      )}
    </>
  );
};

function attackUsed(pokePlayer, attack) {
  return `${formatNamePokemon(pokePlayer.name)} usó ${attack.name}`;
}

function damageReceived(pokePlayer, damageReceived) {
  return `${formatNamePokemon(
    pokePlayer.name
  )} recibió ${damageReceived} puntos de daño`;
}

function createTextsBattle(
  pokePlayer1,
  attack1,
  damageReceived1,
  pokePlayer2,
  attack2,
  damageReceived2
) {
  return [
    attackUsed(pokePlayer1, attack1),
    damageReceived(pokePlayer2, damageReceived2),
    attackUsed(pokePlayer2, attack2),
    damageReceived(pokePlayer1, damageReceived1),
  ];
}

export default Battle;
