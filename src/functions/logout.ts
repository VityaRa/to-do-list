import Cookies from "js-cookie";
import { Dispatch } from "redux";
import { clearData } from "../store/reducers/listReducer";
import { toggleModal } from "../store/reducers/modalReducer";
import { toggleSidebar } from "../store/reducers/sidebarReducer";
import { logoutAction } from "../store/reducers/userReducer";
import { _COOKIES_ACTIVE_LIST_ID } from "../utils/constants";
import { loadInitialData } from "./loadInitialData";

export const logout = async (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(logoutAction())
    dispatch(clearData())
    dispatch(toggleSidebar())
}