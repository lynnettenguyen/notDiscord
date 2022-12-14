import React from 'react';
import { useDispatch } from 'react-redux';
import { resetServer } from '../../store/server';
import { logout } from '../../store/session';
import '../CSS/HomePage.css'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = async () => {
    await dispatch(logout());
    await dispatch(resetServer());
  };

  return <button className='logout-button-bottom' onClick={onLogout}>Logout</button>
};

export default LogoutButton;
