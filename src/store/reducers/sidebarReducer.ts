import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUp } from "../../components/common/modal/components/signUp";
import { IItem } from "../../types/interfaces";

export interface ISidebarState {
  isOpen: boolean
}

const initialState: ISidebarState = {
    isOpen: false
}

export const sidebarSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
        state.isOpen = !state.isOpen
    },
  }
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
