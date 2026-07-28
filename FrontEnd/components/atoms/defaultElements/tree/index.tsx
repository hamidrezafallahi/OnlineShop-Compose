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
  onClick?: (node: ITreeContext | { parentCategoryId: number }) => void;
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
            w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between
            rounded-xl px-2 py-2 min-h-11 transition-colors duration-150 cursor-pointer
            ${isSelected
              ? "bg-[var(--admin-active)] text-[var(--primary-color)]"
              : "bg-[var(--admin-surface-elevated)] hover:bg-[var(--admin-hover)] text-[var(--admin-text)]"}
          `}
          style={{
            paddingInlineStart: `${level * 12 + 8}px`,
            paddingInlineEnd: '8px',
          }}
          onClick={() => {
            if (clickable) toggleSelect(node.id);
            else if (hasChildren) toggleExpand(node.id);
          }}
        >
          <div className="flex flex-1 justify-start items-center gap-2 min-w-0 text-sm">
            <div className="truncate">
              {locale == "fa" ? node.persianName : node.englishName}
            </div>
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleExpand(node.id);
                }}
                className="shrink-0 text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition"
              >
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            ) : null}
          </div>
          <div
            className="flex items-center gap-2 shrink-0 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <TreeActions
              node={node}
              active={isSelected}
              endPoint={endPoint}
              onClick={(e) => {
                onClick?.(e);
              }}
            />
          </div>
        </div>

        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              isExpanded ? "max-h-[1000px]" : "max-h-0"
            }`}
            style={{
              borderBottom: '1px solid var(--admin-border)',
            }}
          >
            {node.subCategories!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1.5 bg-[var(--admin-surface-muted)] border border-[var(--admin-border)] rounded-xl p-2 w-full min-w-0 overflow-x-auto">
      {data.map((cat) => renderNode(cat))}
    </div>
  );
};

export default Tree;
