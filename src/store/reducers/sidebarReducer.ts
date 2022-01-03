import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISidebarState {
  isOpen: boolean;
  isOpenedSettings: boolean;
  searchWord: string;
}

const initialState: ISidebarState = {
  isOpen: false,
  isOpenedSettings: false,
  searchWord: ""
};

export const sidebarSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleSettings: (state) => {
      state.isOpenedSettings = !state.isOpenedSettings;
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    }
  }
});

export const { toggleSidebar, setSearchWord, toggleSettings } = sidebarSlice.actions;

export default sidebarSlice.reducer;
