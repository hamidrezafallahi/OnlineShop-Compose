import type { IIconConfig } from '../type';

export const TwitterIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 24;  
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      className="stroke-primary"

    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4.36a9.12 9.12 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.04-4.52 4.55 0 .36.04.71.12 1.04C7.69 5.53 4.07 3.67 1.64.9a4.51 4.51 0 0 0-.61 2.29c0 1.57.8 2.95 2.03 3.76a4.51 4.51 0 0 1-2.05-.57v.06c0 2.2 1.55 4.04 3.61 4.45a4.52 4.52 0 0 1-2.04.08c.58 1.82 2.26 3.15 4.25 3.19A9.06 9.06 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.84-6.85 12.84-12.8 0-.2 0-.39-.01-.58A9.18 9.18 0 0 0 23 3z" />
    </svg>
  );
};

