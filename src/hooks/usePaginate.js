import { useState } from "react";

const usePaginate = (array, qtyItemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(qtyItemsPerPage);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = array?.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    if (array.length <= lastIndex) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(array.length);
  };

  return {
    currentItems,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleFirstPage,
    handleLastPage,
  };
};

export default usePaginate;
