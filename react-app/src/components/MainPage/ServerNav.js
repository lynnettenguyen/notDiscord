import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllServers } from '../../store/servers';
import { getChannels, resetServer } from '../../store/servers';
import { getUsers } from '../../store/users';
import { Modal } from '../context/Modal';
import ServerForm from './ServerForm'
import discordHome from '../CSS/images/lightpurple.png'
import serverDefault from '../CSS/images/server_default.png'

import '../CSS/ServerNav.css'

const ServerNav = ({setServerId, setDirectChatId, setShowFriends}) => {
  const dispatch = useDispatch();
  const servers = useSelector(state => Object.values(state.servers));
  // const server = useSelector(state => state.server)
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
      // await dispatch(getOneServer(serverId))
      setServerId(serverId)
      console.log(serverId)
      await dispatch(listAllServers())
      await dispatch(getChannels(serverId))
      await dispatch(getUsers())
        .then(() => setIsLoaded(true))
    }
  };

  console.log("servers", servers)



  return (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img alt='home-icon' src={discordHome} className='home-icon' onClick={() => { handleServerClick(0); setDirectChatId(null); setShowFriends(false) }} />
          <div className='line-break'>------</div>
        </div>
        <div className='serverNav-all-servers-outer'>
          {servers?.slice(0, -1).map((server, i) => {
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
        </div>

        <div className='add-server-outer' onClick={() => { setShowModalCreate(true) }}>
          <div className='fas fa-plus add-server-icon' />
        </div>
        {showModalCreate && (
          <Modal onClose={() => setShowModalCreate(false)}>
            <ServerForm setServerId={setServerId} setShowModalCreate={setShowModalCreate} showModalCreate={showModalCreate} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default ServerNav
