import React, { useState, useEffect } from 'react';
import { GoClock } from "react-icons/go";
import { useSelector } from "react-redux";
import { getNowPlaying } from "../home/homeSlice";

import '../../styles/home/cards.scss';
import SongItemCard from './SongItemCard';
import FavouriteAlbumButton from '../albums/FavouriteAlbumButton';
import FavouritePlaylistButton from '../playlists/FavouritePlaylistButton';

const TrackList = ({title, items, isPrivate=false, type, parentItem}) => {

  const nowPlaying = useSelector(getNowPlaying)

  const ContentToShow = () => {
    if (items.length > 0) {
      return (
        <div className='itemsCol'>
          {items.map((item, index) => (
            <SongItemCard key={index}
              id={index}
              item={item}
              type={type}
              nowPlaying={nowPlaying.song} />
          ))}
        </div>
      )
    } else {
      return (
        <p>No tracks available</p>
      )
    }
  }

  return (
    <div className='itemsContainer'> 
      {type == "album" &&
        <FavouriteAlbumButton album={parentItem} />}
      {type == "playlist" &&
        <FavouritePlaylistButton playlist={parentItem} />}
      {title 
      ? <h3>{title}</h3>
      : <>
        <div className='trackListHeader'>
          <div className='title'>
            <p>#</p>
            <p>Title</p>
          </div>
          <GoClock />
        </div>
        <div className='menuDivider'/>
      </>}
      {isPrivate &&
      <p className='itemsSubtitle'>Only visible to you</p>}
      <ContentToShow />
    </div>
  )
};

export default TrackList;