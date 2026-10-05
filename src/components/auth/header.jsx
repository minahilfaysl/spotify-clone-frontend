import React from 'react';

import "../../styles/auth/header.scss";

const AuthHeader = () => (
  <div className='container'>
    <img className='logo' src='https://www.edigitalagency.com.au/wp-content/uploads/Spotify-Logo-png-RGB-White.png' alt='Spotify clone logo' />
    <p className='logoText'>Clone</p>
  </div>
);

export default AuthHeader;