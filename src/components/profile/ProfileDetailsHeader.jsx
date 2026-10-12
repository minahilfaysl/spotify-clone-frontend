import React, { useState } from 'react';
import EditProfileModal from '../profile/EditProfileModal';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { prominent } from 'color.js'

import "../../styles/userProfile/detailsHeader.scss";
import { setBodyColor } from '../home/homeSlice';
import photoOverlay from '../../assets/photo_overlay.png';
import { useGetPublicPlaylistsQuery } from '../playlists/playlistsApiSlice';
import { useGetFollowersListQuery } from './usersApiSlice';
import { useGetFollowingListQuery } from '../home/homeApiSlice';
import { useGetArtistSongsQuery } from '../artists/artistsApiSlice';

const plural = (count, word) => `${count.toLocaleString()} ${word}${count === 1 ? '' : 's'}`

// Real counts for the profile and artist headers (these queries are shared
// with the rest of the page, so they don't cost extra requests).
const useProfileStats = (type, item) => {
  const isPerson = type === 'profile' || type === 'artist'
  const username = item?.username
  const skip = !isPerson || !username
  const { data: playlists } = useGetPublicPlaylistsQuery(username, { skip: skip || type !== 'profile' })
  const { data: followers } = useGetFollowersListQuery(username, { skip })
  const { data: following } = useGetFollowingListQuery(username, { skip: skip || type !== 'profile' })
  const { data: songs } = useGetArtistSongsQuery(item?.id, { skip: skip || type !== 'artist' })

  const followerCount = followers?.followers?.length ?? 0
  if (type === 'artist') {
    const streams = (songs?.results ?? []).reduce((sum, song) => sum + (song.total_streams || 0), 0)
    return `${plural(followerCount, 'follower')} • ${plural(streams, 'stream')}`
  }
  return [
    plural(playlists?.count ?? 0, 'Public Playlist'),
    plural(followerCount, 'Follower'),
    `${(following?.following?.length ?? 0).toLocaleString()} Following`,
  ].join(' • ')
}

const ProfileDetailsHeader = ({ type, item }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  // for edit profile modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const profileStats = useProfileStats(type, item)

  const getData = () => {
    if (type == 'playlist' ) {
      return {
        photo: item.playlist_cover_photo,
        name: item.playlist_name,
        details: item.description,
        isOwner: false,
      }
    } else if (type == 'album') {
      return {
        photo: item.album_cover_photo,
        name: item.album_name,
        details: `${item.artist_details.profile_name} • ${item.album_publish_year}`,
        isOwner: false,
      }
    } else if (type == 'artist') { // for user profile
      return { 
        photo: item.profile_photo,
        name: item.profile_name,
        details: profileStats,
        isOwner: user.id == item.id,
      }
    } else { // for user profile
      return { 
        photo: item.profile_photo,
        name: item.profile_name,
        details: profileStats,
        isOwner: user.id == item.id,
      }
    }
  }

  const dataToDisplay = getData();

  prominent(dataToDisplay.photo, {
    format: 'hex',
    amount: 1,
  }).then((color) => dispatch(setBodyColor(color)));

  const HeaderBasedOnPermission = () => {
    if ((type == 'profile' || type == 'artist') && dataToDisplay.isOwner) {
      return (
        <button className='openModalButton' onClick={handleModalOpen}>
          <img className='userProfilePicture' src={dataToDisplay.photo}/>
          <img className='photoUploadOption' src={photoOverlay}/>
        </button>
      )
    } else if (type == 'profile' || type == 'artist') {
      return (<img className='userProfilePicture' src={dataToDisplay.photo}/>)
    } else {
      return (<img className='coverPicture' src={dataToDisplay.photo}/>)
    }
  }

  return (
    <div className='userDetailsContainer'>
      <HeaderBasedOnPermission />

      <div className='userDetails'>
        <p className='capitalize'>{type}</p>
        <h1>{dataToDisplay.name}</h1>
        <p>{dataToDisplay.details}</p>
      </div>
      
      <EditProfileModal open={open} handleModalClose={handleModalClose}/>
      
    </div>
  )
};

export default ProfileDetailsHeader;