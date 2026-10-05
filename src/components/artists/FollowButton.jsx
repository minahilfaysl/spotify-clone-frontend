import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../../styles/userProfile/profileContent.scss';

import { selectCurrentUser } from '../auth/authSlice';
import { useUpdateFollowersMutation } from './artistsApiSlice';
import { useUpdateFollowingMutation } from '../profile/usersApiSlice';
import { getFollowingList } from '../home/homeSlice';

const FollowButton = ({ toFollow }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const followingList = [...useSelector(getFollowingList)];
  const [isFollowing , setIsFollowing ] = useState(followingList.includes(toFollow.id))

  const [ updateFollowers, { isSuccess: isFollowerSuccess }] = useUpdateFollowersMutation()
  const [ updateFollowing, { isSuccess: isFollowingSuccess }] = useUpdateFollowingMutation()

  const handleClick = async () => {
    try {
      // update followers list
      let data = {followers: user.username}
      let username = toFollow.username
      await updateFollowers({username, data}).unwrap();

      // update following list
      data = {following: toFollow.username}
      username = user.username
      let response = await updateFollowing({username, data}).unwrap();
      if (response.status.includes("added")) {
        setIsFollowing(true)
        followingList.push(toFollow.id)
        dispatch(setLikedSongsList(followingList))
      } else {
        setIsFollowing(false);
        followingList.pop(toFollow.id)
        dispatch(setLikedSongsList([...followingList]))
      }
    } catch (err) {
      // handle error
      console.log(err)
    }
  }

  return (
    <button className='followButton' onClick={handleClick}>
      <p>{isFollowing ? "Following" : "Follow"}</p>
    </button>
  )
};

export default FollowButton;