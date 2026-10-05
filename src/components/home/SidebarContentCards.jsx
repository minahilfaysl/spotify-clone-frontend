import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

import "../../styles/home/sidebar.scss";
import { getSidebarState } from './homeSlice';


const SidebarContentCards = ({ item }) => {

  const isCollapsed = useSelector(getSidebarState)

  const getData = () => {
    if (item.album) {
      return {
        photo: item.album_details.album_cover_photo,
        title: item.album_details.album_name,
        subtitle: 'Album',
        type: 'square',
        link: `/album_details/${item.album_details.id}`
      }
    } else if (item.playlist) {
      return {
        photo: item.playlist_details.playlist_cover_photo,
        title: item.playlist_details.playlist_name,
        subtitle: 'Playlist',
        type: 'square',
        link: `/playlist_details/${item.playlist_details.id}`
      }
    } else if (item.liked_playlist) {
      return {
        photo: 'https://uploads-ssl.webflow.com/5e36e6f21212670638c0d63c/5e39d85cee05be53d238681a_likedSongs.png',
        title: 'Liked Songs',
        subtitle: 'Playlist',
        type: 'square',
        link: `/playlist_details/liked_songs`
      }
    }
    
    else { // for artists
      return {
        photo: item.artist_details.profile_photo,
        title: item.artist_details.profile_name,
        subtitle: 'Artist',
        type: 'circle',
        link: `/artists_profile/${item.artist_details.username}`
      }
    }
  }

  const { photo, title, subtitle, type, link } = getData()
	
  return (
    <div className="sidebarCard">
      <Link to={link}>
        <div className='sidebarCardContent'>
          <img className={`sidebarImage ${type}`} src={photo}/>
          {!isCollapsed && 
          <div>
            <p className='title'>{title}</p>
            <p className='subtitle'>{subtitle}</p>
          </div>}
        </div>
      </Link>
		</div>
  )
};

export default SidebarContentCards;