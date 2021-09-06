import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import listReducer from "./reducers/listReducer";
import modalReducer from "./reducers/modalReducer";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    list: listReducer,
    modal: modalReducer
  },
  middleware: [thunk, logger]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
