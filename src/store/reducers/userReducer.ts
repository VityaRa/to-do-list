import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _COOKIES_EMAIL, _COOKIES_USER_ID } from "../../utils/constants";

export interface IUserState {
  // readonly id: string;
  readonly email: string;
}

// const initialId = localStorage.getItem(_COOKIES_USER_ID)
// const email = localStorage.getItem(_COOKIES_EMAIL)

const initialState: IUserState = {
  // id: "",
  email: ""
};

export const sidebarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      // state.id = action.payload.id;
      state.email = action.payload.email;
    },
    logoutAction: (state) => {
      // state.id = "";
      state.email = "";
    }
  }
});

export const { setUser, logoutAction } = sidebarSlice.actions;

export default sidebarSlice.reducer;
