import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import './CSS/Chat.css'

let socket;

const Chat = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [date, setDate] = useState(new Date());
  const user = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server);

  useEffect(() => {
    // create websocket/connect
    socket = io();
    // listen for chat events
    socket.on('chat', (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return (() => {
      setMessages([])
      socket.disconnect();
    });
  }, [server]);


  useEffect(() => {
    setMessages([])
    setChatInput('')
  }, [channelId])


  useEffect(() => {
    const newDate = new Date()
    const time = newDate.toLocaleString([], { timeStyle: 'short' });
    setDate(time)
  }, [messages]);



  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit('chat', { user: user.username, user_id: user.id, channel_id: `${channelId}`, content: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  return (
    user && (
      <>
        <div className="channel-page-main">
          <div className="channel-messages">
            {messages?.map((message, i) => `${channelId}` === message.channel_id && (
              <div className='channel-messages' key={i}>
                {messages[i - 1]?.user_id !== message.user_id && (<div className='chat-header'>
                  <div className='chat-username'>{message.user}</div>
                  <div className='chat-date'>Today at {date}</div>
                </div>)}
                <div className='chat-message'>{message.content}</div>
              </div>
            ))}
          </div>
          <div className="channel-messages-input">
            <form onSubmit={sendChat} className='chat-input-form'>
              <input value={chatInput} onChange={updateChatInput} className="chat-input" />
              <button className='chat-button' type="submit"></button>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default Chat;
