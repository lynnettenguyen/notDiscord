import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import AltLogin from '../auth/AltLogin';
import HomeLogo from '../CSS/images/notDiscord.png'
import leftImage from '../CSS/images/svgexport-5.svg'
import rightImage from '../CSS/images/svgexport-6.svg'
import part3 from '../CSS/images/threePart.svg'
import git from '../CSS/images/github-logo.png'
import linked from '../CSS/images/linked-in-logo.png'
import { logout } from '../../store/session';
import '../CSS/HomePage.css';
// import part4 from '../CSS/images/fourPart.svg'
// import part5 from '../CSS/images/fivePart.svg'
// import part6 from '../CSS/images/sixPart.svg'

const HomePage = () => {
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const [needLogin, setNeedLogin] = useState(false)
    const dispatch = useDispatch()
    const onLogout = async () => {
        await dispatch(logout());
    };

    const enterServers = () => {
        if (user) {
            history.push('/servers')
        } else {
            setNeedLogin(true)
        }
    }

    const handleMeetUp = () => {
        window.scrollTo(0, 100000000000000000000)
    }

    return (
        <div className='HomePage-container'>
            <div className='HomePage-background' />
            <nav className='NavBar-Container'>
                <div className='NavBar-buttons'>
                    <div><NavLink exact to='/'><img alt='home' className='home-logo' src={HomeLogo} /></NavLink></div>
                    <div className='meet-us' onClick={handleMeetUp}>Meet Us</div>
                    <div className='our-repo'><a href='https://github.com/lynnettenguyen/notDiscord'>Github</a></div>
                    {user && (<button className='logout-button-top' onClick={onLogout}>Logout</button>)}
                    {!user && (<div><NavLink className='login-button' to='/login'>Login</NavLink></div>)}
                </div>
            </nav>
            <div className='HomePage-heading-container'>
                <img alt='home' src={leftImage} className='HomePage-left-image' />
                <div className='HomePage-text'>
                    <h1>IMAGINE A PLACE...</h1>
                    <span className='HomePage-opening-text'>
                        ...where you can belong to a school club, a gaming group, or a worldwide art community. <br />
                        Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                    </span>
                    {!needLogin && (<div className='enter-servers-button' onClick={enterServers}>Open !Discord in your browser</div>)}
                    {needLogin && (<AltLogin />)}
                </div>
                <img alt='home' src={rightImage} className='HomePage-right-image' />
            </div>
            <div className='HomePage-3rd-part'>
                <div className='HomePage-bottom-inner'>
                    <img alt='home' src={part3} />
                    <span className='HomePage-inner-span'>
                        <h1>Create an invite-only place where you belong</h1>
                        <span>
                            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                        </span>
                    </span>
                </div>
            </div>
            {/* <div className='HomePage-4th-part'>
            <div className='HomePage-bottom-inner'>
            <span className='HomePage-inner-span'>
                <h1>Where hanging out is easy</h1>
                <span>
                    Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
                </span>
            </span>
            <img alt='home' src={part4}/>
        </div>
        </div>
        <div className='HomePage-5th-part'>
            <div className='HomePage-bottom-inner'>
            <img alt='home' src={part5}/>
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
            <img alt='home' src={part6}/>
        </div> */}
            <div className='HomePage-bottom-div'>
                <div className='HomePage-bottom-upper-container'>
                    <div className='HomePage-bottom-name'>
                        <div className='bottom-name'>Ben Durham</div>
                        <div className='HomePage-LinkedIn'><img alt='social icon' className='HomePage-logos' src={linked} /><a href='https://www.linkedin.com/in/ben-durham-5ab74997/'>LinkedIn</a></div>
                        <div className='HomePage-GitHub'><img alt='social icon' className='HomePage-logos' src={git} /><a href='https://github.com/oorazugoku'>GitHub</a></div>
                    </div>
                    <div className='HomePage-bottom-name'>
                        <div className='bottom-name'>Samantha Weglinski</div>
                        <div className='HomePage-LinkedIn'><img alt='social icon' className='HomePage-logos' src={linked} /><a href='https://www.linkedin.com/in/samanthaweglinski/'>LinkedIn</a></div>
                        <div className='HomePage-GitHub'><img alt='social icon' className='HomePage-logos' src={git} /><a href='https://github.com/samanthaweglinski'>GitHub</a></div>
                    </div>
                    <div className='HomePage-bottom-name'>
                        <div className='bottom-name'>Lynnette Nguyen</div>
                        <div className='HomePage-LinkedIn'><img alt='social icon' className='HomePage-logos' src={linked} /><a href='https://www.linkedin.com/in/lynnettenguyen/'>LinkedIn</a></div>
                        <div className='HomePage-GitHub'><img alt='social icon' className='HomePage-logos' src={git} /><a href='https://github.com/lynnettenguyen'>GitHub</a></div>
                    </div>
                    <div className='HomePage-bottom-name'>
                        <div className='bottom-name'>Antony Pizarro</div>
                        <div className='HomePage-LinkedIn'><img alt='social icon' className='HomePage-logos' src={linked} /><a href='https://www.linkedin.com/in/antony-pizarro/'>LinkedIn</a></div>
                        <div className='HomePage-GitHub'><img alt='social icon' className='HomePage-logos' src={git} /><a href='https://github.com/apizarro23'>GitHub</a></div>
                    </div>
                </div>
                <div className='bottom-divider' />
                <div className='bottom-nav-container'>
                    <div className='left'>
                        <NavLink to='/'><img alt='home' className='home-logo' src={HomeLogo} /></NavLink>
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
