import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import './CSS/ChannelPage.css'

let socket;

const Chat = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server)
  const [date, setDate] = useState(new Date())
  const [lastUser, setLastUser] = useState()
  const [currUser, setCurrUser] = useState(false)

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


  useEffect(()=>{
    if (user) {
      const index = messages.length - 1

      if (index < 0) {
        setCurrUser(true)
      }

      if (index >= 0) {
        if (messages[index].user == user.username) {
            setCurrUser(false)
        } else {
          setCurrUser(true)
        }
      }
      // if (index >= 0) {
      //   setLastUser(messages[index].user)
      //   console.log('LAST USER', lastUser)
      //   if (lastUser !== user.username) {
      //     setCurrUser(true)
      //   }
      // }
      // if (index < 0) {
      //   setCurrUser(true)
      // }
    }
  }, [channelId])


  useEffect(() => {
    const newDate = new Date()
    const time = newDate.toLocaleString([], {timeStyle: 'short'});
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

  // additional code to be added
  return (
    user && (
      <div>
        <div>
          {messages?.map((message, i) => `${channelId}` === message.channel_id && (
            <div className='channel-messages' key={i}>
              {messages[i-1]?.user_id !== message.user_id && currUser && (<div className='chat-header'>
              <div className='chat-username'>{message.user}</div>
              <div className='chat-date'>Today at {date}</div>
              </div>)}
              <div className='chat-message'>{message.content}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    )
  );
};

export default Chat;
