import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import Chat from '../Chat'

import '../CSS/ChannelPage.css';


const ChannelPage = ({ channelId }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state=> Object.values(state.channelMessages))
  const channels = useSelector(state => Object.values(state.server.channels))
  const users = useSelector(state => state.users)

  const checkDay = (date) => {
    const today = new Date()
    const newDate = new Date(date)
    const time = newDate.toLocaleTimeString([], {timeStyle: 'short'})
    const todayDay = today.getDay()
    const dateDay = newDate.getDay()

    if (todayDay - dateDay == 0) {
      return `Today at ${time}`
    } else if (todayDay - dateDay == 1) {
      return `Yesterday at ${time}`
    } else {
      const result = newDate.toLocaleDateString()
      return result
    }
  }

  useEffect(()=>{
    const func = async () => {
      if (!channelId) {
        await dispatch(getChannelMessages(channels[0].id))
      } else {
        await dispatch(getChannelMessages(channelId))
      }
    }
    func()
  }, [channelId])

  return users && (
    <>
        <div>
          {users && messages?.map((message, i) => (
          <div className='channel-messages' key={i}>
              {messages[i-1]?.user_id !== message.user_id && (<div className='chat-header'>
              <div className='chat-username'>{users[message.user_id]?.username}</div>
              <div className='chat-date'>{checkDay(message.created_at)}</div>
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
