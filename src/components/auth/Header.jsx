import React from 'react';

import "../../styles/auth/header.scss";
import logo from '../../assets/icons/spotify-logo-white-text.png';

const AuthHeader = () => (
  <div className='container'>
    <img className='logo' src={logo} alt='Spotify clone logo' />
    <p className='logoText'>Clone</p>
  </div>
);

export default AuthHeader;
