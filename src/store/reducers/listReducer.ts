import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from '../../types/interfaces'

export interface IListState {
    title: string,
    list: IItem[],
}

const initialState: IListState = {
    title: '',
    list: [
        {
            id: 0,
            description: 'Check out for news',
            isDone: false,
        },
        {
            id: 1,
            description: `Fix 'Item' component render`,
            isDone: true,
        },
        {
            id: 2,
            description: 'Learn Docker',
            isDone: false,
        },
    ]
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IItem>) => {
            state.list.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(item => item.id !== action.payload)
        },
        toggleItem: (state, action: PayloadAction<IItem>) => {
            const item = state.list.find(item => item.id === action.payload.id)
            if (item) {
                item.isDone = !action.payload.isDone
            }
        },
    },
})

export const { addItem, removeItem, toggleItem } = listSlice.actions

export default listSlice.reducer