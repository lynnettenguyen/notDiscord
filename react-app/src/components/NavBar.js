import React from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/NavBar.css';


const NavBar = () => {


  return (
    <nav className='NavBar-Container'>
      <div className='home-button'>
        <NavLink to='/' exact={true} activeClassName='active'></NavLink>
      </div>
      <div>
        <NavLink className='login-button' to='/login' exact={true} activeClassName='active'>Login</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
