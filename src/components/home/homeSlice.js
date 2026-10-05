import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    bodyColor: '#272b37',
    sidebarCollapsed: false,
    nowPlaying: {
      song: null,
      album: null,
      playlist: null,
    },
    queue: [],
    likedSongs: [],
    likedSongsDetail: [],
    likedAlbums: [],
    likedPlaylists: [],
    library: [],
    following: []
  },
  reducers: {
    setBodyColor: (state, action) => {
      const color = action.payload
      state.bodyColor = color
    },
    // maintains the state for the sidebar
    setSidebarState: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setNowPlaying: (state, action) => {
      const nowPlaying = action.payload
      state.nowPlaying = nowPlaying
    },
    setQueue: (state, action) => {
      const queue = action.payload
      state.queue = queue
    },
    setLikedSongsList: (state, action) => {
      const songList = action.payload
      state.likedSongs = songList
    },
    setLikedSongsDetail: (state, action) => {
      const songList = action.payload
      state.likedSongsDetail = songList
    },
    setLikedAlbumsList: (state, action) => {
      const albumList = action.payload
      state.likedAlbums = albumList
    },
    setLikedPlaylists: (state, action) => {
      const playlist = action.payload
      state.likedPlaylists = playlist
    },
    setLibraryItems: (state, action) => {
      const libraryItems = action.payload
      state.library = libraryItems
    },
    setFollowingList: (state, action) => {
      const following = action.payload
      state.following = following
    }
  },
})

export const {
  setBodyColor,
  setSidebarState,
  setNowPlaying,
  setQueue,
  setLikedSongsList,
  setLikedSongsDetail,
  setLikedAlbumsList,
  setLikedPlaylists,
  setLibraryItems,
  setFollowingList,
} = homeSlice.actions

export default homeSlice.reducer

export const getBodyColor = (state) => state.home.bodyColor
export const getSidebarState = (state) => state.home.sidebarCollapsed
export const getNowPlaying = (state) => state.home.nowPlaying
export const getQueue = (state) => state.home.queue
export const getLikedSongsList = (state) => state.home.likedSongs
export const getLikedSongsDetail = (state) => state.home.likedSongsDetail
export const getLikedAlbumsList = (state) => state.home.likedAlbums
export const getLikedPlaylist = (state) => state.home.likedPlaylists
export const getLibraryItems = (state) => state.home.library
export const getFollowingList = (state) => state.home.following
