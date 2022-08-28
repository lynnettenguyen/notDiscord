import React from 'react';
import { useDispatch } from 'react-redux';
import { resetServer } from '../../store/servers';
import { logout } from '../../store/session';
import '../CSS/HomePage.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetServer());
  };

  return <button className='logout-button-bottom' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
