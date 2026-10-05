import React, { useState, useEffect } from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import '../../styles/home/mediaPlayer.scss'
import FavouriteSongButton from "../cards/FavouriteSongButton";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlaying, getQueue, setNowPlaying, setQueue } from "../home/homeSlice";
import { useIncrementStreamsMutation, useUpdateRecentAlbumsMutation, useUpdateRecentPlaylistsMutation } from "../home/homeApiSlice";
import { selectCurrentUser } from "../auth/authSlice";

const HomePlayer = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const nowPlaying = useSelector(getNowPlaying);
  const song = nowPlaying.song;
  const album = song ? song.album_details : null
  const playlist = nowPlaying.playlist
  const queue = [...useSelector(getQueue)]

  const [ incrementStreams, { isLoading }] = useIncrementStreamsMutation()
  const [ updateRecentAlbums, {  }] = useUpdateRecentAlbumsMutation()
  const [ updateRecentPlaylists, {  }] = useUpdateRecentPlaylistsMutation()

  const getNextSong = () => {
    let index = playlist
      ? queue.findIndex((obj) => obj.song_details.id === song.id)
      : queue.findIndex((obj) => obj.id === song.id);

    if (index > -1) {
      // increment index for new song
      index += 1
      if (queue.length > 0) {
        if (index == queue.length) {
          // start from the top, loop
          index = 0;
        }

        // set new song to play
        let nextSong = queue[index].playlist_details
          ? queue[index].song_details
          : queue[index];

        const nowPlayingNext = {
          song: nextSong,
          album: nowPlaying.album ? nextSong.album_details : null,
          playlist: nowPlaying.playlist ? playlist : null,
        }
        dispatch(setNowPlaying(nowPlayingNext))
      }
    }
    
  }

  const getPreviousSong = () => {
    let index = playlist
      ? queue.findIndex((obj) => obj.song_details.id === song.id)
      : queue.findIndex((obj) => obj.id === song.id);

    if (index > -1) {
      // decrement index for previous song
      index -= 1;
      if (queue.length > 0) {
        if (index == -1) {
          // start from the bottom, loop
          index = queue.length - 1;
        }

        // set new song to play
        let nextSong = queue[index].playlist_details
          ? queue[index].song_details
          : queue[index];

        const nowPlayingNext = {
          song: nextSong,
          album: nowPlaying.album ? nextSong.album_details : null,
          playlist: nowPlaying.playlist ? playlist : null,
        }
        dispatch(setNowPlaying(nowPlayingNext))
      }
      
    }
  }

  const handleOnPlay = async () => {
    try {
      let username = user.username
      // add to recently played items
      if (nowPlaying.album) {
        let data = {"recently_played_albums": album.id}
        await updateRecentAlbums({username, data}).unwrap()
      } else {
        let data = {"recently_played_playlists": playlist.id}
        await updateRecentPlaylists({username, data}).unwrap()
      }
    } catch (err) {
      // handle error
      console.log(err)
    }
  }

  const handleOnEnd = async () => {
    try {
      // increment streams when the song is ended
      await incrementStreams(song.id).unwrap();
    } catch (err) {
      // handle error
    }
    // set the next song in the list to play
    getNextSong()
  }

  return (
    <div className="playerContainer">
      <div className="playerSongDetails">
        {song && <>
          <img className="albumCover" src={album.album_cover_photo}/>
          <div className="details">
            <p>{song.song_name}</p>
            <p className="artistName">{album.artist_details.profile_name}</p>
          </div>
          <FavouriteSongButton song={song} />
        </>}
      </div>
      <AudioPlayer
        src={song ? song.audio_file : null}
        volume={0.5}
        style={{
          width: '70%'
        }}
        layout="stacked-reverse"
        showSkipControls
        showJumpControls={false}
        customProgressBarSection={
          [
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            <div style={{
              marginRight: '20px',
            }}/>,
            RHAP_UI.VOLUME,
          ]
        }
        customVolumeControls={[
          <div style={{
            width: '14vw',
          }}/>,
        ]}
        customAdditionalControls={[]}
        onPlay={handleOnPlay}
        onEnded={handleOnEnd}
        onClickNext={getNextSong}
        onClickPrevious={getPreviousSong}
      />
    </div>
  )
};

export default HomePlayer;