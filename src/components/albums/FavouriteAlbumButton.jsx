import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import '../../styles/home/cards.scss'
import { useAddToLikedAlbumsMutation, useUpdateRecentAlbumsMutation } from '../home/homeApiSlice';
import { getLikedAlbumsList } from '../home/homeSlice';

const FavouriteAlbumButton = ({ album }) => {
  const likedAlbumList = useSelector(getLikedAlbumsList);
  const [liked, setLiked] = useState(likedAlbumList.includes(album.id));
  const Icon = liked ? FaHeart : FaRegHeart;

  const user = useSelector(selectCurrentUser)
  const [ addToLikedAlbums, { isSuccess: isAddSuccess, isError, error  }] = useAddToLikedAlbumsMutation()
  const [ updateRecentAlbums, { isSuccess: isUpdateSuccess }] = useUpdateRecentAlbumsMutation()

  const updateRecentItems = async (username) => {
    try {
      let data = {"recently_played_albums": album.id}
      await updateRecentAlbums({username, data}).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  const addToFavourites = async () => {
    try {
      let data = {"liked_albums": album.id};
      let username = user.username
      let response = await addToLikedAlbums({username, data}).unwrap()
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
    <button onClick={addToFavourites}>
      <Icon className={`favourite-album ${liked}`}/>
    </button>
  )
};

export default FavouriteAlbumButton;
