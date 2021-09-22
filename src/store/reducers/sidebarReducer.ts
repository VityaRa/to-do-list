import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
