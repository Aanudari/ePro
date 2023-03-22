import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <ul className="pagination justify-content-center text-xs  ">
        <li className="page-item">
          <a className="page-link text-gray-600" onClick={prevPage}>
            Өмнөх
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item text-gray-600 ${
              currentPage == pgNumber ? "active" : ""
            } `}
          >
            <a onClick={() => setCurrentPage(pgNumber)} className="page-link ">
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link text-gray-600" onClick={nextPage}>
            Дараах
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
