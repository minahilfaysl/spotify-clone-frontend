import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { readStored } from "../../app/storage";

const RequireAuth = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentToken = useSelector(selectCurrentToken)

  // after a page reload, restore the saved login (if it's valid)
  const storedToken = currentToken ? null : readStored('token')
  const storedUser = currentToken ? null : readStored('user')
  const canRestore = Boolean(storedToken?.access && storedUser)

  useEffect(() => {
    if (canRestore) {
      dispatch(setCredentials({ user: storedUser, token: storedToken }))
    }
  }, [canRestore])

  const token = currentToken || (canRestore ? storedToken : null)

  return (
    token
      ? <Outlet />
      : <Navigate to="/auth/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;
