import React, { useState, useEffect } from 'react';
import { selectCurrentUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardItemRow from '../cards/CardItemRow';
import ProfileDetailsHeader from './ProfileDetailsHeader';
import FollowButton from '../artists/FollowButton';
import '../../styles/userProfile/profileContent.scss';
import { useGetPlaylistsQuery } from '../playlists/playlistsApiSlice';
import { useGetFollowersListQuery } from './usersApiSlice';
import { useGetFollowingListQuery } from '../home/homeApiSlice';
import { useGetUserProfileDataQuery } from '../artists/artistsApiSlice';


const DefaultUserProfile = () => {
  const { username } = useParams();

  const { data: user, isSuccess: isSuccessUser } = useGetUserProfileDataQuery(username)
  const { data: playlists, isSuccess: isPlaylistSuccess } = useGetPlaylistsQuery(username)
  const { data: followers, isSuccess: isFollowersSuccess } = useGetFollowersListQuery(username)
  const { data: following, isSuccess: isFollowingSuccess } = useGetFollowingListQuery(username)

  return (
    <>
      {isSuccessUser &&
			<div className=''>
				<ProfileDetailsHeader item={user} type={'profile'}/>
        <div className='profileContentContainer'>
          <FollowButton toFollow={user}/>
          {isPlaylistSuccess 
            && <CardItemRow id={'playlist'} title={'Public playlists'} items={playlists.results} isPrivate={false} />}
          {isFollowersSuccess 
            && <CardItemRow id={'followers'} title={'Followers'} items={followers.follower_details} isPrivate={false} />}
          {isFollowingSuccess 
            && <CardItemRow id={'following'} title={'Following'} items={following.following_details} isPrivate={false} />}
        </div>
			</div>}
    </>
  )
};

export default DefaultUserProfile;