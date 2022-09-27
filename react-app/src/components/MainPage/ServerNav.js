import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import { allServers, listAllServers } from '../../store/servers';
import { getChannels, getOneServer, resetServer } from '../../store/server';
import { getUsers } from '../../store/users';
import ServerForm from './ServerForm'
import discordHome from '../CSS/images/lightpurple.png'
import serverDefault from '../CSS/images/server_default.png'
import '../CSS/ServerNav.css'
import { setShowFriends } from '../../store/showFriends';
import { useHistory } from 'react-router-dom';

const ServerNav = ({ setDirectChatId, setChannelActive, setGeneralChannelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const servers = useSelector(allServers);
  const server = useSelector(state => state.server.server)
  const [showModalCreate, setShowModalCreate] = useState(false)

  useEffect(() => {
    dispatch(listAllServers())
  }, [dispatch]);

  const handleServerClick = async (serverId) => {
    if (serverId === 0) {
      dispatch(resetServer())
      history.push('/noServer')
    } else {

      await dispatch(getOneServer(serverId))
      await dispatch(getChannels(serverId))
      await dispatch(getUsers())
        .then(() => {

          history.push('/servers')
        })
      }
    // setChannelActive(false)
    // setGeneralChannelId(null)
    // setDirectChatId(null)
    dispatch(setShowFriends(false))
    // history.push('/noServer')
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
            <ServerForm setShowModalCreate={setShowModalCreate} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default ServerNav
