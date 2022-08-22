import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { allServers, listAllServers } from '../../store/servers';
import '../CSS/ServerNav.css'
import discordHome from '../CSS/images/lightpurple.png'

const ServerNav = () => {
  const dispatch = useDispatch()
  const servers = useSelector(allServers)
  // console.log(servers)

  useEffect(() => {
    dispatch(listAllServers())
  }, [])

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
                <img src={server.server_pic} className='server-img' />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default ServerNav
