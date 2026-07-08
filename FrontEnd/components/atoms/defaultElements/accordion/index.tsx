"use client"

import * as React from 'react';

import { cn } from '@lib/utils';

export interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenId?: string
  className?: string
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, defaultOpenId, className }, ref) => {
    const [openId, setOpenId] = React.useState<string | null>(
      defaultOpenId ?? null
    )

    const toggle = (id: string) => {
      setOpenId((prev) => (prev === id ? null : id))
    }

    return (
      <div ref={ref} className={cn("space-y-2 w-full", className)}>
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div
              key={item.id}
              className={cn(
                "bg-background border rounded-md overflow-hidden"
              )}
            >
              {/* Header */}
              <button
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex justify-between items-center hover:bg-accent px-4 py-1 w-full font-medium text-foreground text-base transition-colors"
                )}
                aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform duration-300 transform",
                    isOpen && "rotate-180"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Panel */}
              <div
                className={cn(
                  "grid transition-all duration-300",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="px-4 overflow-hidden text-muted-foreground text-sm">
                  {item.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

Accordion.displayName = "Accordion"

export { Accordion };
