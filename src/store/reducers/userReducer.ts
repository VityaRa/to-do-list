import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _COOKIES_EMAIL, _COOKIES_USER_ID } from "../../utils/constants";

export interface IUserState {
  readonly email: string;
}

const initialState: IUserState = {
  email: "",
};

export const sidebarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<IUserState>>) => {
      // state.id = action.payload.id;
      state.email = action.payload.email || '';
    },
    logoutAction: (state) => initialState
  }
});

export const { setUser, logoutAction } = sidebarSlice.actions;

export default sidebarSlice.reducer;
