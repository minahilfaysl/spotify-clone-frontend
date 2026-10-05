import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../auth/authSlice';

import "../../styles/home/dropdown.scss";
import { logout } from "../../components/auth/authSlice";

const ProfileDropdown = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const user = useSelector(selectCurrentUser)
	const user = JSON.parse(localStorage.getItem('user'))

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

	const logoutUser = async () => {
    try {
      dispatch(logout())
      navigate('/auth/login/')
    } catch (err) {
      // handle error
			console.log(err);
    }
  }

  return (
		<div className="menu-container">
			<button onClick={onClick} className="menu-trigger">
				<div className='profileButton'>
          <img className='profileImage' src={user.profile_photo}/>
        </div>
			</button>
			<nav className={`menu ${isActive ? "active" : "inactive"}`}>
				<Link className="menu-link-a" to={'/profile'}><p>Profile</p></Link>
				{user.is_artist &&
				<>
					<Link className="menu-link-a" to={`/artists_profile/${user.username}`}><p>My Artist Profile</p></Link> 
					<Link className="menu-link-a" to={'/artists_create'}><p>Create Album / Songs</p></Link> 
				</>}
				<Link className="menu-link-a" to={'/settings'}><p>Settings</p></Link>
				<div className='menuDivider'/>
				<button className="menu-link-a" onClick={logoutUser}><p>Logout</p></button>
			</nav>
		</div>
  );
}

export default ProfileDropdown;
