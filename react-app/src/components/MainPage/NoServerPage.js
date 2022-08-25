import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import empty_dms from '../CSS/images/empty_dms.svg'
import '../CSS/NoServerPage.css';


const NoServerPage = ({ directChatId, setDirectChatId, showFriends, setShowFriends }) => {
    const currentUser = useSelector(state => state.session)
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))

    const [recipientId, setRecipientId] = useState()

    console.log('DIRRECT CHAT', directChats)
    console.log(currentUser.user.id)

    return (
        <div className='ServerPage-container'>
            <div className='NoServerPage-NavBar'></div>
            <div className='ServerPage-content-container'>
                <div className='NoServerPage-left-container'>
                    <div onClick={() => { setShowFriends(true); setDirectChatId(null) }}>Friends</div>
                    <div>Direct Messages</div>
                    {directChats?.map((directChat, i) => {
                        if (currentUser.user.id === directChat.recipient_id) {
                            return (
                                <>
                                    <div key={i} className='direct-chat-recipient' onClick={() => { setDirectChatId(directChat.id); setRecipientId(directChat.sender_id) }}>
                                        <div className='direct-chat-profile-pic'>
                                            <img src={users[directChat.sender_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                        </div>
                                        {users[directChat.sender_id - 1]?.username}
                                    </div>
                                </>
                            )
                        } else
                            return (
                                <div key={i} className='direct-chat-recipient' onClick={() => { setDirectChatId(directChat.id); setRecipientId(directChat.recipient_id) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img src={users[directChat.recipient_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                    </div>
                                    {users[directChat.recipient_id - 1]?.username}
                                </div>
                            )
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
                            <div>This is the beginning of your direct message history with @{users[recipientId - 1]?.username}</div>

                        </div>
                    </div>
                ) : showFriends ? (
                    <>
                        {users?.map((user, i) => {
                            return (
                                <div key={i} className='server-user'>
                                    <img src={user.profile_pic} className='user-profile-pic'></img>
                                    <p className='username'>{user.username}</p>
                                </div>)
                        })}
                    </>
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
