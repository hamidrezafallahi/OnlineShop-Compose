"use client";
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocale } from 'next-intl';

import { Button } from '@components/atoms/defaultElements/customButton';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@components/atoms/iconComponents';

interface PaginationProps {
  className?: string;
  current?: number; 
  total: number;
  pageSize: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showTitle?: boolean;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  jumpPrevIcon?: React.ReactNode;
  jumpNextIcon?: React.ReactNode;
  pageSizeOptions?: number[];
}

const CustomPagination: React.FC<PaginationProps> = ({
  className = "",
  current = 1,
  total,
  pageSize: initialPageSize=10,
  onChange,
  showSizeChanger = false,
  showTitle = false,
  prevIcon,
  nextIcon,
  jumpPrevIcon,
  jumpNextIcon,
  pageSizeOptions = [5, 10, 20, 50, 100],
}) => {
  const [page, setPage] = useState(current);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const isFirstRender = React.useRef(true);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const maxVisible = 3;

  // محاسبه صفحات قابل نمایش
  const pages = useMemo(() => {
    const list: (number | string)[] = [];
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) list.push(i);
    } else {
      const left = Math.max(2, page - 2);
      const right = Math.min(totalPages - 1, page + 2);
      list.push(1);
      if (left > 2) list.push("jumpPrev");
      for (let i = left; i <= right; i++) list.push(i);
      if (right < totalPages - 1) list.push("jumpNext");
      list.push(totalPages);
    }
    return list;
  }, [page, totalPages]);

   useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
    onChange?.(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (pageSize: number, newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPage(1); // برگرد به صفحه اول
  };
const locale = useLocale()
  return (
    <div
    dir={locale =="fa"? "rtl":"ltr"}
    className={`flex items-center gap-2 bg-white w-fit rounded-lg px-2 ${className}`}>
      {/* prev */}
      <Button
        className="bg-white m-0 p-1 w-fit"
        disabled={page === 1}
        onClick={() => handlePageChange(pageSize, page - 1)}
      >
        {prevIcon ?? <ChevronRightIcon />}
      </Button>

      {/* page numbers */}
      {pages.map((p, index) => {
        if (typeof p === "number") {
          const active = p === page;
          return (
            <Button
              key={index}
              onClick={() => handlePageChange(pageSize, p)}
              className={`px-3 py-1 rounded ${
                active ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {p}
            </Button>
          );
        }

        if (p === "jumpPrev") {
          return (
            <span
              key={index}
              onClick={() => handlePageChange(pageSize, Math.max(page - 5, 1))}
              className="px-2 cursor-pointer"
            >
              {jumpPrevIcon ?? <span>...</span>}
            </span>
          );
        }

        if (p === "jumpNext") {
          return (
            <span
              key={index}
              onClick={() =>
                handlePageChange(pageSize, Math.min(page + 5, totalPages))
              }
              className="px-2 cursor-pointer"
            >
              {jumpNextIcon ?? <span>...</span>}
            </span>
          );
        }

        return null;
      })}

      {/* next */}
      <Button
        className="bg-white m-0 p-1 w-fit"
        disabled={page === totalPages}
        onClick={() => handlePageChange(pageSize, page + 1)}
      >
        {nextIcon ?? <ChevronLeftIcon />}
      </Button>

      {/* انتخاب تعداد رکورد در هر صفحه */}
      {showSizeChanger && (
        <div className="flex items-center gap-1 ml-2 text-gray-600 text-sm">
          <span>نمایش در صفحه:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* نمایش اطلاعات صفحه */}
      {showTitle && (
        <span className="ml-3 text-gray-500 text-sm">
          صفحه {page} از {totalPages} مجموع رکورد : {total}
        </span>
      )}
    </div>
  );
};

export default CustomPagination;
