import type { IIconConfig } from '../type';

export const YouTubeIcon = ({ config }: { config?: IIconConfig }) => {
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
      <path d="M23.5 6.2a2.82 2.82 0 0 0-1.98-1.99C19.66 4 12 4 12 4s-7.66 0-9.52.21a2.82 2.82 0 0 0-1.98 1.99A29.46 29.46 0 0 0 0 12a29.46 29.46 0 0 0 .5 5.8 2.82 2.82 0 0 0 1.98 1.99C4.34 20 12 20 12 20s7.66 0 9.52-.21a2.82 2.82 0 0 0 1.98-1.99A29.46 29.46 0 0 0 24 12a29.46 29.46 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
};

