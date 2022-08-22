import React from 'react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';
<<<<<<< HEAD
import logo from './Images/notDiscord.png'
=======
// import svg1 from './images/svgexport-5.svg'
>>>>>>> 9ac4bebcbdcbe640b41e3893add9a6a51dd1d916

const NavBar = () => {
  // const user = useSelector(state => state.session.user)


  return (
    <nav className='NavBar-Container'>
      <div className='home-button'>
        <NavLink to='/' exact={true} activeClassName='active'><img className='logo' src={logo}/></NavLink>
      </div>
      <div>
        {!user && (
        <>
        <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>Login</NavLink>
<<<<<<< HEAD
        <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
        </>
        )}
        {user && (
          <>
=======

        {/* {user && ( */}
          <>
        <NavLink to='/register' exact={true} activeClassName='active'>Sign Up</NavLink>
>>>>>>> 9ac4bebcbdcbe640b41e3893add9a6a51dd1d916
        {/* <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink> */}
        <LogoutButton />
          </>
      </div>
    </nav>
  );
}

export default NavBar;
