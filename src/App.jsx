import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import RequireAuth from './components/auth/RequireAuth'
import Home from './components/home/Home'
import Search from './components/search/Search'
import MyUserProfile from './components/profile/MyUserProfile'
import Settings from './components/settings/Settings'
import ArtistsCreatePage from './components/artists/ArtistsCreatePage'
import ArtistProfile from './components/artists/ArtistProfile'
import AlbumDetails from './components/albums/AlbumDetails'
import HomeContent from './components/home/HomeContent'
import PlaylistDetails from './components/playlists/PlaylistDetails'
import SearchTracklist from './components/search/SearchTracklist'
import SearchResults from './components/search/SearchResults'
import LikedSongsPlaylist from './components/playlists/LikedSongsPlaylist'
import DefaultUserProfile from './components/profile/DefaultUserProfile'

function App() {

  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />}>
          {/* nested children paths go here with outlet */}
          <Route path="home" element={<HomeContent />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:keyword" element={<SearchResults />} />
          <Route path="genre/:id" element={<SearchTracklist />} />
          <Route path="profile" element={<MyUserProfile />} />
          <Route path="profile/:username" element={<DefaultUserProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="artists_profile/:username" element={<ArtistProfile />} />
          <Route path="artists_create" element={<ArtistsCreatePage />} />
          <Route path="album_details/:id" element={<AlbumDetails />} />
          <Route path="playlist_details/:id" element={<PlaylistDetails />} />
          <Route path="playlist_details/liked_songs" element={<LikedSongsPlaylist />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
