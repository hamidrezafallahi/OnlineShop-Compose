import type { IIconConfig } from '../type';

export const EyeIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 18;  
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 18 18"
      strokeWidth={strokeWidth}
      stroke={stroke}
      className="stroke-primary"

    >
  <path
        opacity="0.5"
        d="M2.45617 11.4718C1.81872 10.6436 1.5 10.2295 1.5 9C1.5 7.77047 1.81872 7.3564 2.45617 6.52825C3.72897 4.87467 5.86359 3 9 3C12.1364 3 14.271 4.87467 15.5438 6.52825C16.1813 7.35639 16.5 7.77047 16.5 9C16.5 10.2295 16.1813 10.6436 15.5438 11.4718C14.271 13.1253 12.1364 15 9 15C5.86359 15 3.72897 13.1253 2.45617 11.4718Z"
        stroke={config?.stroke ? config.stroke : "#585858"}
        strokeWidth="1.5"
      />
      <path
        d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z"
        stroke={config?.stroke ? config.stroke : "#585858"}
        strokeWidth="1.5"
      />    </svg>
  );
};

{/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" className="stroke-primary" >
<path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
</svg> */}