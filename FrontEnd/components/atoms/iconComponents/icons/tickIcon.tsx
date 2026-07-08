import type { IIconConfig } from '../type';

export const TickIcon = ({ config }: { config?: IIconConfig }) => {
   const size = config?.size ?? 24;
    const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "#0E0E0E";
 
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13.2915C5 13.2915 6.5 13.2915 8.5 16.4998C8.5 16.4998 14.0588 8.09706 19 6.4165"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
