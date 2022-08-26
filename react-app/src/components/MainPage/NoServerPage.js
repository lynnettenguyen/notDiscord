import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import empty_dms from '../CSS/images/empty_dms.svg'
import '../CSS/NoServerPage.css';
import '../CSS/ServerPage.css';


const NoServerPage = ({ directChatId, setDirectChatId, showFriends, setShowFriends }) => {
    const currentUser = useSelector(state => state.session)
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))

    const [recipientId, setRecipientId] = useState()

    console.log('DIRRECT CHAT', directChats)
    console.log(currentUser.user.id)

    return (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                NEED TO PUT STUFF HERE LATER
            </div>
            <div className='ServerPage-content-container'>
                <div className='ServerPage-left-container'>
                    <div className='noServer-channel-header'>
                        <div onClick={() => { setShowFriends(true); setDirectChatId(null) }}>Friends</div>
                        <div>Direct Messages</div>
                    </div>
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
                </div>
                {/* <div className='ServerPage-middle-container'> */}
                {directChatId ? (
                    <div className='ServerPage-middle-container'>
                        <div>
                            <img src={users[recipientId - 1]?.profile_pic} style={{ height: "100px" }} />
                        </div>
                        <div>
                            {users[recipientId - 1]?.username}
                        </div>
                        <div>This is the beginning of your direct message history with @{users[recipientId - 1]?.username}</div>

                    </div>

                ) : showFriends ? (
                    <div className='ServerPage-middle-container'>
                        {users?.map((user, i) => {
                            return (
                                <div key={i} className='server-user'>
                                    <img src={user.profile_pic} className='user-profile-pic'></img>
                                    <p className='username'>{user.username}</p>
                                </div>)
                        })}
                    </div>

                ) : (
                    <div className='noServerPage-middle-container'>
                        <div className='wumpus-main'>
                            <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                            <div className='wumpus-caption'>Wumpus is waiting on friends. You don't have to though!</div>
                        </div>
                    </div>
                )}
                {/* </div> */}
                {!showFriends && (<div className='noServerPage-right-container'>
                    <h3>It's quiet for now...</h3>
                    <div className='no-online-friends'>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</div>
                </div>)}
            </div>
        </div >
    );

};

export default NoServerPage;
