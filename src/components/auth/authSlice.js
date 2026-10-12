import { createSlice } from "@reduxjs/toolkit";
import { saveCredentials, clearCredentials, loadCredentials } from "../../app/storage";

// Start from the saved login (if any) so a page refresh keeps you logged in
// and every component sees the user from the very first render.
const saved = loadCredentials()

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: saved?.user ?? null, token: saved?.token ?? null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload ?? {}
            if (!user || !token?.access) {
                // incomplete login data: treat as logged out
                state.user = null
                state.token = null
                clearCredentials()
                return
            }
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
