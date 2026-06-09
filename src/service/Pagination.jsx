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
      <ul className="text-xs pagination justify-content-center">
        <li className="page-item">
          <button
            type="button"
            className="text-gray-600 page-link"
            onClick={prevPage}
          >
            Өмнөх
          </button>
        </li>

        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item text-gray-600 ${
              currentPage === pgNumber ? "active" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            type="button"
            className="text-gray-600 page-link"
            onClick={nextPage}
          >
            Дараах
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
