import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { getDirectChats } from '../../store/directChat';
import { getDirectMessages } from '../../store/directMessages';

import '../CSS/DirectChat.css';

let socket;

const DirectChat = ({ directChatId, recipientId }) => {




  const messageRef = useRef(null)

  const scrollBottom = () => {
    if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }
  const dispatch = useDispatch();
  const msgState = useSelector(state => Object.values(state.directMessages));

  let currentChat = useSelector(state => state.directMessages.directChat)
  let currentChatId;
  if (currentChat) {
    currentChat = Object.values(currentChat)
    currentChatId = currentChat[0]?.id
    scrollBottom()
  }

  const users = useSelector(state => Object.values(state.users))
  const user = useSelector((state) => state.session.user);
  const [currChat, setCurrChat] = useState(currentChatId)
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    socket = io();
    socket.on('direct_chat', (chat) => {
      setMessages((messages) => [...messages, chat]);
      scrollBottom()
    });

    return (() => {
      socket.disconnect();
    });
  }, []);

  useEffect(() => {
    if (directChatId) {
      setCurrChat(directChatId)
    }

    setChatInput("")
  }, [directChatId, messages])


  useEffect(() => {
    const newDate = new Date()
    const time = newDate.toLocaleString([], { timeStyle: 'short' });
    setDate(time)

    scrollBottom()
  }, [messages]);


  useEffect(() => {
    const func = async () => {
      setMessages([])
      if (!directChatId) {
        await dispatch(getDirectMessages(currentChatId))
      } else {
        await dispatch(getDirectMessages(directChatId))
      }
    }

    func()
    scrollBottom()
  }, [directChatId])


  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };


  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('direct_chat', { user: user.username, sender_id: user.id, recipient_id: recipientId, direct_chat_id: `${directChatId}`, content: chatInput });
    setChatInput("");
  };


  const checkDay = (date) => {
    const today = new Date()
    const newDate = new Date(date)
    const time = newDate.toLocaleTimeString([], { timeStyle: 'short' })
    const todayDay = today.getDay()
    const dateDay = newDate.getDay()

    if (todayDay - dateDay === 0) {
      return `Today at ${time}`
    } else if (todayDay - dateDay === 1) {
      return `Yesterday at ${time}`
    } else {
      const result = newDate.toLocaleDateString()
      return result
    }
  }


  const checkPost = (date, prevDate, i) => {
    const oldDate = new Date(date)
    const newDate = new Date(prevDate)
    const difference = newDate - oldDate
    if (i === 0) {
      return true
    }
    if (difference > 180000) {
      return true
    } else {
      return false
    }
  }


  return (
    <>
      <div className='directChat-page-main'>
        <div className='channel-messages-outer'>
          <div className='noServer-main-middle-header'>
            <div>
              <img className='noServer-middle-profile' src={users[recipientId - 1]?.profile_pic} alt='profile' />
            </div>
            <div className='noServer-username-middle'>
              {users[recipientId - 1]?.username}
            </div>
            <div className='noServer-caption-middle'>This is the beginning of your direct message history with @{users[recipientId - 1]?.username}</div>
          </div>
          <div className='channel-messages'>
            {user && msgState?.map((message, i) => (
              <>
                <div className='channel-messages-inner' key={i}>
                  {checkPost(msgState[i - 1]?.created_at, message.created_at, i) && message.created_at &&
                    (<div className='chat-header'>
                      <div className='chat-profile-outer'>
                        <img src={user.profile_pic} alt='profile' className='channel-chat-profile' />
                      </div>
                      <div className='chat-username'>{users[message.sender_id - 1]?.username}</div>
                      <div className='chat-date'>{checkDay(message.created_at)}</div>
                    </div>)}
                  <div className='chat-message'>{message.content}</div>
                  <div ref={messageRef} className="scroll-to-bottom-message" />
                </div>
              </>
            ))}
            {messages?.map((message, i) => `${directChatId}` === message.direct_chat_id && (
              <>
                <div className='channel-messages-inner' key={i}>
                  {messages[i - 1]?.sender_id !== message.sender_id &&
                    (<div className='chat-header'>
                      <div className='chat-profile-outer'>
                        <img src={user.profile_pic} alt='profile' className='channel-chat-profile' />
                      </div>
                    <div className='chat-username'>{users[message.sender_id - 1]?.username}</div>
                      <div className='chat-date'>Today at {date}</div>
                    </div>)}
                  <div className='chat-message'>{message.content}</div>
                  <div ref={messageRef} className="scroll-to-new-message" />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="directChat-messages-input">
        <form onSubmit={sendChat} className='chat-input-form'>
          <input value={chatInput} onChange={updateChatInput} className="chat-input" placeholder={`Message #`} />
          <button className='chat-button' type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default DirectChat;
