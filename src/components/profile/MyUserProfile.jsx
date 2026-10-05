import React, { useState, useEffect } from 'react';
import { selectCurrentUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import CardItemRow from '../cards/CardItemRow';
import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from './ProfileDetailsHeader';

import '../../styles/userProfile/profileContent.scss';
import { useGetPlaylistsQuery } from '../playlists/playlistsApiSlice';
import { useGetFollowedArtistsQuery, useGetFollowersListQuery } from './usersApiSlice';
import { useGetFollowingListQuery } from '../home/homeApiSlice';
import { getLikedSongsDetail } from '../home/homeSlice';


const MyUserProfile = () => {
  const user = useSelector(selectCurrentUser)
  let data = useSelector(getLikedSongsDetail)
  const likedSongsDetail = data.length > 4 ? data.slice(0, 4) : data;
  const { data: artists, isSuccess: isArtistSuccess } = useGetFollowedArtistsQuery(user.username)
  const { data: playlists, isSuccess: isPlaylistSuccess } = useGetPlaylistsQuery(user.username)
  const { data: followers, isSuccess: isFollowersSuccess } = useGetFollowersListQuery(user.username)
  const { data: following, isSuccess: isFollowingSuccess } = useGetFollowingListQuery(user.username)
  

  return (
    <>
			<div className=''>
				<ProfileDetailsHeader item={user} type={'profile'}/>
        <div className='profileContentContainer'>
          {isArtistSuccess &&
            <CardItemRow id={'artist'} title={'Artists you follow'} items={artists.artist_list.slice(0, 4)} isPrivate={true} />}
          <TrackList type={'profile'} title={'Liked tracks'} items={likedSongsDetail} isPrivate={true}/>
          {isPlaylistSuccess 
            && <CardItemRow id={'playlist'} title={'Your playlists'} items={playlists.results} isPrivate={false} />}
          {isFollowersSuccess 
            && <CardItemRow id={'followers'} title={'Followers'} items={followers.follower_details} isPrivate={false} />}
          {isFollowingSuccess 
            && <CardItemRow id={'following'} title={'Following'} items={following.following_details} isPrivate={false} />}
        </div>
			</div>
    </>
  )
};

export default MyUserProfile;