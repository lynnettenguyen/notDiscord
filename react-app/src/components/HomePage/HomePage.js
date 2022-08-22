import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../CSS/HomePage.css';
import HomeLogo from '../CSS/images/notDiscord.png'
import leftImage from '../CSS/images/svgexport-5.svg'
import rightImage from '../CSS/images/svgexport-6.svg'

const HomePage = () => {
    const user = useSelector(state => state.session.user);







    return (
        <>
        <div className='HomePage-background-container'>
            <nav className='NavBar-Container'>
                <div className='home-button'>
                <NavLink to='/'><img className='home-logo' src={HomeLogo}/></NavLink>
                </div>
                <div>
                    <NavLink className='login-button' to='/login'>Login</NavLink>
                </div>
            </nav>
        </div>
        <div className='HomePage-background'>
            <img src={leftImage} className='HomePage-left-image'/>
            <div className='HomePage-text'>
                <h1>
                    IMAGINE A PLACE...
                </h1>
                <span>
                    ...where you can belong to a school club, a gaming group, or a worldwide art community. <br/>
                    Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                </span>
            </div>
            <img src={rightImage} className='HomePage-right-image'/>
        </div>
        </>
    )
}

export default HomePage;
