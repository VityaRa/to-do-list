import { LOCAL_STORAGE_LANG } from "utils/constants"
import { LANG } from "utils/enums";

export const getCachedLanguage = () => {
    return localStorage.getItem(LOCAL_STORAGE_LANG) || LANG.ENG;
}