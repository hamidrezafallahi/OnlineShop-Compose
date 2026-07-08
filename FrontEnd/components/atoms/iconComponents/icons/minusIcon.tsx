import type { IIconConfig } from '../type';

export const MinusIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 12;             // width اصلی
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";
  const className = config?.className ?? "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}        
      viewBox="0 0 12 2"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
            className={`stroke-primary ${className}`}
    >
      <path d="M0 1H12" strokeLinecap="round" />
    </svg>
  );
};
