import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setNowPlaying, setQueue } from '../home/homeSlice';
import { useLazyGetSongsByAlbumQuery } from '../artists/artistsApiSlice';
import { useLazyGetTracksByPlaylistQuery } from '../playlists/playlistsApiSlice';


const PlayButton = ({ item, playlist, isNowPlaying, type }) => {
  let song = type == 'playlist' ? item.song_details : item
  const dispatch = useDispatch()
  
  const [ getTracksByPlaylist, playlistResult ] = useLazyGetTracksByPlaylistQuery()
  const [ getSongsByAlbum, albumResult ] = useLazyGetSongsByAlbumQuery()

  const playSong = async () => {
    // set song
    const nowPlaying = {
      song: song,
      album: type == "album" ? song.album_details : null,
      playlist: type == "playlist" ? item.playlist_details : null,
    }
    dispatch(setNowPlaying(nowPlaying))
    // set the queue
    if (type == "playlist") {
      // get playlist tracklist
      let result = await getTracksByPlaylist(item.playlist_details.id)
      if (result.isSuccess) {
        dispatch(setQueue(result.data.results))
      }
    } else {
      // get playlist tracklist
      let result = await getSongsByAlbum(item.album)
      if (result.isSuccess) {
        dispatch(setQueue(result.data.results))
      }
    }
  }

  const pauseSong = async () => {
    // TO-DO
    console.log('pause this song', song)
  }

  if (isNowPlaying) {
    return (
      <button className='songOptions' onClick={pauseSong}>
        <FaPause className='songOptions pause'/>
      </button>
    )
  } else {
    return (
      <button className='songOptions' onClick={playSong}>
        <FaPlay className='songOptions play'/>
      </button>
    )
  }
};

export default PlayButton;
