import type { IIconConfig } from '../type';

export const TelegramIcon = ({ config }: { config?: IIconConfig }) => {
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
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.518 8.328l-1.574 7.419c-.12.531-.434.661-.881.412l-2.446-1.805-1.18 1.137c-.13.13-.238.238-.487.238l.175-2.468 4.491-4.054c.195-.175-.043-.272-.303-.097l-5.548 3.49-2.39-.747c-.52-.16-.53-.52.109-.77l9.345-3.603c.431-.145.81.103.667.761z" />
    </svg>
  );
};

