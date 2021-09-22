import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem, IList } from "../../types/interfaces";

export interface IListState {
  title: string;
  list: IItem[];
  sidebarList: IList[];
  activeListId: string;
}

const initialState: IListState = {
  title: "",
  list: [],
  sidebarList: [],
  activeListId: ""
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IItem>) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
    toggleItem: (state, action: PayloadAction<IItem>) => {
      const item = state.list.find((item) => item._id === action.payload._id);
      if (item) {
        item.isDone = !action.payload.isDone;
      }
    },
    setList: (state, action: PayloadAction<IItem[]>) => {
      state.list = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateItem: (state, action: PayloadAction<IItem>) => {
      const item = state.list.find((item) => item._id === action.payload._id);
      if (item) {
        item.description = action.payload.description;
      }
    },
    setSidebarList: (state, action: PayloadAction<IList[]>) => {
      state.sidebarList = action.payload;
    },
    setActiveListId: (state, action: PayloadAction<string>) => {
      state.activeListId = action.payload;
    },
    removeSidebarItem: (state, action: PayloadAction<IList>) => {
      state.sidebarList = state.sidebarList.filter((item) => item._id !== action.payload._id);
    },
    addSidebarItem: (state, action: PayloadAction<IList>) => {
      state.sidebarList.push(action.payload);
    },
  }
});

export const {
  addItem,
  removeItem,
  toggleItem,
  setList,
  setTitle,
  updateItem,
  setSidebarList,
  removeSidebarItem,
  addSidebarItem,
  setActiveListId
} = listSlice.actions;

export default listSlice.reducer;
