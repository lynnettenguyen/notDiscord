import React from 'react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';
// import svg1 from './images/svgexport-5.svg'

const NavBar = () => {
  // const user = useSelector(state => state.session.user)


  return (
    <nav className='NavBar-Container'>
      <div className='home-button'>
        <NavLink to='/' exact={true} activeClassName='active'></NavLink>
      </div>
      <div>
        <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>Login</NavLink>
        <NavLink to='/register' exact={true} activeClassName='active'>Sign Up</NavLink>
        <LogoutButton />

      </div>
    </nav>
  );
}

export default NavBar;
