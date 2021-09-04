import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import listReducer from './reducers/listReducer'
import modalReducer from './reducers/modalReducer'

export const store = configureStore({
  reducer: {
    list: listReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;