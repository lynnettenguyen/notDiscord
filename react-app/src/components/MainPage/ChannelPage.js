import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import Chat from '../Chat'

import '../CSS/ChannelPage.css';


const ChannelPage = ({ channelId }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => Object.values(state.channelMessages))
  const channels = useSelector(state => Object.values(state.server.channels))
  const users = useSelector(state => state.users)


  const checkDay = (date) => {
    const today = new Date()
    const newDate = new Date(date)
    const time = newDate.toLocaleTimeString([], { timeStyle: 'short' })
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

  useEffect(() => {
    const func = async () => {
      if (!channelId) {
        await dispatch(getChannelMessages(channels[0].id))
      } else {
        await dispatch(getChannelMessages(channelId))
      }
    }
    func()
  }, [channelId])

  const checkPost = (date, prevDate, i) => {
    const oldDate = new Date(date)
    const newDate = new Date(prevDate)
    const difference = newDate - oldDate
    if (i == 0) {
      return true
    }
    if (difference > 180000) {
      return true
    } else {
      return false
    }
  }

  return users && (
    <>
      <div className='channel-page-main'>
        <div className='channel-messages'>
          {users && messages?.map((message, i) => (
            <div className='channel-messages' key={i}>
              {checkPost(messages[i - 1]?.created_at, message.created_at, i) && (<div className='chat-header'>
                <div className='chat-username'>{users[message.user_id]?.username}</div>
                <div className='chat-date'>{checkDay(message.created_at)}</div>
              </div>)}
              <div className='chat-message'>{message.content}</div>
            </div>
          ))}
        </div>
      </div>
      <Chat channelId={channelId} />
    </>
  );

};

export default ChannelPage;
