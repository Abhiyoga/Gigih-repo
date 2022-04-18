import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        revoke: (state, action) => {
            state.token = null
        }
    }
})

export const { setToken, revoke } = authSlice.actions
export default authSlice.reducer