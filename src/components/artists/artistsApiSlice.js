import { apiSlice } from "../../app/api/apiSlice";

export const artistsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['TrackList'] })
  .injectEndpoints({
    endpoints: builder => ({
      getUserProfileData: builder.query({
        query: (username) => `/api/users/user_profile/${username}/`
      }),
      getGenreList: builder.query({
        query: () => `api/genre/`
      }),
      getUsersAlbumList: builder.query({
        query: (username) => `/api/albums/?artist__username=${username}&ordering=-album_publish_year`
      }),
      getArtistsTopTracks: builder.query({
        query: (username) => `/api/songs/${username}/get_top_tracks/`,
        providesTags: ['TrackList'],
      }),
      getSongsByAlbum: builder.query({
        query: (albumID) => `/api/songs/?album=${albumID}&ordering=track_number`,
        providesTags: ['TrackList'],
      }),
      getAlbumDetails: builder.query({
        query: (albumID) => `api/albums/${albumID}/`,
        providesTags: ['TrackList'],
      }),
      createAlbum: builder.mutation({
        query: ({data}) => ({
          url: `api/albums/`,
          method: 'POST',
          body: data,
        }),
      }),
      uploadSong: builder.mutation({
        query: ({data}) => ({
          url: `api/songs/`,
          method: 'POST',
          body: data,
        }),
      }),
      updateSong: builder.mutation({
        query: ({songID, data}) => ({
          url: `api/songs/${songID}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['TrackList'],
      }),
      deleteSong: builder.mutation({
        query: (songID) => ({
          url: `api/songs/${songID}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['TrackList'],
      }),
      // followers
      updateFollowers: builder.mutation({
        query: ({username, data}) => ({
          url: `api/userdata/followers/${username}/`,
          method: 'PUT',
          body: data,
        }),
      }),
    })
  })

export const {
  useGetUserProfileDataQuery,
  useGetGenreListQuery,
  useGetUsersAlbumListQuery,
  useGetArtistsTopTracksQuery,
  useGetSongsByAlbumQuery,
  useLazyGetSongsByAlbumQuery,
  useGetAlbumDetailsQuery,
  useCreateAlbumMutation,
  useUploadSongMutation,
  useUpdateSongMutation,
  useDeleteSongMutation,
  useUpdateFollowersMutation,
} = artistsApiSlice