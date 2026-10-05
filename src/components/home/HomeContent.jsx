import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import RecentlyPlayedCards from '../cards/RecentlyPlayedCards';
import {
  useGetFollowingListQuery,
  useGetLikedAlbumsListQuery,
  useGetLikedPlaylistsQuery,
  useGetLikedSongsListQuery,
  useGetNewPlaylistsQuery,
  useGetNewReleasesQuery,
  useGetRecentlyPlayedItemsQuery
} from './homeApiSlice';
import { 
  setFollowingList,
  setLikedAlbumsList,
  setLikedPlaylists,
  setLikedSongsList,
  setLikedSongsDetail,
  setBodyColor,
} from './homeSlice';
import CardItemRow from '../cards/CardItemRow';
import { prominent } from 'color.js';


const HomeContent = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const { data: followingList, isSuccess: isListSuccess } = useGetFollowingListQuery(user.username)
  const { data: likedSongsList, isSuccess: isSongSuccess } = useGetLikedSongsListQuery(user.username)
  const { data: likedAlbumsList, isSuccess: isAlbumSuccess } = useGetLikedAlbumsListQuery(user.username)
  const { data: likedPlaylists, isSuccess: isPlaylistSuccess } = useGetLikedPlaylistsQuery(user.username)
  const { data: recentItems, isSuccess } = useGetRecentlyPlayedItemsQuery(user.username)
  const { data: newReleases, isSuccess: isReleaseSuccess } = useGetNewReleasesQuery()
  const { data: newPlaylists, isSuccess: isNewPlaylistSuccess } = useGetNewPlaylistsQuery()


  let getGreeting = () => {
    var today = new Date()
    var currentHour = today.getHours()

    if (currentHour < 12) {
      return 'Good morning'
    } else if (currentHour < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  useEffect(() => {
    // set state for the list of liked items
    if (isSongSuccess) {
      dispatch(setLikedSongsList(likedSongsList.liked_songs)) 
      dispatch(setLikedSongsDetail(likedSongsList.liked_songs_detail)) 
    }
    if (isAlbumSuccess) {
      dispatch(setLikedAlbumsList(likedAlbumsList.liked_albums))
    }
    if (isPlaylistSuccess) {
      dispatch(setLikedPlaylists(likedPlaylists.liked_playlists))
    }
    if (isListSuccess) {
      dispatch(setFollowingList(followingList.following))
    }
    if (isSuccess) {
      if (recentItems.recents_list.length > 0) {
        const photo = recentItems.recents_list[0].playlist_details
                      ? recentItems.recents_list[0].playlist_details.playlist_cover_photo
                      : recentItems.recents_list[0].album_details.album_cover_photo;
        prominent(photo, {
          format: 'hex',
          amount: 1,
        }).then((color) => dispatch(setBodyColor(color)));
      } else {
        dispatch(setBodyColor("#272b37"))
      }
    }
  }, 
  [ isSuccess,
    isPlaylistSuccess,
    isSongSuccess,
    isAlbumSuccess,
    isListSuccess])

  return (
    <div className='homeContentContainer'>
			<h2>{getGreeting()}</h2>
      <div className='recentlyPlayedContainer'>
        {isSuccess && recentItems.recents_list.map((item, index) => {
          return <RecentlyPlayedCards key={index} item={item}/>
        })}
      </div>
      {isReleaseSuccess && <CardItemRow id={'album'} title={'New Releases'} items={newReleases.results} isPrivate={false} />}
      {isNewPlaylistSuccess && <CardItemRow id={'playlist'} title={'New Playlists'} items={newPlaylists.results} isPrivate={false} />}
      {isListSuccess && <CardItemRow id={'following'} title={'Profiles You Follow'} items={followingList.following_details} isPrivate={false} />}
      <div style={{marginBottom: '150px'}} />
    </div>
  )
};

export default HomeContent;