import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LANG } from "utils/enums";
import { _COOKIES_EMAIL, _COOKIES_USER_ID } from "../../utils/constants";
import i18next from "i18next";
import { getCachedLanguage } from "functions/getCachedLanguage";

export interface IUserState {
  readonly email: string;
  lang: string;
}

const lang = getCachedLanguage()

const initialState: IUserState = {
  email: "",
  lang,
};

export const sidebarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<IUserState>>) => {
      // state.id = action.payload.id;
      state.email = action.payload.email || '';
    },
    logoutAction: (state) => initialState,
    setLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      i18next.changeLanguage(action.payload)
    }
  }
});

export const { setUser, logoutAction, setLanguage } = sidebarSlice.actions;

export default sidebarSlice.reducer;
