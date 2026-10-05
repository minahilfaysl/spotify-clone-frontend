import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from '../profile/ProfileDetailsHeader';
import { useGetAlbumDetailsQuery, useGetSongsByAlbumQuery } from '../artists/artistsApiSlice';

const AlbumDetails = () => {

  const { id } = useParams();
  const { data: album, isSuccess: isAlbumSuccess } = useGetAlbumDetailsQuery(id)
  const { data: songList, isSuccess: isTrackSuccess } = useGetSongsByAlbumQuery(id)

  return (
    <>
      {isAlbumSuccess &&
			<div className=''>
				<ProfileDetailsHeader type={"album"} item={album}/>
        {isTrackSuccess &&
        <div className='profileContentContainer'>
          <TrackList items={songList.results} type={'album'} parentItem={album} />
        </div>}
			</div>}
    </>
  )
};

export default AlbumDetails;