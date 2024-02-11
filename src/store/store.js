import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/items'
import userReducer from './slices/user'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    },
})

