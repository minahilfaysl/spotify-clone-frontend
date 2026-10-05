import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import '../../styles/home/cards.scss'
import { useAddToLikedSongsMutation } from '../home/homeApiSlice';
import { getLikedSongsList, setLikedSongsList } from '../home/homeSlice';

const FavouriteSongButton = ({ song }) => {
  const dispatch = useDispatch()
  const likedSongList = [...useSelector(getLikedSongsList)];
  const [liked, setLiked] = useState(likedSongList.includes(song.id));
  const Icon = liked ? FaHeart : FaRegHeart;

  const user = useSelector(selectCurrentUser)
  const [ addToLikedSongs, { isLoading }] = useAddToLikedSongsMutation()

  const addToFavourites = async () => {
    try {
      let data = {"liked_songs": song.id};
      let username = user.username
      let response = await addToLikedSongs({username, data}).unwrap()
      if (response.status.includes("added")) {
        setLiked(true);
        likedSongList.push(song.id)
        dispatch(setLikedSongsList(likedSongList))
      } else {
        setLiked(false);
        likedSongList.pop(song.id)
        dispatch(setLikedSongsList([...likedSongList]))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setLiked(likedSongList.includes(song.id));
  }, [likedSongList])
  

  return (
    <button onClick={addToFavourites}>
      <Icon className={`favourite ${liked}`}/>
    </button>
  )
};

export default FavouriteSongButton;
