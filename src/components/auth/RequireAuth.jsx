import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";

const RequireAuth = () => {
  const location = useLocation()
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser)

  return (
    token && user
      ? <Outlet />
      : <Navigate to="/auth/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;
