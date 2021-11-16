import { Dispatch } from "redux";
import { setActiveListId, setTitle } from "../store/reducers/listReducer";
import { IList } from "../types/interfaces";

export const setMainList = (dispatch: Dispatch, list: IList) => {
    dispatch(setTitle(list.title));
    dispatch(setActiveListId(list._id))
}