import React from 'react';

import "../../styles/home/header.scss";
import ProfileDropdown from './ProfileDropDown';
import SearchInputBar from '../search/SearchInputBar';

const HomeHeader = () => {
    return (
    <div className='homeHeaderContainer'>
      <SearchInputBar />
      <ProfileDropdown />
    </div>
  );
}

export default HomeHeader;