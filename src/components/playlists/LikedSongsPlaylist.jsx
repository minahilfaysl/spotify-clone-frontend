import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../auth/authSlice";
import { useGetLikedSongsListQuery } from '../home/homeApiSlice';
import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from '../profile/ProfileDetailsHeader';


const LikedSongsPlaylist = () => {
  const user = useSelector(selectCurrentUser)
  const { data: trackList, isSuccess: isTrackSuccess } = useGetLikedSongsListQuery(user.username)

  const playlist = {
    playlist_cover_photo: 'https://uploads-ssl.webflow.com/5e36e6f21212670638c0d63c/5e39d85cee05be53d238681a_likedSongs.png',
    playlist_name: 'Liked Songs',
    description: 'All of your liked songs in one playlist',
  }

  return (
    <>
			<div className=''>
				<ProfileDetailsHeader type={'playlist'} item={playlist}/>
        {isTrackSuccess &&
        <div className='profileContentContainer'>
          <TrackList items={trackList.liked_songs_detail} type={'liked_songs'} />
        </div>}
			</div>
    </>
  )
};

export default LikedSongsPlaylist;