import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import empty_dms from '../CSS/images/empty_dms.svg'
import '../CSS/NoServerPage.css';


const NoServerPage = ({ directChatId, setDirectChatId }) => {
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))

    const [recipientId, setRecipientId] = useState()

    console.log(directChatId)

    return (
        <div className='NoServerPage-container'>
            <div className='NoServerPage-NavBar'></div>
            <div className='NoServerPage-content-container'>
                <div className='NoServerPage-left-container'>
                    {directChats?.map((directChat, i) => {
                        return (
                            <div key={i} className='direct-chat-recipient' onClick={() => { setDirectChatId(directChat.id); setRecipientId(directChat.recipient_id) }}>
                                <div>
                                    <img src={users[directChat.recipient_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                </div>
                                {users[directChat.recipient_id - 1]?.username}
                            </div>)
                    })}
                    {/* <img alt='empty_dms' src={empty_dms} className='empty_dms'/> */}
                </div>
                {directChatId ? (
                    <div className='NoServerPage-middle-container'>
                        <div>
                            <div>
                                <img src={users[recipientId - 1]?.profile_pic} style={{ height: "100px" }} />
                            </div>
                            <div>
                                {users[recipientId - 1]?.username}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='NoServerPage-middle-container'>
                            <div>
                                <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                                <div>
                                    <p className='wumpus-image'>Wumpus is waiting on friends. You don't have to though!</p>
                                </div>
                            </div>
                        </div>
                        <div className='NoServerPage-right-container'>
                            <h3>It's quiet for now...</h3>
                            <p>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default NoServerPage;
