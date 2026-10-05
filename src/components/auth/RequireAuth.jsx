import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

const RequireAuth = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  let getToken = () => {
    // check if user and token are stored in local storage
    let token = useSelector(selectCurrentToken)
    if (!token) {
      const storedToken = JSON.parse(localStorage.getItem('token'))
      const user = JSON.parse(localStorage.getItem('user'))
      // if stored credentials exist, restore credentials
      dispatch(setCredentials({user, token: storedToken}))
      return storedToken
    }
    return token
  }

  const token = getToken()

  return (
    token
      ? <Outlet />
      : <Navigate to="/auth/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;