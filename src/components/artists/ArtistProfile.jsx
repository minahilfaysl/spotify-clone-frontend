import React, { useState, useEffect } from 'react';
import CardItemRow from '../cards/CardItemRow';
import TrackList from '../cards/TrackList';
import FollowButton from './FollowButton';
import { useParams } from 'react-router-dom';
import ProfileDetailsHeader from '../profile/ProfileDetailsHeader';

import '../../styles/userProfile/profileContent.scss';
import { 
  useGetArtistsTopTracksQuery,
  useGetUserProfileDataQuery,
  useGetUsersAlbumListQuery 
} from './artistsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useGetPublicPlaylistsQuery } from '../playlists/playlistsApiSlice';


const ArtistProfile = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { username } = useParams();

  const { data: user, isSuccess: isSuccessUser } = useGetUserProfileDataQuery(username)
  const { data: albums, isSuccess: isSuccessAlbum } = useGetUsersAlbumListQuery(username)
  const { data: trackList, isSuccess: isSuccessTrackList} = useGetArtistsTopTracksQuery(username)
  const { data: playlists, isSuccess: isPlaylistSuccess } = useGetPublicPlaylistsQuery(username)


  return (
    <>
      {isSuccessUser &&
			<div className=''>
        <ProfileDetailsHeader item={user} type={'artist'}/>
        <div className='profileContentContainer'>
          {currentUser.username != username &&
          <FollowButton toFollow={user}/>}
          {isSuccessTrackList &&
          <TrackList type={'artist'} title={'Top tracks'} items={trackList.results} isPrivate={false}/>}
          {isSuccessAlbum && 
          <CardItemRow id={'album'} title={'Published albums'} items={albums.results} isPrivate={false} />}
          {isPlaylistSuccess &&
          <CardItemRow id={'playlist'} title={'Public playlists'} items={playlists.results} isPrivate={false} />}
        </div>
			</div>}
    </>
  )
};

export default ArtistProfile;