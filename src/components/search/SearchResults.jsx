import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrackList from '../cards/TrackList';
import CardItemRow from '../cards/CardItemRow';
import { useGetSearchResultsQuery } from './searchApiSlice';

const SearchResults = () => {

  const { keyword } = useParams();
  const { data: search, isSuccess } = useGetSearchResultsQuery(keyword)

  return (
    <div className='searchResults'>
      {isSuccess && 
      <div>
        <TrackList type={'profile'} title={'Songs'} items={search.results.songs} />
        <CardItemRow id={'profile'} title={'Artists'} items={search.results.artists} />
        <CardItemRow id={'album'} title={'Albums'} items={search.results.albums} />
        <CardItemRow id={'playlist'} title={'Playlists'} items={search.results.playlists} />
        <CardItemRow id={'profile'} title={'Profiles'} items={search.results.profiles} />
      </div>}
    </div>
  )
};

export default SearchResults;