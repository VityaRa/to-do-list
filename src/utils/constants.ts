export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://enigmatic-island-13804.herokuapp.com";

export const _COOKIES_ACCESS = `_COOKIES_ACCESS`;
export const _COOKIES_USER_ID = `_COOKIES_USER_ID`;
export const _COOKIES_EMAIL = `_COOKIES_EMAIL`;
export const _COOKIES_ACTIVE_LIST_ID = `_COOKIES_ACTIVE_LIST_ID`;
export const LOCAL_STORAGE_LANG = `_LOCAL_STORAGE_LANG`;