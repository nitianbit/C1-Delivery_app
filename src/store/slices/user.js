import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    details: null,
    isLoggedIn: false
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addDetails: (state, action) => {
            state.details = action.payload;
            state.isLoggedIn = true
        },
        removeUser: (state) => {
            state.details = null;
            state.isLoggedIn = false;
        },

    },
})

export const { addDetails, removeUser } = counterSlice.actions

export default counterSlice.reducer