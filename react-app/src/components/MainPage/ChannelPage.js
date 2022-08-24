import React, { useEffect } from 'react';
import ServerNav from './ServerNav';
import '../CSS/ChannelPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getOneServer } from '../../store/server';


const ChannelPage = ({ channelId }) => {
  const dispatch = useDispatch()
  const server = useSelector(state => state.server)
  const channels = useSelector(state => state.server.channels)

  return (
    <>
      TEST {channelId}
    </>
  );

};

export default ChannelPage;
