import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/home/cards.scss'

/* Works for artist and album cards
  title, type, picture
  types can be 'artist' or 'album' or 'playlist' or 'profile'
*/

const RecentlyPlayedCards = ({item}) => {

  const getItemDetails = () => {
    if (item.playlist_details) {
      return {
        title: item.playlist_details.playlist_name,
        photo: item.playlist_details.playlist_cover_photo,
        link: `/playlist_details/${item.playlist_details.id}`
      }
    } else {
      return {
        title: item.album_details.album_name,
        photo: item.album_details.album_cover_photo,
        link: `/album_details/${item.album_details.id}`
      }
    }
  }

  const {title, photo, link} = getItemDetails()

  return (
    <Link to={link}>
      <div className='recentsCardContainer'>
          <img className='recentsCardPicture' src={photo}/>
          <p className='title'>{title}</p>
        </div>
    </Link>
  )
};

export default RecentlyPlayedCards;