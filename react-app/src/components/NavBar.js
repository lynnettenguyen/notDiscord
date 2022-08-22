import React from 'react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';
<<<<<<< HEAD
<<<<<<< HEAD
import logo from './Images/notDiscord.png'
=======
// import svg1 from './images/svgexport-5.svg'
>>>>>>> 9ac4bebcbdcbe640b41e3893add9a6a51dd1d916
=======
// import logo from './images/notDiscord.png'
// import svg1 from './images/svgexport-5.svg'

>>>>>>> 9709dcd7696ce37b9b173493d9e634860519ac85

const NavBar = () => {
  // const user = useSelector(state => state.session.user)


  return (
    <nav className='NavBar-Container'>
      <div className='home-button'>
        <NavLink to='/' exact={true} activeClassName='active'>Home</NavLink>
      </div>
      <div>
        <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>Login</NavLink>
<<<<<<< HEAD
<<<<<<< HEAD
        <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
        </>
        )}
        {user && (
          <>
=======
=======
>>>>>>> 9709dcd7696ce37b9b173493d9e634860519ac85

        {/* {user && ( */}

          <>
        <NavLink to='/register' exact={true} activeClassName='active'>Sign Up</NavLink>
<<<<<<< HEAD
>>>>>>> 9ac4bebcbdcbe640b41e3893add9a6a51dd1d916
=======
>>>>>>> 9709dcd7696ce37b9b173493d9e634860519ac85
        {/* <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink> */}
        <LogoutButton />
          </>

      </div>
    </nav>
  );
}

export default NavBar;
