import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import '../../styles/home/cards.scss'
import { useAddToLikedPlaylistsMutation, useUpdateRecentPlaylistsMutation } from '../home/homeApiSlice';
import { getLikedPlaylist } from '../home/homeSlice';
import PlaylistOptionsDropdown from './PlaylistOptionsDropdown';

const FavouritePlaylistButton = ({ playlist }) => {
  const likedPlaylists = useSelector(getLikedPlaylist);
  const [liked, setLiked] = useState(likedPlaylists.includes(playlist.id));
  const Icon = liked ? FaHeart : FaRegHeart;

  const user = useSelector(selectCurrentUser)
  const [ addToLikedPlaylists, { isSuccess: isAddSuccess, isError, error }] = useAddToLikedPlaylistsMutation()
  const [ updateRecentPlaylists, { isSuccess: isUpdateSuccess }] = useUpdateRecentPlaylistsMutation()

  const updateRecentItems = async (username) => {
    try {
      let data = {"recently_played_playlists": playlist.id}
      await updateRecentPlaylists({username, data}).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  const addToFavourites = async () => {
    try {
      let data = {"liked_playlists": playlist.id};
      let username = user.username
      let response = await addToLikedPlaylists({username, data}).unwrap()
      if (response.status.includes("added")) {
        setLiked(true);
      } else {
        setLiked(false);
      }

      // update recently added items
      if (isAddSuccess && !isError) {
        updateRecentItems(username)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='playlist-options-container'>
    <button onClick={addToFavourites}>
      <Icon className={`favourite-album ${liked}`}/>
    </button>
    <PlaylistOptionsDropdown playlist={playlist} />
    </div>
  )
};

export default FavouritePlaylistButton;
