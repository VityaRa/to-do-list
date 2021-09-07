import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../types/interfaces";

export interface IListState {
  title: string;
  list: IItem[];
}

const initialState: IListState = {
  title: "",
  list: []
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
    getList: (state, action: PayloadAction<IItem[]>) => {
      state.list = action.payload;
    },
    updateItem: (state, action: PayloadAction<IItem>) => {
      const item = state.list.find((item) => item._id === action.payload._id);
      if (item) {
        item.description = action.payload.description;
      }
    }
  }
});

export const { addItem, removeItem, toggleItem, getList, updateItem } =
  listSlice.actions;

export default listSlice.reducer;
