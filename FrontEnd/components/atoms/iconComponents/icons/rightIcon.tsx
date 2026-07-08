import type { IIconConfig } from '../type';

export const RightIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 24;
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      stroke={stroke}
      className="stroke-primary"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
};

