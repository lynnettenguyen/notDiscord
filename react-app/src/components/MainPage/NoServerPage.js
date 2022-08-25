import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import empty_dms from '../CSS/images/empty_dms.svg'
import '../CSS/NoServerPage.css';


const NoServerPage = () => {
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))

    let recipients;
    if (directChats) recipients = directChats.map(directChat => directChat.recipient_id)

    const directChatUsers = recipients.map(recipientId => users[recipientId - 1])

    return (
        <div className='NoServerPage-container'>
            <div className='NoServerPage-NavBar'></div>
            <div className='NoServerPage-content-container'>
                <div className='NoServerPage-left-container'>
                    {directChatUsers?.map((user, i) => {
                        return (
                            <div key={i} className='server-user'>
                                {user.username}
                            </div>)
                    })}
                    {/* <img alt='empty_dms' src={empty_dms} className='empty_dms'/> */}
                </div>
                <div className='NoServerPage-middle-container'>
                    <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                    <div>
                        <p className='wumpus-image'>Wumpus is waiting on friends. You don't have to though!</p>
                    </div>
                </div>
                <div className='NoServerPage-right-container'>
                    <h3>It's quiet for now...</h3>
                    <p>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</p>
                </div>
            </div>
        </div>
    );

};

export default NoServerPage;
