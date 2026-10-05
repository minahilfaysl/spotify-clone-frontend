import { apiSlice } from "../../app/api/apiSlice";

export const homeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: [
    'RecentItems',
    'Songs',
    'Albums',
    'Playlists',
    'Library'
  ]})
  .injectEndpoints({
    endpoints: builder => ({
      incrementStreams: builder.mutation({
        query: (songID) => ({
          url: `api/songs/${songID}/increment_streams/`,
          method: 'GET',
        }),
      }),
      getRecentlyPlayedItems: builder.query({
        query: (username) => `api/userdata/recently_played/${username}/`,
        providesTags: ['RecentItems'],
      }),
      updateRecentAlbums: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/recently_played/${username}/update_albums/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['RecentItems'],
      }),
      updateRecentPlaylists: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/recently_played/${username}/update_playlists/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['RecentItems'],
      }),
      // song likes
      getLikedSongsList: builder.query({
        query: (username) => `api/userdata/liked_songs/${username}/`,
        providesTags: ['Songs'],
      }),
      addToLikedSongs: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/liked_songs/${username}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Songs'],
      }),
      // album likes
      getLikedAlbumsList: builder.query({
        query: (username) => `api/userdata/liked_albums/${username}/`,
        providesTags: ['Albums'],
      }),
      addToLikedAlbums: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/liked_albums/${username}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Albums', 'Library'],
      }),
      // playlist likes
      getLikedPlaylists: builder.query({
        query: (username) => `api/userdata/liked_playlists/${username}/`,
        providesTags: ['Playlists'],
      }),
      addToLikedPlaylists: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/liked_playlists/${username}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Playlists', 'Library'],
      }),
      // user libary
      getUserLibraryItems: builder.query({
        query: (username) => `api/userdata/user_library/${username}/`,
        providesTags: ['Library'],
      }),
      getFollowingList: builder.query({
        query: (username) => `api/userdata/following/${username}/`,
        providesTags: ['Library'],
      }),
      updatePlaylistsLibrary: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/user_library/${username}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Library'],
      }),
      // queue for song being played
      getQueue: builder.mutation({
        query: ({id, type}) => {
          type == 'playlist' ? ({
          url: `api/userdata/user_library/${id}/`,
          method: 'GET',
          body: data,
          })
          : ({
            url: `api/userdata/user_library/${id}/`,
            method: 'GET',
            body: data,
          })
        },
        invalidatesTags: ['Library'],
      }),
      // homepage data
      getNewReleases: builder.query({
        query: () => `api/albums/new_releases/`,
      }),
      getNewPlaylists: builder.query({
        query: () => `api/playlists/new_playlists/`,
      }),
    })
  })

export const {
  useIncrementStreamsMutation,
  // recents
  useGetRecentlyPlayedItemsQuery,
  useUpdateRecentAlbumsMutation,
  useUpdateRecentPlaylistsMutation,
  // likes
  useGetLikedSongsListQuery,
  useAddToLikedSongsMutation,
  useGetLikedAlbumsListQuery,
  useAddToLikedAlbumsMutation,
  useGetLikedPlaylistsQuery,
  useAddToLikedPlaylistsMutation,
  // library
  useGetUserLibraryItemsQuery,
  useGetFollowingListQuery,
  useUpdatePlaylistsLibraryMutation,
  // queue for player
  useGetQueueMutation,
  // homepage data
  useGetNewReleasesQuery,
  useGetNewPlaylistsQuery,
} = homeApiSlice