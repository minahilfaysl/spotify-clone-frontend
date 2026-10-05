import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from '../profile/ProfileDetailsHeader';
import { useGetSongsByAlbumQuery } from '../artists/artistsApiSlice';

const AlbumDetails = () => {
  const location = useLocation()
  const { item } = location.state

  const { data: songList, isSuccess } = useGetSongsByAlbumQuery(item.id)

  return (
    <>
			<div className=''>
				<ProfileDetailsHeader type={"album"} item={item}/>
        <div className='profileContentContainer'>
          {isSuccess &&
          <TrackList items={songList.results} type={'album'} />}
        </div>
			</div>
    </>
  )
};

export default AlbumDetails;