import { apiSlice } from "../../app/api/apiSlice";

export const searchApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: []})
  .injectEndpoints({
    endpoints: builder => ({
      getGenreDetail: builder.query({
        query: (genreID) => `api/genre/${genreID}/`,
      }),
      getGenreTrackList: builder.query({
        query: (genreID) => `api/songs/?album__genre=${genreID}&ordering=-album__album_publish_year/`,
      }),
      getSearchResults: builder.query({
        query: (keyword) => `api/userdata/search/${keyword}/`,
      }),
    })
  })

export const {
  useGetGenreDetailQuery,
  useGetGenreTrackListQuery,
  useGetSearchResultsQuery,
} = searchApiSlice