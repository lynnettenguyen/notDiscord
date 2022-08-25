import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import Chat from '../Chat'

import '../CSS/ChannelPage.css';


const ChannelPage = ({ channelId }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state=> Object.values(state.channelMessages))
  const channels = useSelector(state => Object.values(state.server.channels))
  // const server = useSelector(state => state.server)
  const users = useSelector(state => state.users)

  useEffect(()=>{
    const func = async () => {
      if (!channelId) {
        await dispatch(getChannelMessages(channels[0].id))
      } else {
        await dispatch(getChannelMessages(channelId))
      }
    }
    func()
    console.log(messages)
  }, [channelId])

  return users && (
    <>
        <div>
          {users && messages?.map((message, i) => (
          // <div key={i} className='channel-messages'>{users[message.user_id]?.username}: {message.content}</div>
          <div className='channel-messages' key={i}>
              {messages[i-1]?.user_id !== message.user_id && (<div className='chat-header'>
              <div className='chat-username'>{users[message.user_id]?.username}</div>
              {/* <div className='chat-date'>Today at {date}</div> */}
              </div>)}
              <div className='chat-message'>{message.content}</div>
            </div>
          ))}
          <Chat channelId={channelId} />
        </div>
    </>
  );

};

export default ChannelPage;
