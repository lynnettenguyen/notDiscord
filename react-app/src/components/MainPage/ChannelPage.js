import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import { io } from "socket.io-client";
import '../CSS/ChannelPage.css';

let socket;

const ChannelPage = ({ channelId }) => {
  const dispatch = useDispatch();
  const msgState = useSelector(state => Object.values(state.channelMessages));
  const channels = useSelector(state => Object.values(state.server.channels));
  const channel = useSelector(state => state.server.channels)
  const users = useSelector(state => state.users);
  const user = useSelector((state) => state.session.user);
  const [currChannel, setCurrChannel] = useState(channels[0].id)
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [date, setDate] = useState(new Date());

  const messageRef = useRef(null)

  const scrollBottom = () => {
    if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }

  useEffect(() => {
    socket = io();
    socket.on('chat', (chat) => {
      setMessages((messages) => [...messages, chat]);
    });
    return (() => {
      setMessages([])
      socket.disconnect();
    });
  }, []);


  useEffect(() => {
    if (channelId) {
      setCurrChannel(channelId)
      scrollBottom()
    }

    setChatInput('')
  }, [channelId])


  useEffect(() => {
    const newDate = new Date()
    const time = newDate.toLocaleString([], { timeStyle: 'short' });
    setDate(time)

    scrollBottom()
  }, [messages]);

  useEffect(() => {
    const func = async () => {
      setMessages([])
      if (!channelId) {
        await dispatch(getChannelMessages(channels[0].id))
      } else {
        await dispatch(getChannelMessages(channelId))
      }

    }
    func()
    scrollBottom()
  }, [channelId])


  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', { user: user.username, user_id: user.id, channel_id: `${channelId}`, content: chatInput });
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

  // const checkPost = (date, prevDate, i) => {
  //   const oldDate = new Date(date)
  //   const newDate = new Date(prevDate)
  //   const difference = newDate - oldDate
  //   if (i === 0) {
  //     return true
  //   }
  //   if (difference > 180000) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  return users && (
    <>
      <div className='channel-page-main'>
        <div className='channel-messages-outer'>
          <div className='channel-messages'>
            {users && msgState?.map((message, i) => (
              <>
                <div className='channel-messages-inner' key={i}>
                  {(msgState[i - 1]?.created_at, message.created_at, i) &&
                  // {checkPost(msgState[i - 1]?.created_at, message.created_at, i) &&
                    (<div className='chat-header'>
                      <div className='chat-profile-outer'>
                        <img src={user.profile_pic} alt='profile' className='channel-chat-profile' />
                      </div>
                      <div className='chat-username'>{users[message.user_id]?.username}</div>
                      <div className='chat-date'>{checkDay(message.created_at)}</div>
                    </div>)}
                  <div className='chat-message'>{message.content}</div>
                  <div ref={messageRef} className="scroll-to-bottom-message" />
                </div>
              </>
            ))}
            {messages?.map((message, i) => `${channelId}` === message.channel_id && (
              <>
                <div className='channel-messages-inner' key={i}>
                  {messages[i - 1]?.user_id !== message.user_id &&
                    (<div className='chat-header'>
                      <div className='chat-profile-outer'>
                        <img src={user.profile_pic} alt='profile' className='channel-chat-profile' />
                      </div>
                      <div className='chat-username'>{message.user}</div>
                      <div className='chat-date'>Today at {date}</div>
                    </div>)}
                  <div className={`chat-message c${i}`}>{message.content}</div>
                  <div ref={messageRef} className="scroll-to-new-message" />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="channel-messages-input">
        <form onSubmit={sendChat} className='chat-input-form'>
          <input value={chatInput} onChange={updateChatInput} className="chat-input" placeholder={`Message #${channel[currChannel]?.name}`} />
          <button className='chat-button' type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default ChannelPage;
