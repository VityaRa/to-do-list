import { Dispatch } from "redux";
import { api } from "../api/requests";
import { getList } from "../store/reducers/listReducer";

export const loadInitialData = async (dispatch: Dispatch) => {
    const items = await api.getItems()
    dispatch(getList(items.data))
}