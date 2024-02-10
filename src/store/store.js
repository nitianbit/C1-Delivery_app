import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/items'


export const store = configureStore({
    reducer: {
        cart: cartReducer
    },
})

