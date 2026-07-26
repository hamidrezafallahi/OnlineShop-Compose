const isDevelopment = process.env.NODE_ENV === "development";

export const apiBaseUrl = isDevelopment
  ? process.env.INTERNAL_API_URL
  : "";