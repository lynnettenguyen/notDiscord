import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../CSS/HomePage.css';
import HomeLogo from '../CSS/images/notDiscord.png'
import leftImage from '../CSS/images/svgexport-5.svg'
import rightImage from '../CSS/images/svgexport-6.svg'
import part3 from '../CSS/images/threePart.svg'
import part4 from '../CSS/images/fourPart.svg'
import part5 from '../CSS/images/fivePart.svg'
import part6 from '../CSS/images/sixPart.svg'
import { logout } from '../../store/session';


const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const onLogout = async (e) => {
      await dispatch(logout());
    };

    return (
        <div className='HomePage-container'>
        <div className='HomePage-background'/>
            <nav className='NavBar-Container'>
                <div className='NavBar-buttons'>
                <div><NavLink exact to='/'><img className='home-logo' src={HomeLogo}/></NavLink></div>
                {user && (<button className='logout-button-top' onClick={onLogout}>Logout</button>)}
                {!user && (<div><NavLink className='login-button' to='/login'>Login</NavLink></div>)}
                </div>
            </nav>
        <div className='HomePage-heading-container'>
            <img src={leftImage} className='HomePage-left-image'/>
            <div className='HomePage-text'>
                <h1>IMAGINE A PLACE...</h1>
                <span>
                    ...where you can belong to a school club, a gaming group, or a worldwide art community. <br/>
                    Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                </span>
            </div>
            <img src={rightImage} className='HomePage-right-image'/>
        </div>
        <div className='HomePage-3rd-part'>
            <div className='HomePage-bottom-inner'>
            <img src={part3}/>
            <span className='HomePage-inner-span'>
                <h1>Create an invite-only place where you belong</h1>
                <span>
                Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                </span>
            </span>
        </div>
        </div>
        <div className='HomePage-4th-part'>
            <div className='HomePage-bottom-inner'>
            <span className='HomePage-inner-span'>
                <h1>Where hanging out is easy</h1>
                <span>
                    Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
                </span>
            </span>
            <img src={part4}/>
        </div>
        </div>
        <div className='HomePage-5th-part'>
            <div className='HomePage-bottom-inner'>
            <img src={part5}/>
            <span className='HomePage-inner-span'>
                <h1>From few to a fandom</h1>
                <span>
                    Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
                </span>
            </span>
        </div>
        </div>
        <div className='HomePage-6th-part'>
            <span className='HomePage-part6-text'>
                <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
                <span>
                    Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                </span>
            </span>
            <img src={part6}/>
        </div>
        <div className='HomePage-bottom-div'>
            <div className='bottom-divider'/>
            <div className='bottom-nav-container'>
                <div className='left'>
                    <NavLink to='/'><img className='home-logo' src={HomeLogo}/></NavLink>
                </div>
                <div className='right'>
                {user && (<button className='logout-button-bottom' onClick={onLogout}>Logout</button>)}
                    {!user && (<NavLink className='signup-button' to='/register'>Signup</NavLink>)}
                </div>
            </div>
        </div>
        </div>
    )
}

export default HomePage;
