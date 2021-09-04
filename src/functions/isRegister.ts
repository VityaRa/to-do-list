import Cookies from "js-cookies";
import { _COOKIES_ACCESS } from "../utils/constants";

export const isRegister = () => {
  return false
  return !!Cookies.get(_COOKIES_ACCESS);
};
