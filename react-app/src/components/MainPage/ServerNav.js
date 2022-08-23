import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allServers, listAllServers } from '../../store/servers';
import { getChannels, getOneServer, resetServer } from '../../store/server';
import { getUsers } from '../../store/users';
import { Modal } from '../context/Modal';
import ServerForm from './ServerForm'
import '../CSS/ServerNav.css'
import discordHome from '../CSS/images/lightpurple.png'
import serverDefault from '../CSS/images/server_default.png'

const ServerNav = () => {
  const dispatch = useDispatch();
  const servers = useSelector(allServers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(listAllServers())
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  const handleServerClick = async (id) => {

    if (id === 0) {
      dispatch(resetServer())
    } else {
      setIsLoaded(false)
      await dispatch(getOneServer(id))
      await dispatch(getChannels(id))
      await dispatch(getUsers())
      .then(()=>setIsLoaded(true))


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
            <div key={i} >
              <div className='server-img-outer'>
                {server.server_pic ?
                  <div style={{ backgroundImage: `url(${server.server_pic})` }} className='server-img' onClick={() => handleServerClick(i + 1)}> </div> :
                  <div style={{ backgroundImage: `url(${serverDefault})` }} className='server-img' onClick={() => handleServerClick(i + 1)}> </div>}
              </div>
            </div>
          )
        })}
        <div className='add-server-outer' onClick={() => { setShowModal(true) }}>
          <div className='fa-solid fa-plus add-server-icon' />
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ServerForm setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default ServerNav
