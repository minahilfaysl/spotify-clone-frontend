import React, { useState, useEffect } from 'react';
import { useGetGenreListQuery } from '../artists/artistsApiSlice';
import GenreCard from './GenreCard';

const GenreCardContainer = () => {

  const { data: genreList, isSuccess } = useGetGenreListQuery()

  return (
    <div className='genreCardContainer'>
      {isSuccess &&
        genreList.results.map((genre, index) => {
          return <GenreCard key={genre.id} item={genre} />
        })}
    </div>

  )
}

export default GenreCardContainer;