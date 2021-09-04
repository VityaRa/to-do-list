import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../types/interfaces";

export interface IModalState {
  content: JSX.Element;
  isOpen: boolean;
}

const initialState: IModalState = {
  isOpen: false,
  content: <></>
};

export const listSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setModal: (state, action: PayloadAction<JSX.Element>) => {
        state.content = action.payload
    },
  }
});

export const {toggleModal, setModal} = listSlice.actions;

export default listSlice.reducer;