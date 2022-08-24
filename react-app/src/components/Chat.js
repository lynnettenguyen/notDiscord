import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [channelChange, setChannelChange] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on('chat', (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    setChannelChange(true)
    console.log('MESSSSSSSAGE', id)
  }, [id]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit('chat', { user: user.username, user_id: user.id, channel_id: `${id}`, content: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  // additional code to be added
  return channelChange && (
    user && (
      <div>
        <div>
          {messages.map((message, i) => `${id}` === message.channel_id && (
            <div key={i}>{`${message.user}: ${message.content} ${message.channel_id}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
