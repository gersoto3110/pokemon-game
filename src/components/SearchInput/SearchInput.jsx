import "./SearchInput.css";

const SearchInput = ({ placeholder, value, onChange, style }) => {
  return (
    <input
      type="text"
      className="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};

export default SearchInput;
