import "./BattleCard.css";

import Loading from "../Loading/Loading";

const BattleCard = ({ style, imgUrl, name, hp, maxHp, visibleHp }) => {
  let hpPercentage = hp * 100 / maxHp;

  return (
    <div className="battle-card" style={style}>
      <img src={imgUrl} alt={`pokemon-${name}-imagen`} />
      {visibleHp ? (
        <span
          style={{
            "--color":
              hpPercentage > 70
                ? "var(--green)"
                : hpPercentage > 50
                ? "var(--yellow)"
                : "var(--red)",
          }}
        >{`HP: ${hp} / ${maxHp}`}</span>
      ) : (
        <Loading size="2.5rem" afterSize="2rem" sizeBorder=".3rem" />
      )}
    </div>
  );
};

export default BattleCard;
