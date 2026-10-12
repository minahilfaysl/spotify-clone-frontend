import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../components/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    credentials: 'same-origin',
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token.access}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // An expired or invalid access token comes back as 401 Unauthorized.
    // Use the refresh token to get a new access token, then retry once.
    if (result?.error?.status === 401) {
        const { user, token } = api.getState().auth
        if (!token?.refresh) {
            // not logged in (e.g. a failed login attempt): nothing to refresh
            return result
        }

        const refreshResult = await baseQuery({
            url: '/api/users/token/refresh/',
            method: 'POST',
            body: { refresh: token.refresh },
        }, api, extraOptions)

        if (refreshResult?.data?.access) {
            // keep the same refresh token, swap in the new access token
            api.dispatch(setCredentials({
                user,
                token: { ...token, access: refreshResult.data.access },
            }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            // the refresh token has expired too: sign out
            api.dispatch(logout())
        }
    }

    // Shared demo accounts are read-only; most forms fail silently, so tell
    // the visitor why their change didn't happen.
    const detail = result?.error?.data?.detail
    if (result?.error?.status === 403 && typeof detail === 'string' && detail.startsWith('Demo accounts')) {
        window.alert(detail)
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})