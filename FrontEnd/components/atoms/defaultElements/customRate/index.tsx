"use client";
import React, { useState } from 'react';

import { StarFantasyIcon } from '@components/atoms/iconComponents';
import { cn } from '@lib/utils';

import { Button } from '../customButton';

interface RateProps {
  value: number;
  max?: number;
  mode?: "display" | "rate";
  onChange?: (rate: number) => void;
  showValue?: boolean;
  className?: string;
}

export const Rate: React.FC<RateProps> = ({
  value,
  max = 5,
  mode = "display",
  onChange,
  showValue = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const activeValue = hoverValue ?? value;

  return (
    <div className={cn("flex flex-row-reverse items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const rateValue = index + 1;
        const isActive = rateValue <= activeValue;
  const full = value >= index + 1;
        const half = value >= index + 0.5 && value < index + 1;
        const type:"full"|"half"|"empty" = full ? "full" : half ? "half" : "empty";

        return (
          <Button
            key={rateValue}
            type="button"
            variant="ghost"
            size="icon"
            // disabled={mode === "display"}
            className="hover:bg-transparent m-0 p-0 w-6 h-6"
            onMouseEnter={() => mode === "rate" && setHoverValue(rateValue)}
            onMouseLeave={() => mode === "rate" && setHoverValue(null)}
            onClick={() => mode === "rate" && onChange?.(rateValue)}
          >
            <StarFantasyIcon
            config={{type:type}}
            />
          </Button>
        );
      })}

      {showValue && (
        <span className="ml-1 text-muted-foreground text-xs">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};
