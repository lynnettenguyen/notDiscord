import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allServers, listAllServers } from '../../store/servers';
import { getChannels, getOneServer, resetServer } from '../../store/server';
import { getUsers } from '../../store/users';
import { Modal } from '../context/Modal';
import ServerForm from './ServerForm'
import discordHome from '../CSS/images/lightpurple.png'
import serverDefault from '../CSS/images/server_default.png'

import '../CSS/ServerNav.css'


const ServerNav = ({setDirectChatId, setShowFriends }) => {
  const directChats = useSelector(state => Object.values(state.directChat))
  const dispatch = useDispatch();
  const servers = useSelector(allServers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false)

  useEffect(() => {
    dispatch(listAllServers())
      .then(() => setIsLoaded(true))
  }, [dispatch, isLoaded]);

  const handleServerClick = async (serverId) => {

    if (serverId === 0) {
      dispatch(resetServer())
    } else {
      setIsLoaded(false)
      await dispatch(getOneServer(serverId))
      await dispatch(getChannels(serverId))
      await dispatch(getUsers())
      .then(() => setIsLoaded(true))
    }
  };

  return (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img alt='home-icon' src={discordHome} className='home-icon' onClick={() => { handleServerClick(0); setDirectChatId(null); setShowFriends(false)}} />
        </div>
        <div className='line-break'>------</div>
        {servers?.map((server, i) => {
          return (
            <div key={i} >
              <div className='server-img-outer'>
                {
                server.server_pic ?
                  <div style={{ backgroundImage: `url(${server.server_pic})` }} className='server-img' onClick={() => handleServerClick(server.id)}> </div> :
                  <div style={{ backgroundImage: `url(${serverDefault})` }} className='server-img' onClick={() => handleServerClick(server.id)}> </div>
                  }
              </div>
            </div>
          )
        })}
        <div className='add-server-outer' onClick={() => { setShowModalCreate(true) }}>
          <div className='fas fa-plus add-server-icon' />
        </div>
          {showModalCreate && (
            <Modal onClose={() => setShowModalCreate(false)}>
              <ServerForm setShowModalCreate={setShowModalCreate} showModalCreate={showModalCreate} />
            </Modal>
          )}
      </div>
    </>
  )
}

export default ServerNav
