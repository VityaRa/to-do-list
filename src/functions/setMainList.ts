import { Dispatch } from "redux";
import { setActiveListId, setList, setTitle } from "../store/reducers/listReducer";
import { IList } from "../types/interfaces";

export const setMainList = (dispatch: Dispatch, list: IList) => {
    dispatch(setList(list.items));
    dispatch(setTitle(list.title));
    dispatch(setActiveListId(list._id))
}