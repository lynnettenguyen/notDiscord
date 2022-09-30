import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import { allServers, listAllServers } from '../../store/servers';
import { getOneServer, resetServer } from '../../store/server';
import { getUsers } from '../../store/users';
import ServerForm from './ServerForm'
import discordHome from '../CSS/images/lightpurple.png'
import serverDefault from '../CSS/images/server_default.png'
import '../CSS/ServerNav.css'

const ServerNav = ({ setSelectedServer, setDirectChatId, setShowFriends, setChannelActive, setChannelId, setChannelName, setChannelTopic }) => {
  const dispatch = useDispatch();
  const servers = useSelector(allServers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false)

  useEffect(() => {
    dispatch(listAllServers())
      .then(() => setIsLoaded(true))
  }, [dispatch, isLoaded]);

  const handleServerClick = async (serverId, channel) => {

    setSelectedServer(serverId)

    if (serverId === 0) {
      dispatch(resetServer())
      setChannelId(null)
      setDirectChatId(null)
      setShowFriends(false)
    } else {
      setIsLoaded(false)
      setChannelId(channel?.id)
      setChannelName(channel?.name)
      setChannelTopic(channel?.topic)
      setChannelActive(true)
      await dispatch(getOneServer(serverId))
      await dispatch(getUsers())
        .then(() => setIsLoaded(true))
    }
  };


  return (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img alt='home-icon' src={discordHome} className='home-icon' onClick={() => handleServerClick(0)} />
          <div className='line-break'>------</div>
        </div>
        <div className='serverNav-all-servers-outer'>
          {servers?.map((server, i) => {
            return (
              <div key={i}>
                <div className='server-img-outer'>
                  {
                    server.server_pic ?
                      <div style={{ backgroundImage: `url(${server.server_pic})` }} className='server-img' onClick={() => handleServerClick(server.id, server.channels[0])}> </div> :
                      <div style={{ backgroundImage: `url(${serverDefault})` }} className='server-img' onClick={() => handleServerClick(server.id, server.channels[0])}> </div>
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
            <ServerForm setShowModalCreate={setShowModalCreate} setSelectedServer={setSelectedServer} setChannelName={setChannelName} setChannelTopic={setChannelTopic} setChannelId={setChannelId} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default ServerNav
