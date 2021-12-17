import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IItem, IList } from "../../types/interfaces";
import { _COOKIES_ACTIVE_LIST_ID } from "../../utils/constants";

export interface IListState {
  title: string;
  // list: IItem[];
  sidebarList: IList[];
  activeListId: string;
  isProcessingFinished: boolean,
}

const initialState: IListState = {
  title: "",
  // list: [],
  sidebarList: [],
  activeListId: "",
  isProcessingFinished: true,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IItem>) => {
      const list = state.sidebarList.find(
        (item) => item._id === state.activeListId
      );
      if (list) {
        list.items.push(action.payload);
      }
    },
    startProcessing: (state) => {
      state.isProcessingFinished = false;
    },
    finishProcessing: (state) => {
      state.isProcessingFinished = true;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const list = state.sidebarList.find(
        (item) => item._id === state.activeListId
      );
      if (list) {
        list.items = list.items.filter((item) => item._id !== action.payload);
      }
    },
    toggleItem: (state, action: PayloadAction<IItem>) => {
      const list = state.sidebarList.find(
        (item) => item._id === state.activeListId
      );
      if (list) {
        const item = list.items.find((item) => item._id === action.payload._id);
        if (item) {
          item.isDone = action.payload.isDone;
        }
      }
    },
    // setList: (state, action: PayloadAction<IItem[]>) => {
    //   state.list = action.payload;
    // },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateItem: (state, action: PayloadAction<IItem>) => {
      const list = state.sidebarList.find(
        (item) => item._id === state.activeListId
      );

      if (list) {
        const item = list.items.find((item) => item._id === action.payload._id);
        if (item) {
          item.description = action.payload.description;
        }
      }
    },
    setSidebarList: (state, action: PayloadAction<IList[]>) => {
      state.sidebarList = action.payload;
    },
    setActiveListId: (state, action: PayloadAction<string>) => {
      state.activeListId = action.payload;
    },
    removeSidebarItem: (state, action: PayloadAction<IList>) => {
      state.sidebarList = state.sidebarList.filter(
        (item) => item._id !== action.payload._id
      );
    },
    setFirstSidebarList: (state) => {
      if (state.sidebarList[0] && state.sidebarList[0]._id) {
        state.activeListId = state.sidebarList[0]._id;
        state.title = state.sidebarList[0].title
        localStorage.setItem(_COOKIES_ACTIVE_LIST_ID, state.activeListId);
      } else {
        state.activeListId = '';
        state.title = ''
        localStorage.setItem(_COOKIES_ACTIVE_LIST_ID, '');
      }
    },

    addItemToSidebarList: (state, action: PayloadAction<IItem>) => {
      const index = state.sidebarList.findIndex(
        (item) => item._id === state.activeListId
      );
      state.sidebarList[index].items.push(action.payload);
    },
    addSidebarItem: (state, action: PayloadAction<IList>) => {
      state.sidebarList.push(action.payload);
    },
    updateSidebarItem: (state, action: PayloadAction<IList>) => {
      const item = state.sidebarList.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.title = action.payload.title;
      }
    },
    clearData: () => initialState
  }
});

export const {
  addItem,
  removeItem,
  toggleItem,
  // setList,
  setTitle,
  updateItem,
  setSidebarList,
  removeSidebarItem,
  addSidebarItem,
  setActiveListId,
  updateSidebarItem,
  clearData,
  startProcessing,
  finishProcessing,
  setFirstSidebarList,
} = listSlice.actions;

export default listSlice.reducer;
