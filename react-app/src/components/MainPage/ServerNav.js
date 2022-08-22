import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allServers, listAllServers } from '../../store/servers';
import discordHome from '../CSS/images/lightpurple.png'
import { getOneServer } from '../../store/server';
import '../CSS/ServerNav.css'




const ServerNav = () => {
  const dispatch = useDispatch();
  const servers = useSelector(allServers);

  useEffect(() => {
    dispatch(listAllServers())
  }, [dispatch]);

  const handleServerClick = (id) => {
      dispatch(getOneServer(id))
  };

  return (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img src={discordHome} className='home-icon' />
        </div>
        {servers?.map((server, i) => {
          return (
            <>
              <div className='server-img-outer'>
                <img src={server.server_pic} className='server-img' onClick={()=>handleServerClick(i + 1)} />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default ServerNav
