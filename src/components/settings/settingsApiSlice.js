import { apiSlice } from "../../app/api/apiSlice";

export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updatePermission: builder.mutation({
      query: ({username, data}) => ({
        url: `api/users/update_permission/${username}/`,
        method: 'PUT',
        body: data,
      }),
    })
  })
})

export const {
  useUpdatePermissionMutation
} = settingsApiSlice