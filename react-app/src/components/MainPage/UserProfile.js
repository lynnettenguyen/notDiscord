import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import "../CSS/UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  if (!user) {
    return <Redirect to='/' />
  }

  return (
    <div className="current-user-profile">
      <div className="user-pfp-outer">
        <img src={user.profile_pic} alt='user-pfp-inner' className='current-user-profile-pic'></img>
        <div className="username-outer">
          {user.username}
        </div>
      </div>
      <div className="logout-button-outer">
        <div className="logout-icon fa-solid fa-right-from-bracket" onClick={onLogout} />
      </div>
    </div>
  )
};

export default UserProfile
