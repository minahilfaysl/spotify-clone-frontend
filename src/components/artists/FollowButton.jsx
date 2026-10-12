import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../../styles/userProfile/profileContent.scss';

import { selectCurrentUser } from '../auth/authSlice';
import { useUpdateFollowingMutation } from '../profile/usersApiSlice';
import { getFollowingList, setFollowingList } from '../home/homeSlice';

const FollowButton = ({ toFollow }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const followingList = [...useSelector(getFollowingList)];
  const [isFollowing , setIsFollowing ] = useState(followingList.includes(toFollow.id))

  const [ updateFollowing ] = useUpdateFollowingMutation()

  const handleClick = async () => {
    try {
      // one request: the backend updates my "following" and their
      // "followers" together, so the two lists can't get out of sync
      const response = await updateFollowing({
        username: user.username,
        data: { following: toFollow.username },
      }).unwrap();

      if (response.status.includes("added")) {
        setIsFollowing(true)
        dispatch(setFollowingList([...followingList, toFollow.id]))
      } else {
        setIsFollowing(false);
        dispatch(setFollowingList(followingList.filter((id) => id !== toFollow.id)))
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