const isDevelopment = process.env.NODE_ENV === "development";

export const apiBaseUrl = isDevelopment
  ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
  : "/api";
export const apiBaseServerSideUrl = isDevelopment
  ? process.env.INTERNAL_SERVER_SIDE_API_URL
  :  process.env.INTERNAL_SERVER_SIDE_API_URL;