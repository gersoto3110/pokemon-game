import "./GameOver.css";

const GameOver = ({ gridArea, result, handleResetBattle }) => {
  return (
    <div
      style={{ gridArea }}
      className="game-over"
    >
      <span>{`${result}`}</span>
      <button onClick={() => handleResetBattle()}>Voler a jugar</button>
    </div>
  );
};

export default GameOver;
