import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import Chat from '../Chat'

import '../CSS/ChannelPage.css';


const ChannelPage = ({ generalChannelId, channelId }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state=> Object.values(state.channelMessages))
  const channels = useSelector(state => Object.values(state.server.channels))
  const users = useSelector(state => state.users)

  useEffect( async ()=>{
    if (!channelId) {
      await dispatch(getChannelMessages(channels[0].id))
    } else {
      await dispatch(getChannelMessages(channelId))
    }
  }, [channelId])

  return users && (
    <>
        <div>
          {messages?.map((message, i) => (<div key={i} className='channel-messages'>{users[message.user_id].username}: {message.content}</div>))}
          <Chat channelId={channelId} />
        </div>
    </>
  );

};

export default ChannelPage;
