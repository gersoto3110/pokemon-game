import "./Typing.css";

const Typing = ({ text }) => {
  return <span className="blinking-cursor typed">{`${text}`}</span>;
};

export default Typing;
