import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allServers, listAllServers } from '../../store/servers';
import discordHome from '../CSS/images/lightpurple.png'
import { getChannels, getOneServer, resetServer } from '../../store/server';
import '../CSS/ServerNav.css'
import { getUsers } from '../../store/users';
import addIcon from '../CSS/images/discord-add-icon.svg'
import { Modal } from '../context/Modal';
import ServerForm from './ServerForm'

const ServerNav = () => {
  const dispatch = useDispatch();
  const servers = useSelector(allServers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(listAllServers())
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  const handleServerClick = (id) => {

    if (id === 0) {
      dispatch(resetServer())
    } else {
      setIsLoaded(false)
      dispatch(getOneServer(id))
        .then(() => {
          dispatch(getUsers())
            .then(() => setIsLoaded(true))
        })
        .then(() => dispatch(getChannels(id)))

    }
  };

  return isLoaded && (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img src={discordHome} className='home-icon' onClick={() => handleServerClick(0)} />
        </div>
        <div className='line-break'>------</div>
        {servers?.map((server, i) => {
          return (
            <>
              <div className='server-img-outer'>
                <div style={{ backgroundImage: `url(${server.server_pic})` }} className='server-img' onClick={() => handleServerClick(i + 1)}> </div>
              </div>
            </>
          )
        })}
        <div className='add-server-outer' onClick={() => { setShowModal(true) }}>
          <div className='fa-solid fa-plus add-server-icon' />
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ServerForm />
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default ServerNav
