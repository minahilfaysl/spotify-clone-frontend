import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken, setCredentials } from "../auth/authSlice";
import { useUpdatePermissionMutation } from '../settings/settingsApiSlice';
import Switch from "react-switch";
import { setBodyColor } from "../home/homeSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))
  const token = JSON.parse(localStorage.getItem('token'))
  const [updatePermission, { isLoading }] = useUpdatePermissionMutation()

  const [isArtist, setIsArtist] = useState(user.is_artist)

  const updateUserPermissions = async () => {
    try {
      
      let username = user.username
			let data = {is_artist: !isArtist}
      const response = await updatePermission({username, data}).unwrap()
      // update state
      let updatedUser = {
        ...user,
        is_artist: response.is_artist,
      }
      setIsArtist(response.is_artist)
      dispatch(setCredentials({user: updatedUser, token: token}))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(setBodyColor("#272b37"));
  }, [])

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className='toggleButtonContainer'>
        <Switch
            height={16}
            width={32}
            handleDiameter={12}
            offHandleColor='#000'
            onHandleColor='#000'
            onColor='#1cd760'
            offColor='#b3b3b3'
            className='toggleButton'
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={updateUserPermissions} 
            checked={isArtist} 
        />
        <p>Upgrade to Artist</p>
      </div>
    </div>
  )
}

export default Settings;