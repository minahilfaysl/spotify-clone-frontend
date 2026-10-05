import React, { useState } from 'react';
import EditProfileModal from '../profile/EditProfileModal';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { prominent } from 'color.js'

import "../../styles/userProfile/detailsHeader.scss";
import { setBodyColor } from '../home/homeSlice';

const ProfileDetailsHeader = ({ type, item }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  // for edit profile modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

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
        details: `8M followers • 1,234,567 streams`,
        isOwner: user.id == item.id,
      }
    } else { // for user profile
      return { 
        photo: item.profile_photo,
        name: item.profile_name,
        details: `14 Public Playlists • 4 Followers • 81 Following`,
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
          <img className='photoUploadOption' src={'src/assets/photo_overlay.png'}/>
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