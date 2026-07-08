import { useId } from 'react';

import type { IIconConfig } from '../type';

export const StarFantasyIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 40;  
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "none";

  const color = "#FFC107";
  const emptyColor = "#E0E0E0";

  const gradientId = useId(); // ⭐ خیلی مهم

  const getFill = () => {
    switch (config?.type) {
      case "full":
        return color;
      case "half":
        return `url(#${gradientId})`;
      default:
        return emptyColor;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
    >
      {config?.type === "half" && (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
      )}

      <path
        fill={getFill()}
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      />
    </svg>
  );
};