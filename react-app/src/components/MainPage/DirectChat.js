import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/DirectChat.css';


const DirectChat = () => {
  const dispatch = useDispatch()
  const server = useSelector(state => state.server)
  const channels = useSelector(state => state.server.channels)
  const id = Object.keys(server)[0]


  return (
    <>
    </>
  );

};

export default DirectChat;
