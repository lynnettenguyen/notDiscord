import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allServers, listAllServers } from '../../store/servers';
import discordHome from '../CSS/images/lightpurple.png'
import { getOneServer, resetServer } from '../../store/server';
import '../CSS/ServerNav.css'
import { getUsers } from '../../store/users';




const ServerNav = () => {
  const dispatch = useDispatch();
  const servers = useSelector(allServers);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(listAllServers())
    .then(()=>setIsLoaded(true))
  }, [dispatch]);

  const handleServerClick = (id) => {

    if (id === 0) {
      dispatch(resetServer())
    } else {
      setIsLoaded(false)
      dispatch(getOneServer(id))
      .then(()=>{
        dispatch(getUsers())
        .then(()=>setIsLoaded(true))
      })
    }
  };

  return isLoaded && (
    <>
      <div className='main-serverNav'>
        <div className='home-icon-outer'>
          <img src={discordHome} className='home-icon' onClick={()=>handleServerClick(0)} />
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
