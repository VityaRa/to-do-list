

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { removeItem } from "../store/reducers/listReducer";
import { _COOKIES_ACCESS } from "../utils/constants";

export const isRegister = () => {
  return false
  // return !!Cookies.get(_COOKIES_ACCESS);
};

export const removeAsync = (id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  console.log(id);
  
  return async (dispatch) => {
    dispatch(removeItem(id))
  }
}