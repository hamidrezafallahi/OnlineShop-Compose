"use client";
import React, {
  useCallback,
  useState,
} from 'react';

import { useLocale } from 'next-intl';

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@components/atoms/iconComponents';

import TreeActions from './treeActions';

export interface ITreeContext {
  id: number;
  parentCategoryId: number;
  categoryEnglishDesc: string;
  categoryPersianDesc: string;
  englishName: string;
  categoryCover: string;
  isShowInLanding: boolean;
  isActive: boolean;
  persianName: string;
  subCategories: ITreeContext[];
}

interface TreeProps {
  data: ITreeContext[];
  endPoint:string;
  clickable?: boolean;
  multi?: boolean;
  onSelect?: (selectedIds: number[]) => void;
  onClick?: (node: ITreeContext) => void;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  clickable = false,
  multi = false,
  endPoint,
  onSelect,
  onClick,
}) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const locale = useLocale();
  const toggleExpand = useCallback((id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSelect = useCallback(
    (id: number) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (multi) {
          next.has(id) ? next.delete(id) : next.add(id);
        } else {
          next.clear();
          next.add(id);
        }
        onSelect?.(Array.from(next));
        return next;
      });
    },
    [multi, onSelect],
  );

  const renderNode = (node: ITreeContext, level = 0) => {
    const isExpanded = expanded.has(node.id);
    const isSelected = selected.has(node.id);
    const hasChildren = node.subCategories && node.subCategories.length > 0;
    return (
      <div key={node.id}>
        <div
          className={`
            w-full flex items-center justify-between border rounded-md px-1 py-0 cursor-pointer bg-white h-10
            transition-colors duration-150 
            ${isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100  "}
          `}
          style={{ paddingRight: `${locale == "fa" ? level * 20 + 8:2}px`,paddingLeft: `${locale == "fa" ? 2:level * 20 + 8}px` }}
          onClick={() => {
            if (clickable) toggleSelect(node.id);
            else if (hasChildren) toggleExpand(node.id);
          }}
        >
          <div className="flex flex-1 justify-start items-center gap-2 px-2 w-full h-full text-sm">
            <div>{locale == "fa" ? node.persianName : node.englishName}</div>
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleExpand(node.id);
                }}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            ) : (
              <div className="w-4" />
            )}
          </div>
          <div
            className={`flex h-full !w-30 overflow-hidden items-center gap-2`}
          >
            <TreeActions node={node} active={isSelected} endPoint={endPoint} onClick={(e)=>{onClick?.(e)}}/>
          </div>
        </div>

        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              isExpanded ? "max-h-[1000px]" : "max-h-0"
            }`}
            style={{
              paddingRight: `${level + 1 * 20 + 8}px`,
              borderBottom: `${level + 1}px solid gray`,
            }}
          >
            {node.subCategories!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg w-full sm:w-fit sm:min-w-60">
      {data.map((cat) => renderNode(cat))}
    </div>
  );
};

export default Tree;
