import React, { useState, useEffect } from 'react';
import { useGetGenreListQuery } from '../artists/artistsApiSlice';
import GenreCardContainer from './GenreCardContainer';

import '../../styles/home/search.scss'
import { useDispatch } from 'react-redux';
import { setBodyColor } from '../home/homeSlice';

const Search = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBodyColor("black"));
  }, [])

  return (
    <div>
      <h3>Browse All</h3>
      <GenreCardContainer />
    </div>
  )
}

export default Search;