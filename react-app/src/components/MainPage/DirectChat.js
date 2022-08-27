import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { getDirectMessages } from '../../store/directMessages';

import '../CSS/DirectChat.css';

let socket;

const DirectChat = ({ directChatId, recipientId }) => {
  const dispatch = useDispatch();
  const msgState = useSelector(state => Object.values(state.directMessages));
  const user = useSelector((state) => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    socket = io();
    socket.on('direct_chat', (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    return (() => {
      setMessages([])
      socket.disconnect();
    });

  }, []);


  useEffect(() => {
    const newDate = new Date()
    const time = newDate.toLocaleString([], { timeStyle: 'short' });
    setDate(time)

    let elem = document.getElementsByClassName('channel-messages-outer');
    elem.scrollTop = elem.scrollHeight
    window.scrollTo(0, elem.scrollHeight)

  }, [messages]);


  useEffect(() => {
    const func = async () => {
      await dispatch(getDirectMessages(directChatId))
    }

    func()

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
      <div className='channel-page-main'>
        <div className='channel-messages-outer'>
          <div className='channel-messages'>
            {user && msgState?.map((message, i) => (
              <div className='channel-messages-inner' key={i}>
                {checkPost(msgState[i - 1]?.created_at, message.created_at, i) && (<div className='chat-header'>
                  <div className='chat-username'>{user[message.sender_id]?.username}</div>
                  <div className='chat-date'>{checkDay(message.created_at)}</div>
                </div>)}
                <div className='chat-message'>{message.content}</div>
              </div>
            ))}
            {messages?.map((message, i) => `${directChatId}` === message.direct_chat_id && (
              <div className='channel-messages-inner' key={i}>
                {messages[i - 1]?.sender_id !== message.sender_id && (<div className='chat-header'>
                  <div className='chat-username'>{message.user}</div>
                  <div className='chat-date'>Today at {date}</div>
                </div>)}
                <div className='chat-message'>{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="channel-messages-input">
        <form onSubmit={sendChat} className='chat-input-form'>
          <input value={chatInput} onChange={updateChatInput} className="chat-input" placeholder={`Message #`} />
          <button className='chat-button' type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default DirectChat;
