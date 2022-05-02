const usePaginate = (array, qtyItemsPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(qtyItemsPerPage);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = array?.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    if (currentItems?.length < itemsPerPage) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [array, itemsPerPage]);

  return { currentItems, currentPage, handleNextPage, handlePrevPage };
};

export default usePaginate;
