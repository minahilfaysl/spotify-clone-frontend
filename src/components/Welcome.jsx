import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./auth/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  return (
    <div>welcome</div>
  )
}

export default Welcome;