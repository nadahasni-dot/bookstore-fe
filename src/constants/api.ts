export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "";

export const ENDPOINTS = {
  TAG: {
    DEFAULT: "/tag",
  },
  BOOK: {
    DEFAULT: "/book",
    DETAIL: "/book/:id",
  },
};
