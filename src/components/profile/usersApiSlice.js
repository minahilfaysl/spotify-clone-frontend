import { apiSlice } from "../../app/api/apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation({
      query: ({username, data}) => ({
        url: `api/users/update_profile/${username}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateFollowing: builder.mutation({
      query: ({username, data}) => ({
        url: `api/userdata/following/${username}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    getFollowersList: builder.query({
      query: (username) => `api/userdata/followers/${username}/`,
    }),
    getFollowedArtists: builder.query({
      query: (username) => `api/userdata/user_library/${username}/retrieve_artists/`,
    }),
  })
})

export const {
  useUpdateProfileMutation,
  useUpdateFollowingMutation,
  // user profile data
  useGetFollowersListQuery,
  useGetFollowedArtistsQuery,
} = usersApiSlice