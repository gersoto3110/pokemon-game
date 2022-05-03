import "./BackCard.css";

import shortNameStat from "../../../constants/shortNameStat";

const BackCard = ({ stats }) => {
  return (
    <>
      {stats.map((e) => (
        <small key={e.name} className="pkm-stat">
          <b>{shortNameStat[e.name]}</b>: {e.baseStat}
        </small>
      ))}
    </>
  );
};

export default BackCard;
