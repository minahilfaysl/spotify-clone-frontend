import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";

import '../../styles/home/cards.scss'

const FavouriteButton = ({ song }) => {
  const [liked, setLiked] = useState(song.liked);
  const Icon = liked ? FaHeart : FaRegHeart;

  const addToFavourites = async () => {
    setLiked(!liked);
    console.log('add this song to the users liked songs at the backend')
  }

  return (
    <button onClick={addToFavourites}>
      <Icon className={`favourite ${liked}`}/>
    </button>
  )
};

export default FavouriteButton;
