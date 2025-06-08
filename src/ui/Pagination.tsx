import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  let pages: (number | string)[] = [];
  if (totalPages <= 6) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      pages = [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6 mb-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded border text-sm bg-white text-[#EB0C0C] border-[#EB0C0C] disabled:opacity-50"
      >
        &#8592;
      </button>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={"ellipsis-" + idx} className="px-2 text-[#EB0C0C]">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded border text-sm transition-colors duration-200 ${
              page === currentPage
                ? "bg-[#EB0C0C] text-white border-[#EB0C0C]"
                : "bg-white text-[#EB0C0C] border-[#EB0C0C] hover:bg-[#ffeaea]"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded border text-sm bg-white text-[#EB0C0C] border-[#EB0C0C] disabled:opacity-50"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
