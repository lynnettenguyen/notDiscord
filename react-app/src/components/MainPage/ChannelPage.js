import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../store/channelMessages';
import Chat from '../Chat'

import '../CSS/ChannelPage.css';


const ChannelPage = ({ generalChannelId, channelId }) => {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])
  const server = useSelector(state => state.server)
  const channels = useSelector(state => state.server.channels)

  useEffect(()=>{
    if (channelId) {
      const result = dispatch(getChannelMessages(channelId)).then(()=> {
        result.forEach(message => {
          setMessages(message)
        })
      })
    }
    console.log(messages)
  }, [dispatch])

  return (
    <>
      {channelId ?
        <div>
          channel: {channelId}
          <Chat channelId={channelId} />
        </div> :
        <div>
          default general: {generalChannelId}
          <Chat channelId={channelId} />
        </div>
      }
    </>
  );

};

export default ChannelPage;
