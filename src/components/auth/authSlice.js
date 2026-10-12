import { createSlice } from "@reduxjs/toolkit";
import { saveCredentials, clearCredentials } from "../../app/storage";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            saveCredentials(user, token)
        },
        logout: (state, action) => {
            state.user = null
            state.token = null
            clearCredentials()
        }
    },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken= (state) => state.auth.token
