import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/users/login/',
                method: 'POST',
                body: {...credentials}
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: 'api/users/signup/',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useLoginMutation,
    useSignupMutation,
} = authApiSlice