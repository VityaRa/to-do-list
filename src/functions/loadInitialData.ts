import { Dispatch } from "redux";
import { api, listApi } from "../api/requests";
import { setList, setSidebarList, setTitle } from "../store/reducers/listReducer";
import { IListNoState } from "../types/interfaces";

export const loadInitialData = async (dispatch: Dispatch) => {
  const res = await listApi.getLists();
  const lists: IListNoState[] = res.data;

  dispatch(setSidebarList(lists));
  dispatch(setList(lists[0].items));
  dispatch(setTitle(lists[0].title));
};
