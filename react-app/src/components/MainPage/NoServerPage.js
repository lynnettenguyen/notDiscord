import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DirectChat from './DirectChat'
import { createDirectChat, removeDirectChat } from '../../store/directChat';
import wumpus from '../CSS/images/wumpus.svg'
import messageBubbleGrey from '../CSS/images/message-bubble-grey.svg'
import messageBubbleWhite from '../CSS/images/message-bubble-white.svg'
import whiteX from '../CSS/images/white-x.svg'
import greyX from '../CSS/images/grey-x.svg'

import '../CSS/NoServerPage.css';
import '../CSS/ServerPage.css';
import { findDirectChat } from '../../store/directMessages';

const NoServerPage = ({ directChatId, setDirectChatId, showFriends, setShowFriends }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session)
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))
    const [recipientId, setRecipientId] = useState()
    const [userChat, setUserChat] = useState()
    const [close, setClose] = useState(greyX)
    const [messageHover, setMessageHover] = useState(false)
    const [selectUser, setSelectUser] = useState()
    const [messageBubble, setMessageBubble] = useState(messageBubbleGrey)


    const allUsersInChat = []
    directChats.forEach(chat => {
        allUsersInChat.push(chat.recipient_id)
        allUsersInChat.push(chat.sender_id)
    })

    const displayDirectChat = (chatId, userId) => {
        dispatch(findDirectChat(chatId))
        setDirectChatId(chatId)
        setRecipientId(userId)
        setUserChat(users[userId - 1]?.username)
        setShowFriends(false)
    }

    const uniqueUsersInChat = new Set(allUsersInChat)

    const newDirectChat = (recipientId) => {

        const chatData = {
            sender_id: currentUser.user.id,
            recipient_id: recipientId
        }

        dispatch(createDirectChat(chatData))
    }

    const openDirectChat = (recipientId) => {
        setRecipientId(recipientId)
        setShowFriends(false)

        let check = false
        directChats.forEach(chat => {
            if (chat.recipient_id === recipientId) check = true
            if (chat.sender_id === recipientId) check = true

            if (check === true) setDirectChatId(chat.id)
        })
    }

    const handleDelete = (directChatId) => {
        dispatch(removeDirectChat(directChatId))
    }

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
                                <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.sender_id) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img alt='profile' src={users[directChat.sender_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                        <div>{users[directChat.sender_id - 1]?.username}</div>
                                    </div>
                                    <div onClick={() => handleDelete(directChat.id)} onMouseOver={() => setClose(greyX)} onMouseLeave={() => setClose(whiteX)}><img src={close} /></div>
                                </div>
                            )
                        } else
                            return (
                                <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.recipient_id) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img src={users[directChat.recipient_id - 1]?.profile_pic} style={{ height: "38px" }} alt='profile' />
                                        <div>{users[directChat.recipient_id - 1]?.username}</div>
                                    </div>
                                    <div onClick={() => handleDelete(directChat.id)} onMouseOver={() => setClose(greyX)} onMouseLeave={() => setClose(whiteX)}><img src={close} /></div>
                                </div>
                            )
                    })}
                </div>
                {directChatId ? (
                    <div className='ServerPage-middle-container'>
                        <div>
                            <img src={users[recipientId - 1]?.profile_pic} alt='profile' style={{ height: "100px" }} />
                        </div>
                        <div>
                            {users[recipientId - 1]?.username}
                        </div>
                        <div>This is the beginning of your direct message history with @{users[recipientId - 1]?.username}</div>
                        <DirectChat directChatId={directChatId} recipientId={recipientId} />
                    </div>
                ) : showFriends ? (
                    <div className='ServerPage-middle-container'>
                        <div className='main-friends-list'>
                            {users?.map((user, i) => {
                                if (!uniqueUsersInChat.has(user.id)) {
                                    return (
                                        <div className='friends-users-outer'>
                                            <div key={i} className='friends-users' onMouseOver={() => { setMessageHover(true); setSelectUser(user.id) }} onMouseLeave={() => setMessageHover(false)}>
                                                <div className='friend-users-left'>
                                                    <div>
                                                        <img src={user.profile_pic} alt='profile' className='friend-profile-pic'></img>
                                                    </div>
                                                    <div><span className='friend-username'>{user.username}</span></div>
                                                </div>
                                                <div className='message-bubble-outer' onClick={() => newDirectChat(user.id)}>
                                                    <img src={messageBubbleGrey} alt='message' className='message-bubble-icon' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else if (user.id !== currentUser.user.id) {
                                    return (
                                        <div className='friends-users-outer'>
                                            <div key={i} className='friends-users' onMouseOver={() => { setMessageHover(true); setSelectUser(user.id)}} onMouseLeave={() => setMessageHover(false)}>
                                                <div className='friend-users-left'>
                                                    <div>
                                                        <img src={user.profile_pic} alt='profile' className='friend-profile-pic'></img>
                                                    </div>
                                                    <div><span className='friend-username'>{user.username}</span></div>
                                                </div>
                                                <div className={messageHover && selectUser === user.id ? 'message-bubble-outer-hover' : 'message-bubble-outer'} onClick={() => { openDirectChat(user.id) }}>
                                                    <img src={user.id === selectUser ? messageBubble : messageBubbleGrey} alt='message' className='message-bubble-icon' onMouseOver={() => setMessageBubble(messageBubbleWhite)} onMouseLeave={() => setMessageBubble(messageBubbleGrey)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                ) : (
                    <div className='noServerPage-middle-container'>
                        <div className='wumpus-main'>
                            <img alt='wumpus' src={wumpus} className='wumpus-image' />
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
