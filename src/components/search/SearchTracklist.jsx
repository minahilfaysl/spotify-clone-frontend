import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TrackList from '../cards/TrackList';
import { useGetGenreDetailQuery, useGetGenreTrackListQuery } from './searchApiSlice';
import { useDispatch } from 'react-redux';
import { setBodyColor } from '../home/homeSlice';

const SearchTracklist = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: genreDetail, isSuccess: isGenreSuccess } = useGetGenreDetailQuery(id)
  const { data: songList, isSuccess: isTrackSuccess } = useGetGenreTrackListQuery(id)

  useEffect(() => {
    if (isGenreSuccess) {
      dispatch(setBodyColor(genreDetail.color))
    }
  }, [isGenreSuccess])
  

  return (
    <>
      {isGenreSuccess &&
      <div className='userDetailsContainer'>
        <div className='userDetails'>
          <p className='capitalize'>Genre</p>
          <h1>{genreDetail.genre_name}</h1>
          <p>All recent {genreDetail.genre_name} songs are available in this playlist</p>
        </div>
      </div>}
			<div className=''>
        {isTrackSuccess &&
        <div className='profileContentContainer'>
          <TrackList items={songList.results} type={'genre'} parentItem={songList.results.album_details} />
        </div>}
			</div>
    </>
  )
};

export default SearchTracklist;