import React, { useState, useEffect } from 'react';
import { selectCurrentUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import CardItemRow from '../cards/CardItemRow';
import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from './ProfileDetailsHeader';

import '../../styles/userProfile/profileContent.scss';

const UserProfile = () => {
  const user = useSelector(selectCurrentUser)

  const img = "https://i.pinimg.com/564x/4f/6e/c3/4f6ec37acb21482366d04d5a25662a00.jpg"
  const img1 = "https://i.pinimg.com/originals/08/35/12/08351200d5356e9f2de0020f041ec310.jpg"
  const img2 = "https://i.pinimg.com/736x/f5/cf/11/f5cf11d4ba99257b6b810efa8db21e34.jpg";
  const img3 = "https://i.pinimg.com/1200x/41/43/12/414312122bb914c419477cea7e932256.jpg";
  const img4 = "https://i.pinimg.com/736x/1c/8e/80/1c8e80b17c4497bca474f16ece9b0022.jpg";

  const topArtists = [
    {
      title: 'Artist One',
      picture: img,
    },
    {
      title: 'Artist Two',
      picture: img,
    },
    {
      title: 'Artist Three',
      picture: img,
    },
    {
      title: 'Artist Four',
      picture: img,
    },
  ]

  const topTracks = [
    {
      song_name: 'Song Title One',
      album_details: {
        id: 2,
        album_name: 'Album Name',
        album_cover_photo: img4,
        artist_details: {
          id: 3,
          profile_name: 'Artist Name',
        },
      },
      duration: '00:01:20',
    },
    {
      song_name: 'Song Title Two',
      album_details: {
        id: 2,
        album_name: 'Album Name',
        album_cover_photo: img4,
        artist_details: {
          id: 3,
          profile_name: 'Artist Name',
        },
      },
      duration: '00:01:20',
    },
    {
      song_name: 'Song Title Three',
      album_details: {
        id: 2,
        album_name: 'Album Name',
        album_cover_photo: img4,
        artist_details: {
          id: 3,
          profile_name: 'Artist Name',
        },
      },
      duration: '00:01:20',
    },
    {
      song_name: 'Song Title Four',
      album_details: {
        id: 2,
        album_name: 'Album Name',
        album_cover_photo: img4,
        artist_details: {
          id: 3,
          profile_name: 'Artist Name',
        },
      },
      duration: '00:01:20',
    },
  ]

  const playlists = [
    {
      title: 'Playlist One',
      picture: img1,
    },
    {
      title: 'Playlist Two',
      picture: img1,
    },
    {
      title: 'Playlist Three',
      picture: img1,
    },
    {
      title: 'Playlist Four',
      picture: img1,
    },
  ]

  const followers = [
    {
      title: 'Follower One',
      picture: img2,
    },
    {
      title: 'Follower Two',
      picture: img2,
    },
    {
      title: 'Follower Three',
      picture: img2,
    },
    {
      title: 'Follower Four',
      picture: img2,
    },
  ]

  const following = [
    {
      title: 'Following One',
      picture: img3,
    },
    {
      title: 'Following Two',
      picture: img3,
    },
    {
      title: 'Following Three',
      picture: img3,
    },
    {
      title: 'Following Four',
      picture: img3,
    },
  ]

  return (
    <>
			<div className=''>
				<ProfileDetailsHeader item={user} type={'profile'}/>
        <div className='profileContentContainer'>
          {/* <CardItemRow id={'artists'} title={'Top artists this month'} items={topArtists} isPrivate={true} /> */}
          <TrackList type={'profile'} title={'Top tracks this month'} items={topTracks} isPrivate={true}/>
          {/* <CardItemRow id={'playlists'} title={'Public Playlists'} items={playlists} isPrivate={false} />
          <CardItemRow id={'followers'} title={'Followers'} items={followers} isPrivate={false} />
          <CardItemRow id={'following'} title={'Following'} items={following} isPrivate={false} /> */}
        </div>
        <p>footer</p>
			</div>
    </>
  )
};

export default UserProfile;