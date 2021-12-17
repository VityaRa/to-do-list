import { Dispatch } from "redux";
import { api, listApi, userApi } from "../api/requests";
import {
  setActiveListId,
  setSidebarList,
  setTitle
} from "../store/reducers/listReducer";
import { IList } from "../types/interfaces";
import Cookies from "js-cookie";
import { _COOKIES_ACTIVE_LIST_ID } from "../utils/constants";
import { setMainList } from "./setMainList";
import { setUser } from "../store/reducers/userReducer";

export const loadInitialData = async (dispatch: Dispatch) => {
  try {
    const user = await userApi.getUser();
    dispatch(setUser({ email: user.data.email }));
    const res = await listApi.getLists();

    const lists: IList[] = res.data;
    
    const savedListId = localStorage.getItem(_COOKIES_ACTIVE_LIST_ID) || "";
    if (savedListId) {
      const savedList = lists.find((item) => item._id === savedListId) || {
        title: "",
        items: [],
        _id: ""
      };
      setMainList(dispatch, savedList);
    } else {
      setMainList(
        dispatch,
        lists[0] || {
          title: "",
          items: [],
          _id: ""
        }
      );
    }

    dispatch(setSidebarList(lists));
  } catch (e) {}
};
