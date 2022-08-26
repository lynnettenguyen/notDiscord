import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import "../CSS/UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className="current-user-profile">
      <div className="current-user-info">
        <div className="user-pfp-outer">
          <img src={user.profile_pic} alt='user-pfp-inner' className='current-user-profile-pic'></img>
        </div>
        <div className="username-outer">
          <p className='username-inner'>{user.username}</p>
        </div>
      </div>
      <div className="logout-button-outer">
        {/* {user && (<button className='logout-button-inner' onClick={onLogout}>Logout</button>)} */}
        {/* <i className="fa-solid fa-right-from-bracket"></i> */}
        <div className="logout-icon fa-solid fa-right-from-bracket" onClick={onLogout}/>
      </div>
    </div>
  )
};

export default UserProfile
