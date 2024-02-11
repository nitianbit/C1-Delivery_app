import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state,) => {
            state.value += 1
        },
        removeFromCart: (state,) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const { addToCart, removeFromCart, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer