import { apiSlice } from "../../app/api/apiSlice";

export const playlistsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["TrackList", "Playlist"] })
  .injectEndpoints({
    endpoints: builder => ({
      getTracksByPlaylist: builder.query({
        query: (playlistID) => `api/tracks/?playlist=${playlistID}`,
        providesTags: ["TrackList"],
      }),
      getPlaylists: builder.query({
        query: (username) => `api/playlists/?user__username=${username}`,
        providesTags: ["Playlist"],
      }),
      getPublicPlaylists: builder.query({
        query: (username) => `api/playlists/?user__username=${username}&is_private=false`,
        providesTags: ["Playlist"],
      }),
      getPlaylistDetails: builder.query({
        query: (playlistID) => `api/playlists/${playlistID}`,
        providesTags: ["Playlist"],
      }),
      addTrackToPlaylist: builder.mutation({
        query: (data) => ({
          url: `api/tracks/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ["TrackList"],
      }),
      removeTrackFromPlaylist: builder.mutation({
        query: (trackID) => ({
          url: `api/tracks/${trackID}`,
          method: 'DELETE',
        }),
        invalidatesTags: ["TrackList"],
      }),
      createPlaylist: builder.mutation({
        query: (data) => ({
          url: `api/playlists/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ["Playlist"],
      }),
      deletePlaylist: builder.mutation({
        query: (playlistID) => ({
          url: `api/playlists/${playlistID}`,
          method: 'DELETE',
        }),
        invalidatesTags: ["Library"],
      }),
      updatePlaylist: builder.mutation({
        query: ({playlistID, data}) => ({
          url: `api/playlists/${playlistID}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ["Playlist"],
      }),
    })
  })

export const {
  useGetTracksByPlaylistQuery,
  useLazyGetTracksByPlaylistQuery,
  useGetPlaylistsQuery,
  useGetPublicPlaylistsQuery,
  useGetPlaylistDetailsQuery,
  useAddTrackToPlaylistMutation,
  useRemoveTrackFromPlaylistMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApiSlice