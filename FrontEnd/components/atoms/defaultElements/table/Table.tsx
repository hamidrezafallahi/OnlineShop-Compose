"use client";

import React, {
  Key,
  ReactNode,
} from 'react';

import moment from 'moment-jalaali';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { CloseIcon } from '@components/atoms/iconComponents';
import { TickIcon } from '@components/atoms/iconComponents/icons/tickIcon';

import { Rate } from '../customRate';
import { TElement } from './';
import ActiveComponent from './activeComponent';
import ApproveComponent from './approveComponent';
import DefaultComponent from './defaultComponent';
import DeleteComponent from './deleteComponent';
import EditComponent from './editComponent';

interface TableProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  key?: Key;
  itemId?: number;
  itemType?: TElement;
}
interface IRow extends TableProps {
  row?: Record<string, any>;
}

export function Table({ children }: TableProps) {
  return (
    <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-center">
      {children}
    </table>
  );
}

export function TableHeader({ children }: TableProps) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b max-w-full transition">
      {children}
    </tr>
  );
}

export function TableHead({ children, ...props }: TableProps) {
  return (
    <th scope="col" className="px-3 py-2 font-semibold text-center" {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }: IRow) {
  const t = useTranslations();
  const { itemType, row } = props;
  switch (itemType as TElement) {
    case "image":
      return (
        <td className="px-6 py-2 text-center">
          {typeof children === "string" && children.trim().length > 0 ? (
            <div className="flex justify-center items-center">
              <div className="relative rounded-full w-10 h-10 overflow-hidden">
                <Image
                  src={children}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <span className="text-gray-400 italic">—</span>
          )}
        </td>
      );
    case "bool":
      return (
        <td className="flex justify-center items-center h-10">
          {children ? (
            <TickIcon config={{ stroke: "#0E5E2D" }} />
          ) : (
            <CloseIcon config={{ className: "stroke-red-500" }} />
          )}
        </td>
      );
    case "action":
      return (
        <td className="px-3 py-2 text-center">
          <div className="flex justify-center items-center gap-2">
            {Array.isArray(children)
              ? children.map((item: string, index: number) => {
                  switch (item.toLowerCase()) {
                    case "edit":
                      return <EditComponent key={index} id={row!.id} />;
                    case "delete":
                      return <DeleteComponent key={index} id={row!.id} />;
                    case "active":
                      return (
                        <ActiveComponent
                          key={index}
                          id={row!.id}
                          checked={row!.isActive}
                        />
                      );
                    case "approve":
                      return (
                        <ApproveComponent
                          key={index}
                          id={row!.id}
                          isApprove={row!.isApproved}
                        />
                      );
                    case "default":
                      return (
                        <DefaultComponent
                          key={index}
                          id={row!.id}
                          isDefault={row!.isDefault}
                        />
                      );
                    default:
                      return null;
                  }
                })
              : null}
          </div>
        </td>
      );
    case "date":
      const dateValue  =
        typeof children === "string" ? new Date(children) : children;
      const formatted = moment(dateValue as string).format("HH:mm - jYYYY/jMM/jDD");
      return (
        <td
          className="px-3 py-2 overflow-hidden text-gray-900 dark:text-gray-200 text-center text-ellipsis whitespace-nowrap"
          {...props}
        >
          {isNaN(dateValue as any) ? "-" : formatted}
        </td>
      );
    case "rate":
      return (
        <td
          title={children as string}
          className="px-3 py-2 border w-20 max-w-96 overflow-hidden text-gray-900 dark:text-gray-200 text-center text-ellipsis whitespace-nowrap"
          {...props}
        >
          <Rate mode="display" value={Number(children as string)} />
        </td>
      );
    default:
      return (
        <td
          title={children as string}
          className="px-3 py-2 border w-20 max-w-96 overflow-hidden text-gray-900 dark:text-gray-200 text-center text-ellipsis whitespace-nowrap"
          {...props}
        >
          {children}
        </td>
      );
  }
}
