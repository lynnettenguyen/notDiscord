import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import '../CSS/NoServerPage.css';
import '../CSS/ServerPage.css';
import messageBubble from '../CSS/images/message-bubble.svg'


const NoServerPage = ({ directChatId, setDirectChatId, showFriends, setShowFriends }) => {
    const currentUser = useSelector(state => state.session)
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))

    const [recipientId, setRecipientId] = useState()
    const [userChat, setUserChat] = useState()

    return (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'></div>
                <div className='ServerPage-channel-name'>
                    {directChatId &&
                        <div>
                            @{userChat}
                        </div>}
                    {showFriends && <div>Friends</div>}
                </div>
                <div className='ServerPage-NavBar-buttons'></div>
                <div></div>
                <div></div>
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
                                    <div key={i} className='direct-chat-recipient' onClick={() => { setDirectChatId(directChat.id); setRecipientId(directChat.sender_id); setUserChat(users[directChat.sender_id - 1]?.username); setShowFriends(false) }}>
                                        <div className='direct-chat-profile-pic'>
                                            <img src={users[directChat.sender_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                        </div>
                                        {users[directChat.sender_id - 1]?.username}
                                    </div>
                                </>
                            )
                        } else
                            return (
                                <div key={i} className='direct-chat-recipient' onClick={() => { setDirectChatId(directChat.id); setRecipientId(directChat.recipient_id); setUserChat(users[directChat.recipient_id - 1]?.username); setShowFriends(false) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img src={users[directChat.recipient_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                    </div>
                                    {users[directChat.recipient_id - 1]?.username}
                                </div>
                            )
                    })}
                </div>
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
                        <div className='main-friends-list'>
                            {users?.map((user, i) => {
                                return (
                                    <>
                                        <div key={i} className='friends-users'>
                                            <div className='friend-users-left'>
                                                <div>
                                                    <img src={user.profile_pic} className='friend-profile-pic'></img>
                                                </div>
                                                <div><span className='friend-username'>{user.username}</span></div>
                                            </div>
                                            <div className='message-bubble-outer'>
                                                <img src={messageBubble} className='message-bubble-icon' />
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className='noServerPage-middle-container'>
                        <div className='wumpus-main'>
                            <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                            <div className='wumpus-caption'>Wumpus is waiting on friends. You don't have to though!</div>
                        </div>
                    </div>
                )}
                {showFriends && (<div className='noServerPage-right-container'>
                    <h3>It's quiet for now...</h3>
                    <div className='no-online-friends'>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</div>
                </div>)}
            </div>
        </div >
    );
};

export default NoServerPage;
