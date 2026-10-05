import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import TrackList from '../cards/TrackList';
import ProfileDetailsHeader from '../profile/ProfileDetailsHeader';
import { useGetPlaylistDetailsQuery, useGetTracksByPlaylistQuery } from './playlistsApiSlice';

const PlaylistDetails = () => {

  const { id } = useParams();
  const { data: playlist, isSuccess: isPlaylistSuccess } = useGetPlaylistDetailsQuery(id)
  const { data: trackList, isSuccess: isTrackSuccess } = useGetTracksByPlaylistQuery(id)

  return (
    <>
      {isPlaylistSuccess &&
			<div className=''>
				<ProfileDetailsHeader type={'playlist'} item={playlist}/>
        {isTrackSuccess &&
        <div className='profileContentContainer'>
          <TrackList items={trackList.results} type={'playlist'} parentItem={playlist} />
        </div>}
			</div>}
    </>
  )
};

export default PlaylistDetails;