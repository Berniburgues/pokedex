import { useState, useEffect } from 'react';

export const usePagination = (itemList, itemQuantityPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemList.length / itemQuantityPerPage);

  const lowerLimit = (currentPage - 1) * itemQuantityPerPage;
  const upperLimit = currentPage * itemQuantityPerPage - 1;

  const listSlice = itemList.slice(lowerLimit, upperLimit + 1);

  const nextPage = () => {
    const newPage = currentPage + 1;
    if (newPage <= totalPages) setCurrentPage(newPage);
  };

  const previousPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) setCurrentPage(newPage);
  };

  const changePageTo = (newPage) => {
    if (newPage < 1) setCurrentPage(1);
    else if (newPage > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(newPage);
  };

  const pages = [];
  if (totalPages > 0) pages.push(1);
  if (currentPage >= 4 && totalPages > 3) pages.push('...');
  for (
    let i = Math.max(2, currentPage - 2);
    i <= Math.min(totalPages - 1, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage <= totalPages - 3) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  useEffect(() => {
    changePageTo(currentPage);
  }, [itemList, itemQuantityPerPage]);

  return {
    currentPage,
    listSlice,
    pages,
    nextPage,
    previousPage,
    changePageTo,
  };
};
