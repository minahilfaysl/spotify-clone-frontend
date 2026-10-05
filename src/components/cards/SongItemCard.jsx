import React, { useState, useEffect } from 'react';

import '../../styles/home/cards.scss'
import FavouriteSongButton from './FavouriteSongButton';
import PlayButton from '../player/PlayButton';
import SongOptionsDropdown from './SongOptionsDropdown';

/* for playlists: index, album art, title + artist, album, 
date-added, liked, duration */

/* for profile: index, album art, title + artist, album,
date-added (for playlists), liked, duration */

/* for artist profile: index, album art, title, streams,
liked, duration */

/* for album: index, title + artist, album, liked, duration */

/* song dropdown:
  1. Add to playlist
  2. Save to your Liked Songs
  3. Go to artist
  4. Go to album
  type = playlist, profile, artist
*/

const SongItemCard = ({ id, item, type, nowPlaying }) => {

  const song_id = type == 'playlist' ? item.song_details.id : item.id;
  const isNowPlaying = nowPlaying ? nowPlaying.id == song_id : false;

  const getFormattedDate = (date_added) => {
    let date = new Date(date_added)
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = date.getDate();
    let index = date.getMonth();
    let year = date.getFullYear();
    return month[index] + " " + day + ", " + year
  }

  const Section1 = () => {
    if (type == 'album') {
      return (
        <div className='songDetailsContainer'>
          <p className='songDetails title'>{item.song_name}</p>
          <p className='songDetails subtitle'>{item.album_details.artist_details.profile_name}</p>
        </div>
      )
    } else if (type == 'playlist') {
      return (
      <>
        <img className='songCardPicture' src={item.song_details.album_details.album_cover_photo}/>
        <div className='songDetailsContainer'>
          <p className='songDetails title'>{item.song_details.song_name}</p>
          <p className='songDetails subtitle'>{item.song_details.album_details.artist_details.profile_name}</p>
        </div>
      </>)
    } else {
      return (
      <>
        <img className='songCardPicture' src={item.album_details.album_cover_photo}/>
        <div className='songDetailsContainer'>
          <p className='songDetails title'>{item.song_name}</p>
          <p className='songDetails subtitle'>{item.album_details.artist_details.profile_name}</p>
        </div>
      </>)
    }
  }

  const Section2 = () => {
    if (type == 'artist') {
      return (<p className='songDetails subtitle'>{item.total_streams.toLocaleString()}</p>)
    } else if (type == 'profile') {
      return (<p className='songDetails subtitle'>{item.album_details.album_name}</p>)
    } else if (type == 'playlist') {
      return (
      <>
        <p className='songDetails subtitle'>{item.song_details.album_details.album_name}</p>
        <p className='songDetails subtitle'>{getFormattedDate(item.date_added)}</p>
      </>)
    } else {
      return (<p className='songDetails subtitle'></p>)
    }
  }

  const Section3 = () => {
    if (type == 'playlist') {
      return (<p className='songDetails subtitle'>{item.song_details.duration.slice(3,8)}</p>)
    } else {
      return (<p className='songDetails subtitle'>{item.duration.slice(3,8)}</p>) 
    }
  }

  return (
    <div className={`songCardContainer ${isNowPlaying}`}>
      <div className='songSection0'>
        <PlayButton item={item} isNowPlaying={isNowPlaying} type={type}/>
        <div className='songIndex'><p>{id+1}</p></div>
      </div>
      <div className='songSection1'>
        <Section1 />
      </div>
      <div className='songSection2'>
        <Section2 />
      </div>
      <div className='songSection3'>
        <FavouriteSongButton song={type == 'playlist' ? item.song_details : item} />
        <Section3 />
      </div>
      <div className='songSection4'>
        <div className='songOptions'>
          <SongOptionsDropdown track={item} type={type} />
        </div>
      </div>
    </div>
  )
};

export default SongItemCard;
