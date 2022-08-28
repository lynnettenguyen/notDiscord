import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DirectChat from './DirectChat'
import UserProfile from './UserProfile';
import { createDirectChat, removeDirectChat } from '../../store/directChat';
import { findDirectChat } from '../../store/directMessages';
import wumpus from '../CSS/images/wumpus.svg'
import messageBubbleGrey from '../CSS/images/message-bubble-grey.svg'
import messageBubbleWhite from '../CSS/images/message-bubble-white.svg'
import whiteX from '../CSS/images/white-x.svg'
import greyX from '../CSS/images/grey-x.svg'
import at from '../CSS/images/@-symbol.svg'

import '../CSS/NoServerPage.css';
import '../CSS/ServerPage.css';

import friendsWhite from '../CSS/images/friends-white.svg'
import friendsGrey from '../CSS/images/friends-grey.svg'

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
    const [friendIconHeader, setFriendIconHeader] = useState(friendsGrey)
    const [deleteOption, setDeleteOption] = useState(0)


    const allUsersInChat = []
    directChats.forEach(chat => {
        allUsersInChat.push(chat.recipient_id)
        allUsersInChat.push(chat.sender_id)
    })

    const displayDirectChat = (chatId, userId) => {
        if (directChatId !== chatId) dispatch(findDirectChat(chatId))
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
                <div className='noServerPage-name'>
                </div>
                <div className='ServerPage-channel-name'>
                    {!directChatId && !showFriends && <div className='noServer-nav'>!Discord</div>}
                    {directChatId && <div className='noServer-nav'><img src={at} alt='at' className='noServer-icon-at' />{userChat}</div>}
                    {showFriends && <div className='noServer-nav'><img src={friendsGrey} alt='friends' className='noServer-icon-nav' />Friends</div>}
                </div>
            </div>
            <div className='ServerPage-content-container'>
                <div className='ServerPage-left-container'>
                    <div className='noServer-left-scroll'>
                        <div className='noServer-channel-header'>
                            <div className='noServer-friends-left' onClick={() => { setShowFriends(true); setDirectChatId(null) }} onMouseOver={() => setFriendIconHeader(friendsWhite)} onMouseLeave={() => setFriendIconHeader(friendsGrey)}><img src={friendIconHeader} alt='friends' className='noServer-icon-nav' />Friends</div>
                            <div className='dm-header'>DIRECT MESSAGES</div>
                        </div>
                        {directChats?.map((directChat, i) => {
                            if (currentUser.user.id === directChat.recipient_id) {
                                return (
                                    <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.sender_id) }}>
                                        <div className='noServer-friend-direct-chat' onMouseOver={() => { setDeleteOption(directChat.sender_id) }} onMouseLeave={() => setDeleteOption(0)}>
                                            <div className='noServer-dc-left'>
                                                <img className='dc-left-profile' alt='profile' src={users[directChat.sender_id - 1]?.profile_pic} />
                                                <div className='dc-left-user'>{users[directChat.sender_id - 1]?.username}</div>
                                            </div>
                                            <div onClick={() => handleDelete(directChat.id)} onMouseOver={() => { setClose(whiteX); setSelectUser(directChat.sender_id) }} onMouseLeave={() => setClose(greyX)}><img className={deleteOption === directChat.sender_id ? 'remove-dc-img' : 'remove-dc-hidden'} alt='delete' src={close} /></div>
                                        </div>
                                    </div>
                                )
                            } else
                                return (
                                    <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.recipient_id) }}>
                                        <div className='noServer-friend-direct-chat' onMouseOver={() => { setDeleteOption(directChat.recipient_id) }} onMouseLeave={() => setDeleteOption(0)}>
                                            <div className='noServer-dc-left'>
                                                <img className='dc-left-profile' alt='profile' src={users[directChat.recipient_id - 1]?.profile_pic} />
                                                <div className='dc-left-user'>{users[directChat.recipient_id - 1]?.username}</div>
                                            </div>
                                            <div onClick={() => handleDelete(directChat.id)} onMouseOver={() => { setClose(whiteX); setSelectUser(directChat.recipient_id) }} onMouseLeave={() => setClose(greyX)}><img className={deleteOption === directChat.recipient_id ? 'remove-dc-img' : 'remove-dc-hidden'} alt='delete' src={close} /></div>
                                        </div>
                                    </div>
                                )
                        })}
                    <div className='user-profile-container'>
                        <UserProfile />
                    </div>
                    </div>
                </div>
                {directChatId ? (
                    <div className='ServerPage-middle-container'>
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
                                                    <div className='noServer-friend-outer'>
                                                        <div className='friend-username'>{user.username}</div>
                                                        <div className='friend-id'>id: {user.id}</div>
                                                    </div>
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
                                            <div key={i} className='friends-users' onMouseOver={() => { setMessageHover(true); setSelectUser(user.id) }} onMouseLeave={() => setMessageHover(false)}>
                                                <div className='friend-users-left'>
                                                    <div>
                                                        <img src={user.profile_pic} alt='profile' className='friend-profile-pic'></img>
                                                    </div>
                                                    <div className='noServer-friend-outer'>
                                                        <div className='friend-username'>{user.username}</div>
                                                        <div className='friend-id'>id: {user.id}</div>
                                                    </div>
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
