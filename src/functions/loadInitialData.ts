import { Dispatch } from "redux";
import { api, listApi } from "../api/requests";
import {
  setActiveListId,
  setList,
  setSidebarList,
  setTitle
} from "../store/reducers/listReducer";
import { IList } from "../types/interfaces";
import Cookies from "js-cookie";
import { _COOKIES_ACTIVE_LIST_ID } from "../utils/constants";

export const loadInitialData = async (dispatch: Dispatch) => {
  const res = await listApi.getLists();
  const lists: IList[] = res.data;

  const savedListId = Cookies.get(_COOKIES_ACTIVE_LIST_ID) || "";
  if (savedListId) {
    const savedList = lists.find((item) => item._id === savedListId) || {
      title: "",
      items: [],
      _id: ""
    };
    dispatch(setList(savedList?.items));
    dispatch(setTitle(savedList?.title));
    dispatch(setActiveListId(savedList._id));
  } else {
    dispatch(setActiveListId(lists[0]._id));
    dispatch(setList(lists[0].items));
    dispatch(setTitle(lists[0].title));
  }

  dispatch(setSidebarList(lists));
};
