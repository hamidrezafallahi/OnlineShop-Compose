import type { IIconConfig } from '../type';

export const PlusIcon2 = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 12;
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      className="stroke-primary"
    >
      <path d="M6 0V12M0 6H12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
