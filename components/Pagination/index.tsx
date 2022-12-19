import { PaginationInfoType } from "@/types/shared";
import React from "react";

type PaginationType = {
  info: PaginationInfoType;
  handlePagination: (url: number | null) => void;
};

function getPageNumber(url: string | undefined | null) {
  if (!url) return null;
  return Number(url?.split("?page=")[1]);
}

function Pagination({ info, handlePagination }: PaginationType) {
  const prevPageNumber = getPageNumber(info?.prev);
  const nextPageNumber = getPageNumber(info?.next);

  return (
    <div className="flex flex-1 justify-between p-8">
      <button
        className="p-4 text-gray-700 border border-gray-900 hover:border-gray-600 hover:text-gray-500 disabled:border-gray-300 disabled:text-gray-300 rounded-md"
        onClick={() => handlePagination(prevPageNumber)}
        disabled={!prevPageNumber}
      >
        Previous
      </button>

      <button
        className="p-4 text-gray-700 border border-gray-900 hover:border-gray-600 hover:text-gray-500 disabled:border-gray-300 disabled:text-gray-300 rounded-md"
        onClick={() => handlePagination(nextPageNumber)}
        disabled={!nextPageNumber}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
