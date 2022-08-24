import React, { useEffect, useState } from 'react';
import ServerNav from './ServerNav';
import '../CSS/ChannelPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getOneServer } from '../../store/server';


const ChannelPage = ({ generalChannelId, channelId }) => {
  const dispatch = useDispatch()
  const server = useSelector(state => state.server)
  const channels = useSelector(state => state.server.channels)

  console.log('channels from channelpage', channelId)

  return (
    <>
      {/* {channelId?} */}
      general: {generalChannelId},
      channel: {channelId}
    </>
  );

};

export default ChannelPage;
