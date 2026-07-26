const isDevelopment = process.env.NODE_ENV === "development";

export const apiBaseUrl = isDevelopment
  ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
  : "";