"use client";

import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CloseIcon } from '@components/atoms/iconComponents';

import { Checkbox } from '../customCheckbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

export type TElement =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "bool"
  | "action"
  | "date"
  | "rate"
  | "enum";

export interface ColumnDef<TData> {
  Header: React.ReactNode;
  Accessor: keyof TData | ((row: TData) => React.ReactNode);
  Type: TElement;
  Options?: ("Edit" | "Delete" | "Active")[];
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  actions: string[];
  data: TData[];
  entity: string;
  pageSize: number;
}

function isAccessorFunction<TData>(
  accessor: keyof TData | ((row: TData) => React.ReactNode),
): accessor is (row: TData) => React.ReactNode {
  return typeof accessor === "function";
}

export function DataTable<TData extends { id: number | string }>({
  columns,
  actions,
  data,
  entity,
  pageSize,
}: DataTableProps<TData>) {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const skip = useRef(false)
  const t = useTranslations();
  const route = useRouter();
  const locale = useLocale();
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      setSelectedRows(data.map((item) => item.id));
      setIsAllSelected(true);
    }
  };

  const handleSelectRow = (id: string | number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const handleFilterList = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  useEffect(() => {
    const filter = setTimeout(() => {
      if(skip.current){
        if (search.trim().length > 0) {
          route.push(
            `/${locale}/admin/${entity}?ByConfig=true&page=${1}&pageSize=${pageSize}&q=${search}`,
          );
        } else {
          route.push(
            `/${locale}/admin/${entity}?ByConfig=true&page=${1}&pageSize=${pageSize}`,
          );
        }
      }
      skip.current=true
    }, 808);
    return () => clearTimeout(filter);
  }, [search]);
  useEffect(() => {
    setIsAllSelected(selectedRows.length === data.length && data.length > 0);
  }, [selectedRows, data]);
  return (
    <div className="relative shadow-md sm:rounded-lg w-full overflow-x-auto">
      {/* 🔍 Header Controls */}
      <div className="flex flex-wrap justify-between items-center space-y-2 md:space-y-0 bg-white dark:bg-gray-900 p-4 border-gray-100 border-b">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100 font-medium text-gray-500 dark:text-gray-400 text-sm"
          >
            Action
            <svg
              className="ms-2.5 w-2.5 h-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {actions.includes("new") && <Link
            href={`/${locale}/admin/${entity}/new`}
            type="button"
            className="inline-flex items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100 font-medium text-gray-500 dark:text-gray-400 text-sm"
          >
            {t("general.new")}
          </Link>}
          {selectedRows.length > 0 && (
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {selectedRows.length} مورد انتخاب شده
            </span>
          )}
        </div>

        {/* 🔍 Search */}
        <div className="relative">
          <button
            onClick={() => {
              setSearch("");
            }}
            className="top-[50%] z-20 absolute border rounded-full -translate-y-[50%] end-2"
          >
            <CloseIcon config={{ size: 14 }} />
          </button>
          <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none start-0">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="جستجو..."
            onChange={handleFilterList}
            value={search}
            className="block bg-gray-50 dark:bg-gray-700 p-2 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 rounded-lg focus:ring-blue-500 w-72 text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>

      {/* 🧾 Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* 🔘 Select All */}
            <TableHead className="p-2 w-4">
              <div className="flex justify-center items-center">
                <Checkbox
                  id="checkbox-all"
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 w-4 h-4 text-blue-600 cursor-pointer"
                />
              </div>
            </TableHead>

            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.Header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 w-4 h-4 text-blue-600 cursor-pointer"
                    />
                  </div>
                </TableCell>

                {columns.map((col, colIndex) => {
                  const rawValue = isAccessorFunction(col.Accessor)
                    ? col.Accessor(row)
                    : row[col.Accessor];

                  const cellContent: React.ReactNode = React.isValidElement(
                    rawValue,
                  )
                    ? rawValue
                    : ((rawValue as React.ReactNode) ?? "");

                  return (
                    <TableCell key={colIndex} itemType={col.Type} row={row}>
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-gray-400 text-center italic"
              >
                هیچ داده‌ای یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
