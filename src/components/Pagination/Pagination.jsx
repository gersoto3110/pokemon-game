import "./Pagination.css";

const Pagination = ({ style, currentPage, handlePrevPage, handleNextPage }) => {
  return (
    <div style={style} className="pagination">
      <button onClick={() => handlePrevPage()} className="btn-page">
        {"<"}
      </button>
      <span className="btn-page">{currentPage}</span>
      <button onClick={() => handleNextPage()} className="btn-page">
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
