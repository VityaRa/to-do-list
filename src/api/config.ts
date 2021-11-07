import axios from "axios";
import {
  BASE_URL,
  _COOKIES_ACCESS,
  _COOKIES_EMAIL,
  _COOKIES_USER_ID
} from "../utils/constants";

export const INSTANCE = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export const setAuthData = () => {
  INSTANCE.defaults.headers["x-access-token"] =
    localStorage.getItem(_COOKIES_ACCESS);

  // INSTANCE.defaults.params = { userId: localStorage.getItem(_COOKIES_USER_ID), email: localStorage.getItem(_COOKIES_EMAIL) };
};

setAuthData();
