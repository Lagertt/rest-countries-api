import React from 'react';
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss';

function Pagination({ countPages, setCurrentPage }) {
  return (
    <ReactPaginate
      className={cl.paginate}
      breakLabel="…"
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => setCurrentPage(e.selected)}
      pageRangeDisplayed={2}
      pageCount={countPages}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
