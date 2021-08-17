import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IListState {
    list: Array<string>
}

const initialState: IListState = {
    list: []
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state) => {

        },
        removeItem: (state) => {

        },
        toggleItem: (state, action: PayloadAction<number>) => {
            
        },
    },
})

export const { addItem, removeItem, toggleItem } = listSlice.actions

export default listSlice.reducer