import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISidebarState {
  isOpen: boolean
  searchWord: string,
}

const initialState: ISidebarState = {
    isOpen: false,
    searchWord: "",
}

export const sidebarSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
        state.isOpen = !state.isOpen
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload
    }
  }
});

export const { toggleSidebar, setSearchWord } = sidebarSlice.actions;

export default sidebarSlice.reducer;
