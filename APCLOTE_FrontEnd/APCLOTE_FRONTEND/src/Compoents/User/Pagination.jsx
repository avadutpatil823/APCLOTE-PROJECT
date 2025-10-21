import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    // Always include first page
    pages.push(1);

    if (totalPages <= 7) {
      // If total pages small, just show all
      for (let i = 2; i <= totalPages; i++) pages.push(i);
    } else {
      // More than 7 pages
      let start = Math.max(currentPage - 1, 2);
      let end = Math.min(currentPage + 1, totalPages - 1);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-blue-100 border-gray-400"
            }`}
          >
            Prev
          </button>
        </li>

        {getPageNumbers().map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border rounded-md ${
                  page === currentPage
                    ? "bg-blue-500 text-white border-blue-500"
                    : "hover:bg-blue-100 border-gray-400"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-blue-100 border-gray-400"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
