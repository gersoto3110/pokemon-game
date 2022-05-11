import "./Battle.css";

import { useContext } from "react";
import { AttackSelection, BattleCard, Loading, Typing } from "../../components";
import { PokedexContext } from "../../contexts/Pokedex";
import { useBattlePokemon, useTyping } from "../../hooks";
import randomSelectItemArray from "../../helpers/randomSelectItemArray";
import damageCalculation from "../../helpers/damageCalculation";
import createTextsBattle from "../../helpers/createTextsBattle";

const Battle = ({ selectedPokemon }) => {
  const { pokedex } = useContext(PokedexContext);

  const rivalPokemon = randomSelectItemArray(pokedex);

  const { player, IA, loading, error, handleReduceHp } = useBattlePokemon(
    selectedPokemon,
    rivalPokemon
  );

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

    const damageReceivedPokePlayer = damageCalculation(
      pokeIAAttack,
      IA.pokemon,
      player.pokemon
    );
    const damageReceivedPokeIA = damageCalculation(
      pokePlayerAttack,
      player.pokemon,
      IA.pokemon
    );

    handleReduceHp("player", damageReceivedPokePlayer);
    handleReduceHp("IA", damageReceivedPokeIA);

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
  };

  const nameGridAreas = ["title", "player", "ia", "panel"];

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <>{`${error}`}</>
      ) : (
        <div className="battle">
          <h2 style={{ gridArea: nameGridAreas[0] }}>Batalla Pokemon</h2>

          <BattleCard
            style={{ gridArea: nameGridAreas[1] }}
            imgUrl={player.pokemon.imgUrl}
            name={player.pokemon.name}
            hp={player.pokemon.hp}
            maxHp={player.pokemon.maxHp}
            visibleHp={startTyped}
          />

          <BattleCard
            style={{ gridArea: nameGridAreas[2] }}
            imgUrl={IA.pokemon.imgUrl}
            name={IA.pokemon.name}
            hp={IA.pokemon.hp}
            maxHp={IA.pokemon.maxHp}
            visibleHp={startTyped}
          />

          {startTyped ? (
            <AttackSelection
              style={{
                gridArea: nameGridAreas[3],
              }}
              attacks={player.attacks}
              handleOnClick={handleOnClick}
            />
          ) : (
            <div
              style={{
                gridArea: nameGridAreas[3],
                width: "100%",
                height: "100%",
                display: "grid",
              }}
              onMouseDown={() => handleFasterTyping()}
              onMouseUp={() => handleNormalTyping()}
            >
              <Typing text={typed} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Battle;
