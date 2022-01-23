import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { v4 as uuidv4 } from "uuid";

import SingleLevel from "./SingleLevel";

const Pagination = ({ itemsPerPage, levels, setActiveLevel }) => {
  const [currentLevels, setCurrentLevels] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentLevels(levels.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(levels.length / itemsPerPage));
  }, [levels, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % levels.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="Repository-container">
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <div className="Repository-container">
        {currentLevels.map((level) => {
          return (
            <div className="Repository-item" key={uuidv4()}>
              <SingleLevel
                className="Repository-item"
                level={level}
                setActiveLevel={setActiveLevel}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
