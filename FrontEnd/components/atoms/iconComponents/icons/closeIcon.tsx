import type { IIconConfig } from '../type';

export const CloseIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 24;
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";
  const className = config?.className ?? "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      className={`stroke-primary ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />{" "}
    </svg>
  );
};
