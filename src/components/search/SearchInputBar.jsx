import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchInputBar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    navigate(value ? `/search/${encodeURIComponent(value)}` : '/search')
  }

  if (location.pathname.includes('/search')) {
    return (
      <div className='searchBarContainer' >
        <FaSearch className='FaSearch' />
        <input
          autoFocus
          autoComplete="off"
          className='searchBar'
          value={searchInput}
          onChange={handleChange}
          placeholder='What do you want to listen to?'
          type="text"
          id="searchBar"
          name="searchBar"
        />
      </div>
    )
  } else {
    return (<div></div>)
  }
};

export default SearchInputBar;