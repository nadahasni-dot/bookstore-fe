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
  AUTH: {
    API_SIGNIN: "/auth/api/signin",
    API_SIGNOUT: "/auth/api/signout",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  ORDER: {
    DEFAULT: "/order",
    DETAIL: "/order/:id",
    CHECKOUT: "/order/checkout",
  },
};
