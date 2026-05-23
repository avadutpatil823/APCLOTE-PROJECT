import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (totalPages <= 7) {
      for (let i = 2; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(currentPage - 1, 2);
      const end = Math.min(currentPage + 1, totalPages - 1);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <ul className="surface-panel flex items-center gap-2 px-3 py-3">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full px-4 py-2 font-semibold ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "ghost-btn !py-2 !px-4"
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
                className={page === currentPage ? "primary-btn !py-2 !px-4" : "ghost-btn !py-2 !px-4"}
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
            className={`rounded-full px-4 py-2 font-semibold ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "ghost-btn !py-2 !px-4"
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
