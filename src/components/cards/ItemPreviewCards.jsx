import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/home/cards.scss'

/* Works for artist and album cards
  title, type, picture
  types can be 'artist' or 'album' or 'playlist' or 'profile'
*/

const ItemPreviewCards = ({item, type}) => {
  let newType = type == 'followers' || type == 'following' ? 'profile' : type;
  
  const getData = () => {
    if (newType == "playlist") {
      return {
        photo: item.playlist_cover_photo,
        title: item.playlist_name,
        link: `/playlist_details/${item.id}`
      }
    } if (newType == "profile") {
      return {
        photo: item.profile_photo,
        title: item.profile_name,
        link: item.is_artist
          ? `/artists_profile/${item.username}`
          : `/profile/${item.username}`
      }
    } if (newType == "artist") {
      return {
        photo: item.artist_details.profile_photo,
        title: item.artist_details.profile_name,
        link: `/artists_profile/${item.artist_details.username}`
      }
    }else {
      return {
        photo: item.album_cover_photo,
        title: item.album_name,
        link: `/album_details/${item.id}`
      }
    }
  }

  const {photo, title, link} = getData()

  return (
    <Link to={link}>
      <div className='previewCardContainer'>
        <img className={`previewCardPicture ${newType}`} src={photo}/>
        <p className='previewCard title'>{title}</p>
        <p className='previewCard subtitle'>{newType}</p>
      </div>
    </Link>
  )
};

export default ItemPreviewCards;