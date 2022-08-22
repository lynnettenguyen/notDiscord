import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../CSS/HomePage.css';
import HomeLogo from '../CSS/images/notDiscord.png'
import leftImage from '../CSS/images/svgexport-5.svg'
import rightImage from '../CSS/images/svgexport-6.svg'
import part3 from '../CSS/images/threePart.svg'
import part4 from '../CSS/images/fourPart.svg'
import part5 from '../CSS/images/fivePart.svg'
import part6 from '../CSS/images/sixPart.svg'


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
            <div className='space'/>
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
        <div className='HomePage-3rd-part'>
            <img src={part3}/>
            <span>TEXT</span>
        </div>
        <div className='HomePage-4th-part'>
            <span>TEXT</span>
            <img src={part4}/>
        </div>
        <div className='HomePage-5th-part'>
            <img src={part5}/>
            <span>TEXT</span>
        </div>
        <div className='HomePage-6th-part'>
            <span>TEXT</span>
            <img src={part6}/>
        </div>
        </>
    )
}

export default HomePage;
