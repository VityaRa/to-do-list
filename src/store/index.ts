import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import listReducer from './reducers/listReducer'

export const store = configureStore({
  reducer: {
    list: listReducer,
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