import React from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import '../../styles/userProfile/detailsHeader.scss'
import photoOverlay from '../../assets/photo_overlay.png';

const UserDetailsHeader = ({ handleModalOpen }) => {
  const user = useSelector(selectCurrentUser)

  return (
    <div className='userDetailsContainer'>
      <button className='openModalButton' onClick={handleModalOpen}>
        <img className='userProfilePicture' src={user.profile_photo}/>
        <img className='photoUploadOption' src={photoOverlay}/>
      </button>
      <div className='userDetails'>
        <p>Profile</p>
        <h1>{user.profile_name}</h1>
        <p>13 Public Playlists • 4 Followers • 81 Following</p>
      </div>
    </div>
  )
};

export default UserDetailsHeader;