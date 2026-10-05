import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
        },
        logout: (state, action) => {
            state.user = null
            state.token = null
            localStorage.setItem('user', null)
            localStorage.setItem('token', null)
        }
    },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken= (state) => state.auth.token
