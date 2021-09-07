import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUp } from "../../components/common/modal/components/signUp";
import { IItem } from "../../types/interfaces";

export interface IModalState {
  content: JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
}

const initialState: IModalState = {
  isOpen: false,
  content: <></>,
  onClose: () => {},
};

export const listSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setModal: (state, action: PayloadAction<JSX.Element>) => {
      state.content = action.payload;
    },
    cleanModal: () => initialState,
    
  }
});

export const { toggleModal, setModal, cleanModal } = listSlice.actions;

export default listSlice.reducer;
