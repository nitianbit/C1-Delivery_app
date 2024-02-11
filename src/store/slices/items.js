import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item._id === _id);

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex] = { ...action.payload, quantity: state.items[existingItemIndex].quantity + 1 };
            } else {
                // Add the new item if not found
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { _id } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item._id === _id);

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                if (existingItem.quantity > 1) {
                    state.items[existingItemIndex].quantity -= 1
                } else {
                    state.items.splice(existingItemIndex, 1);
                }
            }
        },
        emptyCart: (state) => {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, emptyCart } = counterSlice.actions

export default counterSlice.reducer