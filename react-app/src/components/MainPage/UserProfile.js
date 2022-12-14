import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import "../CSS/UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogout = async () => {
    dispatch(logout());
    history.push('/')
  };

  return (
    <div className="current-user-profile">
      <div className="user-pfp-outer">
        <div className="profile-pic-container"><img src={user?.profile_pic} alt='user-pfp-inner' className='current-user-profile-pic' /></div>
        <div className="username-outer">
          {user?.username}
        </div>
      </div>
      <div className="logout-icon" onClick={onLogout}>Log Out &nbsp;<i className="fa-solid fa-right-from-bracket" /></div>
    </div>
  )
};

export default UserProfile
