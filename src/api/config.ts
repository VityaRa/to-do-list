import axios from "axios";
import {
  BASE_URL,
  _COOKIES_ACCESS,
  _COOKIES_EMAIL,
  _COOKIES_USER_ID,
} from "../utils/constants";

export const INSTANCE = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  // (error) => {
  //   if (error.response.status === 401) {
  //     alert("Сначала войдите в аккаунт");
  //   }
  //   return error;
  // }
);

export const setAuthData = () => {
  if (localStorage.getItem(_COOKIES_ACCESS)) {
    INSTANCE.defaults.headers["x-access-token"] =
      localStorage.getItem(_COOKIES_ACCESS);
    return true;
  }
  return false;
};

setAuthData();
